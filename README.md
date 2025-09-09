# Node Demo API

![Node.js](https://img.shields.io/badge/Node.js-v20.17.0-green)

![TypeScript](https://img.shields.io/badge/TypeScript-5.5.4-blue)

![Docker](https://img.shields.io/badge/Docker-27.2.0-blue)

![License](https://img.shields.io/badge/License-MIT-yellow)

Este proyecto es una API RESTful desarrollada con Node.js y TypeScript, diseñada para gestionar usuarios con perfiles, cumpliendo con los requisitos solicitados por el cliente. Soporta operaciones CRUD, validaciones, manejo de permisos, filtrado por texto, almacenamiento en memoria (JSON) y MongoDB, documentación con Swagger y pruebas unitarias con Jest.

## Tabla de Contenidos

-   Características
    
-   Requisitos
    
-   Instalación
    
-   Ejecución
    
    -   Ejecutar Localmente
            
-   Estructura del Proyecto
    
-   API Endpoints
    
-   Documentación de la API
    
-   Decisiones de Diseño
    

## Características

-   **API RESTful**: Operaciones CRUD para gestionar usuarios (GET, POST, PUT, DELETE).
    
-   **Almacenamiento Dual**:
    
    -   **MongoDB**: Persistencia en base de datos para producción.
        
    -   **JSON (Mock)**: Almacenamiento en memoria usando user.json para pruebas.
        
-   **Validaciones**:
    
    -   Campos requeridos y correo electrónico único.
        
    -   Manejo de errores con respuestas JSON claras.
        
-   **Filtrado por Texto**: Búsqueda parcial en name, userName y email
    
-   **Manejo de Permisos**: Autenticación basada en tokens **estáticos** con roles **admin** y **user**.
    
-   **Documentación**: API documentada con Swagger (/api-docs).
    
-   **Pruebas Unitarias**: Cobertura de operaciones CRUD con Jest.
    
-   **Docker**: Incluye Dockerfile para construir y ejecutar la aplicación en un contenedor.
    

## Requisitos

-   **Node.js**
    
-   **pnpm** o **npm**
    
-   **MongoDB**
    
-   **Docker**
    
-   **TypeScript**
    

## Instalación

1.  **Clonar el repositorio**:
    
    ```bash
    git clone https://github.com/AndresAndrada/node-mongo-api.git
    cd node-mongo-api
    ```
    
2.  **Instalar dependencias**:
    
    ```bash
    pnpm install
       ```
    o
    ```bash
    npm install
    ```
    
3.  **Configurar variables de entorno**: Crea un archivo .env en la raíz del proyecto con el siguiente contenido:
    
    ```env
    MONGODB_URL=<mongodb://localhost:27017/node-demo-api>
    PORT=3000
    ```
    
4.  **Configurar MongoDB** (si usas las rutas con base de datos): Asegúrate de que MongoDB esté corriendo localmente o proporciona una URI válida en .env.
    
5.  **Configurar datos mockeados**: El archivo src/utils/user.json contiene datos iniciales para las rutas mockeadas:
    
    ```json
    {
      "users": [
        {
          "id": "1",
          "name": "Marcos",
          "userName": "marcos123",
          "email": "marcos@example.com",
          "age": 30,
          "code": 12345,
          "role": "user"
        },
        {
          "id": "2",
          "name": "Admin",
          "userName": "admin",
          "email": "admin@example.com",
          "age": 40,
          "code": 99999,
          "role": "admin"
        }
      ]
    }
    ```
    

## Ejecución

### Ejecutar Localmente

1.  **Compilar el proyecto**:
    
    ```bash
    pnpm run tsc
    ```
    
2.  **Iniciar el servidor en modo desarrollo**:
    
    ```bash
    pnpm run dev
    ```
	o
	 ```bash
    pnpm run dev
    ```
    
3.  **Acceder a la API**:
    
    -   Rutas con MongoDB: http://localhost:3000/api/users
        
    -   Rutas mockeadas: http://localhost:3000/api/mock-users
        
    -   Documentación Swagger: http://localhost:3000/api-docs
        

### Ejecutar con Docker  - PENDIENTE

1.  **Construir la imagen**: 
    
    ```bash
    docker build -t node-demo-api .
    ```
    
2.  **Ejecutar el contenedor**: Asegúrate de que MongoDB esté accesible (por ejemplo, corriendo localmente o en una red Docker).
    
    ```bash
    docker run -p 3000:3000 --env-file .env node-demo-api
    ```
    
3.  **Acceder a la API**: Igual que en la ejecución local.
    

## Estructura del Proyecto

```
node-demo-api/
├── src/
│   ├── config/                # Configuración de la base de datos
│   ├── controllers/           # Controladores para manejar 
│   │   └── users/
│   │       ├── userController.ts
│   │       ├── mockUserController.ts
│   ├── middleware/            # Middlewares (autenticación)
			 ├── authMiddleware.ts
│   ├── modules/              # Modelos de datos (Mongoose)
			 ├── Users.ts
│   ├── routes/               # Rutas de la API
│   │   └── user/
│   │       ├── userRouter.ts
│   │       ├── mockUserRouter.ts
│   ├── services/             # Lógica de negocio
│   │   ├── userServices.ts
│   │   ├── mockUserServices.ts
│   ├── swagger/              # Documentación de la API
│   ├── types/                # Definiciones de tipos (TypeScript)
│   ├── utils/                # Datos mockeados (user.json)
│   ├── tests/                # Pruebas unitarias
├── Dockerfile                # Configuración de Docker
├── .env.example             # Ejemplo de variables de entorno
├── index.ts              # Punto de entrada de la aplicación
├── tsconfig.json            # Configuración de TypeScript
├── package.json             # Dependencias y scripts
├── README.md                # Documentación del proyecto
```

## API Endpoints

### Rutas con MongoDB (/api/users)

-   **GET /api/users**: Obtiene todos los usuarios, con filtro opcional "?search=texto" (por ejemplo, ?search=cos para Marcos).
    
    -   **Autenticación**: Requiere token (Authorization: Bearer user-token o admin-token).
        
    -   **Respuesta**: 200 OK con array de usuarios.
        
-   **GET /api/users/:id**: Obtiene un usuario por ID.
    
    -   **Autenticación**: Requiere token.
        
    -   **Respuesta**: 200 OK con datos del usuario, 404 si no existe.
        
-   **POST /api/users**: Crea un nuevo usuario.
    
    -   **Autenticación**: Requiere admin-token.
        
    -   **Body**: { "name": string, "userName": string, "email": string, "age": number, "code": number, "role": "admin" | "user" }
        
    -   **Respuesta**: 201 Created con { message: "Usuario creado correctamente" }.
        
-   **PUT /api/users/:id**: Actualiza un usuario por ID.
    
    -   **Autenticación**: Requiere admin-token.
        
    -   **Body**: Mismo que POST.
        
    -   **Respuesta**: 200 OK con { message: "Usuario modificado correctamente" }.
        
-   **DELETE /api/users/:id**: Elimina un usuario por ID.
    
    -   **Autenticación**: Requiere admin-token.
        
    -   **Respuesta**: 200 OK con { message: "Usuario eliminado correctamente" }.
        

### Rutas Mockeadas (/api/mock-users)

Iguales a las rutas con MongoDB, pero sin autenticación y usando user.json como almacenamiento.

-   **Ejemplo de uso (POST /api/mock-users)**:
    
    ```bash
    curl -X POST http://localhost:3000/api/mock-users \
    -H "Content-Type: application/json" \
    -d '{"name":"New User","userName":"newuser","email":"newuser@example.com","age":25,"code":54321,"role":"user"}'
    ```
    

## Documentación de la API

La API está documentada con Swagger. Accede a http://localhost:3000/api-docs para ver la documentación interactiva, que incluye:

-   Descripción de cada endpoint.
    
-   Modelos de datos (UserType).
    
-   Ejemplos de solicitudes y respuestas.
    
-   Códigos de error posibles (400, 401, 403, 404, 500).
    

El archivo de configuración está en src/swagger/swagger.json.

## Pruebas Unitarias - PENDIENTE

Las pruebas unitarias están implementadas con Jest y cubren todas las operaciones CRUD para las rutas con MongoDB y mockeadas.

1.  **Ubicación**: src/tests/
    
2.  **Ejecutar pruebas**:
    
    ```bash
    pnpm run test
    ```
    
3.  **Cobertura**:
    
    ```bash
    pnpm run test:cov
    ```
    
    -   Cubre validaciones, manejo de errores, búsqueda parcial y operaciones CRUD.
        
    -   Resultados disponibles en coverage/.

## Decisiones de Diseño

-   **Almacenamiento Dual**:
    
    -   MongoDB para persistencia en producción.
        
    -   JSON (user.json) para pruebas rápidas sin base de datos.
     
-   **Validaciones**:
    
    -   Correo electrónico único verificado en createMockUser y updateMockUser.
        
    -   Campos opcionales (name, userName, email, age, code) permiten flexibilidad.
        
-   **Búsqueda Parcial**: Implementada con Array.filter para datos mockeados y $regex para MongoDB.
    
-   **TypeScript**: Uso estricto de tipos (UserType) para garantizar seguridad de tipos.
    
-   **Docker**: Dockerfile optimizado para construir y ejecutar la aplicación con dependencias mínimas.
    

## Contribuciones

1.  Clona el repositorio.
    
2.  Crea una rama para tu funcionalidad:
    
    ```bash
    git checkout -b feature/nueva-funcionalidad
    ```
    
3.  Haz commit de tus cambios:
    
    ```bash
    git commit -m "Add new functionality"
    ```
    
4.  Envía un pull request a la rama main.

--------------
**Autor**: Andrés Andrada  
**Repositorio**: https://github.com/AndresAndrada/node-mongo-api
