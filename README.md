# API RESTful de Gestión de Películas y Usuarios

## Descripción

La **Movie API** es una aplicación backend que permite gestionar una base de datos de películas y usuarios. Incluye funcionalidades de registro, autenticación y operaciones CRUD en películas. Además, implementa medidas de seguridad y está documentada con Swagger.

## Características

- Registro y autenticación de usuarios con contraseñas encriptadas.
- Operaciones CRUD (crear, leer, actualizar, eliminar) en películas.
- Autenticación mediante tokens JWT para proteger endpoints sensibles.
- Validación de datos usando `Joi` y middleware personalizado.
- Seguridad mejorada mediante `Helmet`.
- Documentación de la API utilizando Swagger.

## Tecnologías utilizadas

- **Node.js**
- **Express**
- **MongoDB** (con Mongoose)
- **JWT** para autenticación
- **Helmet** para seguridad
- **Swagger** para documentación
- **Joi** para validación

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/agush44/api_movies.git
   cd api_movies
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea un archivo `.env` con las siguientes variables:

   ```env
   PORT=3000
   MONGO_URI=tu_conexion_mongo
   JWT_SECRET=tu_secreto_jwt
   ```

4. Inicia la aplicación:

   ```bash
   npm start
   ```

## Rutas de la API

### Usuarios

| Método | Endpoint          | Descripción                       |
|--------|-------------------|-----------------------------------|
| POST   | `/api/users/register` | Registra un nuevo usuario.       |
| POST   | `/api/users/login`    | Inicia sesión y devuelve un token.|

### Películas

| Método | Endpoint          | Descripción                          |
|--------|-------------------|--------------------------------------|
| GET    | `/api/movies`        | Obtiene todas las películas.         |
| GET    | `/api/movies/:id`    | Obtiene una película por su ID.      |
| POST   | `/api/movies`        | Crea una nueva película (autenticado).|
| PUT    | `/api/movies/:id`    | Actualiza una película (autenticado).|
| DELETE | `/api/movies/:id`    | Elimina una película (autenticado).  |

## Documentación

Accede a la documentación Swagger en:

```
http://localhost:3000/api-docs
```

## Seguridad

La API implementa `Helmet` para mejorar la seguridad estableciendo cabeceras HTTP seguras.
