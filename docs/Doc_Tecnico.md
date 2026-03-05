# Secuencia de Desarrollo: `server-admin`

## 1. Tarea 2: Inicialización del `server-admin` (Santiago)
Configuración base con Express, Helmet, CORS y conexión a MongoDB.

## 2. Tarea 4: Modelado de Datos Geoespaciales (Santiago)
Esquemas de Mongoose (Estaciones y Líneas) utilizando GeoJSON.

## 3. Tarea 13: Interceptores y Manejo de Errores Globales (Gabriel)
Configuración del middleware de captura de excepciones.

## 4. Tarea 6: Middlewares de Validación de Entrada (Gabriel)
Implementación de `express-validator` para sanear datos.

## 5. Tarea 5: Middlewares de Autenticación y Autorización (Oliver)
Lógica para decodificar el JWT de .NET y validar el rol `Admin`.

## 6. Tarea 9: CRUD de Estaciones y Rutas (Santiago)
Controladores y rutas protegidas para la gestión del mapa.

## 7. Tarea 18: Panel de Notificaciones Administrativas (Kenneth)
Endpoints para la publicación de alertas del servicio.

## 8. Tareas 7, 14 y 21: Documentación y Pruebas (Gabriel y Oliver)
Colecciones de Postman, diagramas y pruebas funcionales de los endpoints administrativos.

---

# Documento Técnico: Inicialización `server-admin`

Este documento establece las bases para que comiencen a trabajar el server-admin.

---

### 1. Dependencias Requeridas

Ejecutar el siguiente comando en la terminal dentro de la carpeta del `server-admin` para instalar los paquetes fundamentales de Node.js:

```bash
npm install express mongoose dotenv cors helmet jsonwebtoken express-validator

npm install --save-dev nodemon morgan
```

### Descripción de Dependencias

- **express:** Framework de enrutamiento.
- **mongoose:** ODM para modelar los datos geoespaciales en MongoDB.
- **dotenv:** Gestión de variables de entorno.
- **cors & helmet:** Seguridad HTTP esencial.
- **jsonwebtoken:** Para verificar la firma del token generado por el `auth-server`.
- **express-validator:** Saneamiento y validación de los cuerpos de las peticiones HTTP.

---

# 2. Variables de Entorno (`.env`)

Crear el archivo `.env` en la raíz del proyecto para definir los puertos y conexiones.

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/TransmetroAdminDb
JWT_SECRET=A_SUPER_SECRET_KEY_FOR_TRANSMETRO_CONECTA_12345
```

---

# 3. Estructura de Carpetas Modular

Implementar el siguiente árbol de directorios para mantener la separación de responsabilidades solicitada.

```text
server-admin/
├── configs/
│   ├── app.js                   # Configuración de Express, middlewares globales y enrutamiento
│   ├── cors-configuration.js    # Opciones y dominios permitidos para CORS
│   ├── db.js                    # Lógica de conexión a MongoDB mediante Mongoose
│   └── helmet-configuration.js  # Directivas de seguridad HTTP
├── middlewares/
│   ├── auth-validator.js        # Verificación del JWT emitido por .NET y validación de Rol
│   ├── data-validators.js       # Validaciones con express-validator (estaciones, rutas, alertas)
│   ├── check-validators.js      # Interceptor de errores de express-validator
│   ├── handle-errors.js         # Manejador global de excepciones de la API
│   └── request-limit.js         # Limitador de peticiones (Rate Limit)
├── src/
│   ├── estaciones/              # Módulo de gestión de estaciones (GeoJSON)
│   │   ├── estaciones.controller.js
│   │   ├── estaciones.model.js
│   │   └── estaciones.routes.js
│   ├── rutas/                   # Módulo de gestión de trayectos
│   │   ├── rutas.controller.js
│   │   ├── rutas.model.js
│   │   └── rutas.routes.js
│   ├── alertas/                 # Módulo de notificaciones administrativas
│   │   ├── alertas.controller.js
│   │   ├── alertas.model.js
│   │   └── alertas.routes.js
│   └── utils/                   # Funciones utilitarias globales
├── .env                         # Variables de entorno
├── .gitignore                   # Exclusiones para el control de versiones
├── index.js                     # Punto de entrada y arranque del servidor
└── package.json                 # Gestión de dependencias y scripts de ejecución
```

---

# 4. Directrices de Implementación

### Conexión a Base de Datos
Establecer en `configs/db.js` el enlace a MongoDB.

### Seguridad
Aplicar `helmet()` y `cors()` globalmente en `app.js`.

### Manejo de Errores
En lugar de saturar los controladores, utilizar un middleware al final de la pila en `app.js` que formatee las respuestas de error en JSON.

### Validación JWT
El middleware de autenticación solo debe leer el token, verificar su validez con la clave secreta y extraer el rol para asegurar que el usuario sea administrador.