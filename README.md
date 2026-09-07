# FrontendAcademico

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.22.

## Roles y administración

Además de la vista de estudiante (solo lectura), el proyecto incluye una capa
de administración con CRUD completo para docentes/administradores:

- **Estudiante** → ve Resumen, Mis Notas y Horario en modo solo lectura. No ve
  la sección "Administración" en el sidebar.
- **Docente** → Mis Notas y Horario cambian a una vista de **gestión** (tabla +
  botones Agregar/Editar/Eliminar). Además aparece "Administración → Cursos".
- **Admin** → todo lo del docente, más "Administración → Usuarios" para
  gestionar cuentas (crear, cambiar rol, resetear contraseña, eliminar).

La misma ruta (`/notas`, `/horario`) decide qué mostrar según
`auth.puedeGestionar()`, para no duplicar la navegación entre lectura y
gestión.

### Mock API

El proyecto se conecta a un mock API con `json-server` que vive en la carpeta
`mock-api/` (junto a este `README`, al mismo nivel que `src/`):

```bash
cd mock-api
npm install
npm start
```

Queda escuchando en `http://localhost:3001`. Expone rutas custom
(`POST /login`, `GET /api/estudiantes/:id/calificaciones`,
`GET /api/estudiantes/:id/horario`) y el CRUD REST estándar de json-server
para `/usuarios`, `/cursos`, `/calificaciones` y `/horario`.

Usuarios de prueba (los 3 roles), contraseña `campus2026` para los tres:

| Rol | Correo |
|---|---|
| Estudiante | `estudiante@uta.edu.ec` |
| Docente | `docente@uta.edu.ec` |
| Admin | `admin@uta.edu.ec` |

> ⚠️ Mock solo para desarrollo: contraseñas en texto plano, token sin firmar.
> No desplegar en producción.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
