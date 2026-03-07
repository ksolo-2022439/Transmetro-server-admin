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
// import { validateJWT } from '../../middlewares/validate-jwt.js';

import {
    validateCreateRoad, 
    validateUpdateRoad,
    validateGetRoadById,
    validateRoadStatusChange
} from "../../middlewares/roads-validators.js";

const router = Router();

// GET
router.get('/', validatePagination, validateRoadFilters, getRoads);
router.get('/all', validateRoadFilters, getAllRoads); 
router.get('/:id', validateGetRoadById, getRoadById);

// POST
router.post('/', validateCreateRoad, createRoad);  

// PUT
router.put('/:id', validateUpdateRoad, updateRoad);
router.put('/:id/status', validateRoadStatusChange, changeRoadStatus);

export default router;