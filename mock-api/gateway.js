const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3001;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
});

// Logging middleware
app.use((req, res, next) => {
    console.log(`Gateway: ${req.method} ${req.url}`);
    next();
});

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

function proxyTo(target) {
    return createProxyMiddleware({
        target,
        changeOrigin: true,
        pathRewrite: (_path, req) => req.originalUrl,
        on: {
            error: (_error, _req, res) => {
                if (!res.headersSent) res.status(502).json({ error: 'Microservicio no disponible' });
            }
        }
    });
}

const calificacionesProxy = proxyTo('http://localhost:3004');
const horarioProxy = proxyTo('http://localhost:3005');

// Proxy para Auth (usuarios, login)
app.use(['/login', '/usuarios'], proxyTo('http://localhost:3002'));

// Proxy para Cursos
app.use('/cursos', proxyTo('http://localhost:3003'));

// Proxy para Calificaciones
app.use('/calificaciones', calificacionesProxy);
app.use(/^\/api\/estudiantes\/[^/]+\/calificaciones(?:\/|$)/, calificacionesProxy);

// Proxy para Horario
app.use('/horario', horarioProxy);
app.use(/^\/api\/estudiantes\/[^/]+\/horario(?:\/|$)/, horarioProxy);

app.listen(PORT, () => {
    console.log(`API Gateway escuchando en http://localhost:${PORT}`);
});
