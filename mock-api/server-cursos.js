const jsonServer = require("json-server");
const path = require("path");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "cursos/db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
const PORT = 3003;
server.listen(PORT, () => console.log(`Cursos API en http://localhost:${PORT}`));
