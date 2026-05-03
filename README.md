# Tconecta - Server Admin

Microservicio principal que actúa como panel administrativo para Tconecta. Desarrollado con Node.js y Express, gestiona la administración de estaciones, rutas, alertas operativas y orquesta las peticiones principales del sistema de transporte.

## Configuración de Entorno (.env)

Crea un archivo `.env` en la raíz de la carpeta `server-admin` con las siguientes variables requeridas para su ejecución aislada o contenedorizada:

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/TransmetroAdminDb
JWT_SECRET=A_SUPER_SECRET_KEY_FOR_TRANSMETRO_CONECTA_12345
```

## Ejecución del Proyecto

La forma recomendada de ejecutar el servicio es utilizando **Docker Compose** junto con todo el ecosistema de microservicios.

Desde la **raíz del proyecto** (donde se encuentra el archivo `docker-compose.yml`), ejecuta:

```bash
docker compose up -d --build
```

Esto iniciará el contenedor del servidor y el servicio quedará disponible en:

```
http://localhost:3001
```

---

## Documentación Swagger/OpenAPI

Se ha implementado documentación automática e interactiva de todos los endpoints mediante **Swagger UI**.

### Acceso a la Documentación

Una vez que el servidor esté en ejecución, accede a:

```
http://localhost:3001/api-docs
```

### Características de Swagger

- ✅ Documentación automática de todos los endpoints
- ✅ Interfaz interactiva para probar endpoints en tiempo real
- ✅ Especificación OpenAPI 3.0 completa
- ✅ Soporte para autenticación JWT Bearer Token
- ✅ Esquemas de datos documentados
- ✅ Ejemplos de parámetros y respuestas

### Endpoints Disponibles en Swagger

- **Health Check**: Verificar estado del servidor
- **Roads**: Gestión de rutas (listar, crear, actualizar, cambiar estado)
- **Stations**: Gestión de estaciones (listar, crear, actualizar, cambiar estado)
- **Alerts**: Gestión de alertas (listar, crear, resolver)


---

Las pruebas del API se realizan mediante una colección de Postman.

### Pasos

1. Importa la colección `Postman-Transmetro.json` a Postman
2. Ve a **Variables de la Colección**.
3. Verifica que la base de las rutas esté apuntando a:

```
http://localhost:3001/TCONECTA/v1
```

4. Ejecuta el endpoint:

```
Autenticación > Iniciar sesión
```

5. Si ejecutas una petición de login, puedes configurar el script de **Tests** para que guarde automáticamente el **JWT Token** en la variable:

```
{{token}}
```

6. Las demás peticiones protegidas utilizarán automáticamente ese token gracias a la configuración **Bearer Token**.

---

## Funcionalidades principales

* Autenticación y validación mediante **JWT** y Argon2.
* Administración y registro de **Estaciones** del sistema.
* Gestión de **Rutas** (líneas del Transmetro).
* Control de **Alertas** de servicio (incidentes, mantenimientos).
* Centralización de seguridad con Helmet, validaciones por Express-Validator e integración con Cloudinary.