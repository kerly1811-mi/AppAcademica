const express = require("express");
const jsonServer = require("json-server");
const path = require("path");
const server = jsonServer.create();
server.use(express.json());
const router = jsonServer.router(path.join(__dirname, "horario/db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);


server.get("/api/estudiantes/:id/horario", (req, res) => {
  const estudianteId = Number(req.params.id);
  const cursos = router.db.get("cursos").value();
  const horario = router.db
    .get("horario")
    .filter({ estudianteId })
    .value()
    .map((h) => {
      const curso = cursos.find((cu) => cu.id === h.cursoId);
      return {
        dia: h.dia,
        fecha: h.fecha,
        horaInicio: h.horaInicio,
        horaFin: h.horaFin,
        curso: curso ? curso.nombre : "Curso desconocido",
        profesor: curso ? curso.profesor : "",
        categoria: curso ? curso.categoria : "",
      };
    });
  res.json({ estudianteId, horario });
});

server.use(router);
const PORT = 3005;
const serverInstance = server.listen(PORT, () => console.log(`Horario API en http://localhost:${PORT}`));
