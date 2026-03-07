import { Router } from 'express';
import {
    getRoads,
    getAllRoads,
    getRoadById,
    createRoad,
    updateRoad,
    changeRoadStatus
} from './road.controller.js';
import { validatePagination, validateRoadFilters } from "../../middlewares/data-validators.js";

import {
    validateCreateRoad,
    validateUpdateRoad,
    validateGetRoadById,
    validateRoadStatusChange
} from "../../middlewares/roads-validators.js";
import { validateJWT } from "../../middlewares/auth-validator.js";

const router = Router();

// GET

// Listar con paginación y filtros
router.get('/', [
    validateJWT,
    validatePagination,
    validateRoadFilters
], getRoads);

// Listar sin paginación, para dropdowns o listados completos)
router.get('/all', [
    validateJWT,
    validateRoadFilters
], getAllRoads);

// Obtener por ID
router.get('/:id', [
    validateJWT,
    validateGetRoadById,
],
    getRoadById);

// POST

// Crear nueva ruta
router.post('/', [
    validateJWT,
    validateCreateRoad
],
    createRoad);

// PUT

// Actualizar ruta existente
router.put('/:id', [
    validateJWT,
    validateUpdateRoad
], updateRoad);

// Cambiar estado (activar/desactivar)
router.put('/:id/status', [
    validateJWT,
    validateRoadStatusChange
], changeRoadStatus);

export default router;