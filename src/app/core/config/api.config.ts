// Centraliza la URL del mock API (json-server). Cuando este MVP se conecte
// a un backend real (Node/Express + PostgreSQL), solo hay que cambiar este
// valor — o convertirlo en un archivo environment.ts si el proyecto crece.
export const API_URLS = {
  auth: "http://localhost:3001",
  cursos: "http://localhost:3001",
  calificaciones: "http://localhost:3001",
  horario: "http://localhost:3001"
};
