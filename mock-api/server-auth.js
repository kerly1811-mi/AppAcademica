const jsonServer = require("json-server");
const path = require("path");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "auth/db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser); // Restore this

server.post("/login", (req, res) => {
  console.log("Auth Server: Received POST /login", req.body);
  const { correo, password } = req.body || {};

  if (!correo || !password) return res.status(400).json({ error: "correo y password son obligatorios" });
  const usuario = router.db.get("usuarios").find({ correo }).value();
  if (!usuario || usuario.password !== password) return res.status(401).json({ error: "Credenciales inválidas" });
  const { password: _omit, ...usuarioSinPassword } = usuario;
  res.json({ token: `mock-token-${usuario.id}`, usuario: usuarioSinPassword });
});

server.use(router);
const PORT = 3002;
server.listen(PORT, () => console.log(`Auth API en http://localhost:${PORT}`));
