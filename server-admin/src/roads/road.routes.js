import { Router } from 'express';
import { 
    getRoads, 
    getAllRoads, 
    getRoadById, 
    createRoad, 
    updateRoad, 
    changeRoadStatus 
} from './road.controller.js';
// import { validateJWT } from '../../middlewares/validate-jwt.js';

import {
    validateCreateRoad, 
    validateUpdateRoad,
    validateGetRoadById,
    validateRoadStatusChange
} from "../../middlewares/roads-validators.js";

const router = Router();

// GET
router.get('/', getRoads);
router.get('/all', getAllRoads); 
router.get('/:id', validateGetRoadById, getRoadById);

// POST
router.post('/', validateCreateRoad, createRoad);  

// PUT
router.put('/:id', validateUpdateRoad, updateRoad);
router.put('/:id/status', validateRoadStatusChange, changeRoadStatus);

export default router;