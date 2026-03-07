import jwt from 'jsonwebtoken';

export const validateJWT = (req, res, next) => {
    // Extraemos el token del header Authorization (Bearer token) o x-token
    const token = req.header('token') || req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'No hay token en la petición' });
    }

    try {
        // Usamos JWT_SECRET
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Extraer Rol (Manejando los claims estándar de .NET)
        const userRole = decoded.role || decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        // VALIDACIÓN del rol ADMIN
        if (userRole !== 'Admin') {
            return res.status(403).json({ 
                success: false, 
                message: 'Acceso denegado - Se requiere rol de Administrador' 
            });
        }

        // Inyectamos la info del payload en la request por si los controladores lo necesitan
        req.userRole = userRole;
        // Opcional: Extraer el ID (sub) de .NET y el email
        req.postgresUserId = decoded.sub || decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        req.userEmail = decoded.email || decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];

        // Pasamos al siguiente middleware o controlador
        next();
    } catch (error) {
        console.log("Error de JWT:", error.message);
        res.status(401).json({ success: false, message: 'Token no válido o expirado' });
    }
};