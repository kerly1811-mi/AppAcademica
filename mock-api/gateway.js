const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 3001;

// Middlewares necesarios
app.use(express.json()); // NECESARIO para parsear el cuerpo de la petición

// Logging middleware
app.use((req, res, next) => {
    console.log(`Gateway: ${req.method} ${req.url}`);
    next();
});

// Proxy para Auth (usuarios, login)
app.use(['/login', '/usuarios'], createProxyMiddleware({ 
    target: 'http://localhost:3002', 
    changeOrigin: true
}));

// Proxy para Cursos
app.use('/cursos', createProxyMiddleware({ 
    target: 'http://localhost:3003', 
    changeOrigin: true 
}));

// Proxy para Calificaciones
app.use(['/calificaciones', '/api/estudiantes/:id/calificaciones'], createProxyMiddleware({ 
    target: 'http://localhost:3004', 
    changeOrigin: true 
}));

// Proxy para Horario
app.use(['/horario', '/api/estudiantes/:id/horario'], createProxyMiddleware({ 
    target: 'http://localhost:3005', 
    changeOrigin: true 
}));

app.listen(PORT, () => {
    console.log(`API Gateway escuchando en http://localhost:${PORT}`);
});
