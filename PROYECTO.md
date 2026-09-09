# Proyecto: Gestión Académica Distribuida

Este proyecto es una aplicación de Gestión Académica que utiliza una arquitectura distribuida (simulada) para su entorno de desarrollo, facilitando la transición hacia un backend real.

## Arquitectura

El sistema ha sido refactorizado de un monolito a una arquitectura basada en microservicios mockeados.

### Componentes

1.  **Frontend:** Aplicación desarrollada en Angular. Consume los servicios a través de un único punto de entrada.
2.  **API Gateway:** Servidor en Node.js/Express (`mock-api/gateway.js`) que actúa como proxy reverso, redirigiendo las peticiones del frontend a los microservicios correspondientes.
3.  **Microservicios:** Servidores `json-server` independientes, cada uno gestionando su propio dominio de datos y ejecutándose en puertos distintos:
    *   **Auth Service:** `http://localhost:3002` (Usuarios, Login)
    *   **Cursos Service:** `http://localhost:3003` (Catálogo de cursos)
    *   **Calificaciones Service:** `http://localhost:3004` (Gestión de notas)
    *   **Horario Service:** `http://localhost:3005` (Gestión de horarios)

## Estructura de Directorios

```text
/AppAcademica
├── src/            # Código fuente Angular
├── mock-api/       # Servidores mock
│   ├── auth/       # Datos y config Auth
│   ├── cursos/     # Datos y config Cursos
│   ├── calificaciones/
│   ├── horario/
│   ├── gateway.js  # API Gateway
│   └── server-*.js # Scripts de inicio de cada servicio
└── package.json
```

## Instrucciones de Ejecución

Para iniciar el entorno de desarrollo distribuido:

1.  Asegúrese de estar en el directorio `mock-api/`.
2.  Ejecute los servicios (se recomienda usar terminales separadas para cada uno):

```bash
# Iniciar servicios en terminales separadas
node server-auth.js
node server-cursos.js
node server-calificaciones.js
node server-horario.js

# Iniciar el API Gateway
node gateway.js
```

El Gateway estará escuchando en `http://localhost:3001` y el frontend está configurado para apuntar todas sus peticiones a esta dirección.

## Notas de Desarrollo
- La arquitectura permite reemplazar cualquier microservicio por un backend real (Node/Express, PostgreSQL, etc.) sin necesidad de modificar el frontend, basta con actualizar la URL en `src/app/core/config/api.config.ts`.
- El Gateway es responsable del parseo de JSON (`express.json()`), por lo que los microservicios están configurados para operar de forma eficiente detrás de él.
