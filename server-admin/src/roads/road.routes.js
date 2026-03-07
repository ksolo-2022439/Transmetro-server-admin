import { Router } from 'express';
import { 
    getRoads, 
    getAllRoads, 
    getRoadById, 
    createRoad, 
    updateRoad, 
    changeRoadStatus 
} from './road.controller.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';

import {
    validateCreateRoad, 
    validateUpdateRoad,
    validateGetRoadById,
    validateRoadStatusChange
} from "../../middlewares/roads-validators.js";

const router = Router();

// GET
router.get('/', validateJWT, getRoads);
router.get('/all', validateJWT, getAllRoads); 
router.get('/:id', validateGetRoadById, validateJWT, getRoadById);

// POST
router.post('/', validateCreateRoad, validateJWT, createRoad);  

// PUT
router.put('/:id', validateUpdateRoad, validateJWT, updateRoad);
router.put('/:id/status', validateRoadStatusChange, validateJWT, changeRoadStatus);

export default router;