# Backend Boilerplate

Un boilerplate inicial para construir **APIs RESTful** con **Node.js**, **Express** y **TypeScript**, listo para desarrollo, pruebas, linting y despliegue en producción.

---

## Tecnologías principales

- <a href="https://nodejs.org/en/" target="_blank" rel="noopener">Node.js</a> y <a href="https://expressjs.com/" target="_blank" rel="noopener">Express</a> para el servidor.
- <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener">TypeScript</a> para tipado estático y mayor seguridad.
- <a href="https://zod.dev/" target="_blank" rel="noopener">Zod</a> para validación de datos.
- <a href="https://getpino.io/" target="_blank" rel="noopener">Pino</a> para logging eficiente.
- <a href="https://helmetjs.github.io/" target="_blank" rel="noopener">Helmet</a> y <a href="https://www.npmjs.com/package/cors" target="_blank" rel="noopener">cors</a> para seguridad y manejo de CORS.
- <a href="https://www.npmjs.com/package/express-rate-limit" target="_blank" rel="noopener">Express Rate Limit</a> para limitar peticiones y proteger la API.
- <a href="https://jestjs.io/" target="_blank" rel="noopener">Jest</a> + <a href="https://www.npmjs.com/package/supertest" target="_blank" rel="noopener">Supertest</a> para testing.

---

## Características

- Estructura modular lista para crecer.
- Scripts para desarrollo, producción, testing y limpieza.
- Integración de <a href="https://prettier.io/" target="_blank" rel="noopener">Prettier</a> y <a href="https://eslint.org/" target="_blank" rel="noopener">ESLint</a> para mantener el código limpio.
- <a href="https://typicode.github.io/husky/#/" target="_blank" rel="noopener">Husky</a> + <a href="https://commitlint.js.org/" target="_blank" rel="noopener">Commitlint</a> para commits estandarizados.
- Uso de <a href="https://github.com/okonet/lint-staged" target="_blank" rel="noopener">Lint-staged</a> para ejecutar linters únicamente en los archivos modificados antes de cada commit.
- Configuración de tests con cobertura incluida.

---

## Instalación

Clona el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
cd backend-boilerplate
```

### _Listo para usar con npm o pnpm:_

Si quieres usar NPM solo debes **borrar el fichero pnpm-lock.yaml**.

```bash
npm install
```

En caso contrario si quieres usar PNPM solo ejecuta pnpm install.

```bash
pnpm install
```

### Variables de entorno

Renombrar fichero .env.example a .env y usar configurar las variables de entorno.

---

## Inicializar con Docker

Docker visualizar docker en consola:

```bash
docker-compose up --build
```

Docker en modo detachment:

```bash
docker-compose up --build -d
```

Construir imagen de Docker

```bash
docker build -t 'image-name' .
docker run 'image-name'
```

## Scripts disponibles

| Script                  | Descripción                                                             |
| ----------------------- | ----------------------------------------------------------------------- |
| `npm run dev`           | Inicia el servidor en modo desarrollo con watch usando `tsx`.           |
| `npm run build`         | Compila TypeScript a JavaScript en la carpeta `dist/`.                  |
| `npm start`             | Ejecuta la versión de producción desde `dist/index.js`.                 |
| `npm run test`          | Ejecuta tests usando Jest.                                              |
| `npm run coverage`      | Genera reporte de cobertura de tests con Jest.                          |
| `npm run prettier`      | Formatea todo el código del proyecto usando Prettier.                   |
| `npm run lint`          | Aplica ESLint para corregir errores de estilo automáticamente.          |
| `npm run format`        | Aplica Prettier y ESLint en conjunto.                                   |
| `npm run clean`         | Elimina carpetas `dist/` y `coverage/` para limpiar el proyecto.        |
| `npm run clean:logs`    | Elimina carpeta `logs/` recursivamente.                                 |
| **_`npm run prepare`_** | Prepara Husky y los hooks de Git.**(Usarlo después de Initial commit)** |

## Commitlint y Husky

- Configuración lista para asegurar commits con mensajes convencionales.
- Husky activa hooks de pre-commit automáticamente.
- Lint-staged asegura que solo se revisen los archivos modificados.
