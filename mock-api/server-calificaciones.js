const express = require("express");
const jsonServer = require("json-server");
const path = require("path");
const server = jsonServer.create();
server.use(express.json());
const router = jsonServer.router(path.join(__dirname, "calificaciones/db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);


server.get("/api/estudiantes/:id/calificaciones", (req, res) => {
  const estudianteId = Number(req.params.id);
  const cursos = router.db.get("cursos").value();
  const calificaciones = router.db
    .get("calificaciones")
    .filter({ estudianteId })
    .value()
    .map((c) => {
      const curso = cursos.find((cu) => cu.id === c.cursoId);
      return {
        curso: curso ? curso.nombre : "Curso desconocido",
        profesor: curso ? curso.profesor : "",
        nota: c.nota,
      };
    });
  const promedio = calificaciones.length
    ? Number((calificaciones.reduce((sum, c) => sum + c.nota, 0) / calificaciones.length).toFixed(1))
    : 0;
  res.json({ estudianteId, promedio, calificaciones });
});

server.use(router);
const PORT = 3004;
server.listen(PORT, () => console.log(`Calificaciones API en http://localhost:${PORT}`));
