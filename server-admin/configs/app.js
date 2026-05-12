'use strict';

// Importaciones
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { specs } from './swagger.js';
import { corsOptions } from './cors-configuration.js';
import { helmetConfiguration } from './helmet-configuration.js';
import { dbConnection } from './db.js'; 

// Rutas
import roadRoutes from '../src/roads/road.routes.js';
import stationRoutes from '../src/stations/station.routes.js';
import alertRoutes from '../src/alerts/alert.routes.js';
import busRoutes from '../src/buses/bus.routes.js'; // <-- IMPORTACIÓN DE BUSES

const BASE_URL = '/TCONECTA/v1';

// Configuración de mi aplicación
const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false, limit: '10mb' }));
    app.use(express.json({ limit: '10mb' }));
    app.use(helmet(helmetConfiguration));
    app.use(cors(corsOptions));
    app.use(morgan('dev'));
}

// Integracion de todas las rutas
const routes = (app) => {
    app.use(`${BASE_URL}/roads`, roadRoutes);
    app.use(`${BASE_URL}/stations`, stationRoutes);
    app.use(`${BASE_URL}/alerts`, alertRoutes);
    
    // --> ¡AQUÍ ESTÁ EL CAMBIO! app.use() va DENTRO de esta función <--
    app.use(`${BASE_URL}/buses`, busRoutes);
    
    // Swagger Documentation
    app.use('/api-docs', swaggerUi.serve);
    app.get('/api-docs', swaggerUi.setup(specs, { 
        swaggerOptions: { 
            persistAuthorization: true 
        } 
    }));
}

// FUNCIÓN PARA INICIAR EL SERVIDOR
const initServer = async () => {
    const app = express();
    const PORT = process.env.PORT || 3001;

    try {
        await dbConnection();

        middlewares(app);
        routes(app);
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
            console.log(`Base URL: http://localhost:${PORT}${BASE_URL}`);
        });

        app.get(`${BASE_URL}/health`, (req, res) => {
            res.status(200).json({
                status: 'ok',
                service: 'TRANSMETRO-CONECTA Admin',
                version: '1.0.0'
            });
        });

    } catch (error) {
        console.log('Error al iniciar el servidor:', error);
    }
}

export { initServer };