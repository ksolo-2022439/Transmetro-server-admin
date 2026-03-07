import { Router } from 'express';
import { 
    getStations, 
    getAllStations, 
    getStationById, 
    createStation, 
    updateStation, 
    changeStationStatus 
} from './station.controller.js';
import { validatePagination, validateStationFilters } from "../../middlewares/data-validators.js";

import {
    validateCreateStation, 
    validateUpdateStation,
    validateGetStationById,
    validateStationStatusChange
} from "../../middlewares/stations-validators.js";
import { validateJWT } from "../../middlewares/auth-validators.js";

const router = Router();

// GET

// Listar con paginación y filtros
router.get('/', [
    validateJWT,
    validatePagination,
    validateStationFilters
], getStations);

// Listar sin paginación, para dropdowns o listados completos)
router.get('/all', [
    validateJWT,
    validateStationFilters
], getAllStations); 

// Obtener por ID
router.get('/:id', [
    validateJWT,
    validateGetStationById
], getStationById);

// POST

// Crear nueva estación
router.post('/', [
    validateJWT,
    validateCreateStation
], createStation);

// PUT 

// Actualizar estación existente
router.put('/:id', [
    validateJWT,
    validateUpdateStation
], updateStation);

// Cambiar estado de la estación (activar/desactivar)
router.put('/:id/status', [
    validateJWT,
    validateStationStatusChange
], changeStationStatus);

export default router;