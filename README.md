# Transmetro Conecta - Server Admin

Microservicio principal que actúa como panel administrativo para Transmetro Conecta. Desarrollado con Node.js y Express, gestiona la administración de estaciones, rutas, alertas operativas y orquesta las peticiones principales del sistema de transporte.

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

## Uso de la Colección de Postman

Las pruebas del API se realizan mediante una colección de Postman. XDD

### Pasos

1. Importa la colección `Postman-Transmetro.json` a Postman
2. Ve a **Variables de la Colección**.
3. Verifica que la base de las rutas esté apuntando a:

```
http://localhost:3001/TRANSMETRO-CONECTA/v1
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