import { Router } from 'express';
import { getBuses, createBus, assignRouteToBus } from './bus.controller.js';
import { validateJWT } from "../../middlewares/auth-validators.js";
import { validateCreateBus, validateAssignRouteToBus } from '../../middlewares/buses-validators.js';

const router = Router();
/**
 * @swagger
 * /buses:
 *   get:
 *     tags:
 *       - Buses
 *     summary: Get all buses with pagination
 *     security:
 *       - bearerAuth:[]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: serviceType
 *         schema:
 *           type: string
 *           enum:[TRANSMETRO, TRANSURBANO, TUBUS]
 *     responses:
 *       200:
 *         description: List of buses retrieved successfully
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
 *                     $ref: '#/components/schemas/Bus'
 * 
 *   post:
 *     tags:
 *       - Buses
 *     summary: Create a new bus
 *     security:
 *       - bearerAuth:[]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: 
 *               - busCode
 *               - serviceType
 *             properties:
 *               busCode:
 *                 type: string
 *                 description: Código único (ej. TM-101)
 *               plateNumber:
 *                 type: string
 *               serviceType:
 *                 type: string
 *                 enum: [TRANSMETRO, TRANSURBANO, TUBUS]
 *     responses:
 *       201:
 *         description: Bus created successfully
 * 
 * /buses/{id}/assign-route:
 *   put:
 *     tags:
 *       - Buses
 *     summary: Assign a route to a bus
 *     description: Asigna una ruta a un bus validando que pertenezcan al mismo ServiceType.
 *     security:
 *       - bearerAuth:[]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: 
 *               - routeId
 *             properties:
 *               routeId:
 *                 type: string
 *                 description: ID de Mongo o Código de la Ruta
 *     responses:
 *       200:
 *         description: Route assigned successfully
 *       400:
 *         description: Type mismatch (ej. Bus Transmetro a Ruta TuBus)
 */
router.use(validateJWT);

router.get('/', getBuses);
router.post('/', createBus);
router.put('/:id/assign-route', assignRouteToBus);

export default router;