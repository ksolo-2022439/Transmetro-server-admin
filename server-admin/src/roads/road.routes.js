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
import { validateJWT } from "../../middlewares/auth-validators.js";

const router = Router();

/**
 * @swagger
 * /roads:
 *   get:
 *     tags:
 *       - Roads
 *     summary: Get all roads with pagination
 *     description: Retrieve a paginated list of roads with optional filters
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [ACTIVO, INACTIVO]
 *         description: Filter by road status
 *       - in: query
 *         name: typeRoad
 *         schema:
 *           type: string
 *           enum: [PRINCIPAL, SECUNDARIA, AUXILIAR]
 *         description: Filter by road type
 *     responses:
 *       200:
 *         description: List of roads retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Road'
 *                 summary:
 *                   type: object
 *                   properties:
 *                     totalRoads:
 *                       type: integer
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       500:
 *         description: Internal server error
 *   post:
 *     tags:
 *       - Roads
 *     summary: Create a new road
 *     description: Create a new road with the provided details
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - code
 *               - typeRoad
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the road
 *               code:
 *                 type: string
 *                 description: Code identifier for the road
 *               typeRoad:
 *                 type: string
 *                 enum: [PRINCIPAL, SECUNDARIA, AUXILIAR]
 *                 description: Type of road
 *               stations:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of station IDs
 *               description:
 *                 type: string
 *                 description: Description of the road
 *     responses:
 *       201:
 *         description: Road created successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       500:
 *         description: Internal server error
 * 
 * /roads/all:
 *   get:
 *     tags:
 *       - Roads
 *     summary: Get all roads without pagination
 *     description: Retrieve all roads without pagination, useful for dropdowns or complete listings
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [ACTIVO, INACTIVO]
 *         description: Filter by road status
 *       - in: query
 *         name: typeRoad
 *         schema:
 *           type: string
 *           enum: [PRINCIPAL, SECUNDARIA, AUXILIAR]
 *         description: Filter by road type
 *     responses:
 *       200:
 *         description: All roads retrieved successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       500:
 *         description: Internal server error
 * 
 * /roads/{id}:
 *   get:
 *     tags:
 *       - Roads
 *     summary: Get road by ID
 *     description: Retrieve a specific road by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Road ID
 *     responses:
 *       200:
 *         description: Road retrieved successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       404:
 *         description: Road not found
 *       500:
 *         description: Internal server error
 *   put:
 *     tags:
 *       - Roads
 *     summary: Update road
 *     description: Update an existing road's information
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Road ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               code:
 *                 type: string
 *               typeRoad:
 *                 type: string
 *               stations:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Road updated successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       404:
 *         description: Road not found
 *       500:
 *         description: Internal server error
 * 
 * /roads/{id}/status:
 *   put:
 *     tags:
 *       - Roads
 *     summary: Change road status
 *     description: Activate or deactivate a road
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Road ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [ACTIVO, INACTIVO]
 *                 description: New status
 *     responses:
 *       200:
 *         description: Road status updated successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       404:
 *         description: Road not found
 *       500:
 *         description: Internal server error
 */

// GET

// Listar con paginación y filtros
router.get('/', [
    validatePagination,
    validateRoadFilters
], getRoads);

// Listar sin paginación, para dropdowns o listados completos)
router.get('/all', [
    validateRoadFilters
], getAllRoads);

// Obtener por ID
router.get('/:id', [
    validateGetRoadById,
],
    getRoadById);

// POST

// Crear nueva ruta
router.post('/', [
    validateCreateRoad
],
    createRoad);

// PUT

// Actualizar ruta existente
router.put('/:id', [
    validateUpdateRoad
], updateRoad);

// Cambiar estado (activar/desactivar)
router.put('/:id/status', [
    validateRoadStatusChange
], changeRoadStatus);

export default router;