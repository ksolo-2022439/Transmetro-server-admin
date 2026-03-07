import { Router } from 'express';
import { 
    getStations, 
    getAllStations, 
    getStationById, 
    createStation, 
    updateStation, 
    changeStationStatus 
} from './station.controller.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';

import {
    validateCreateStation, 
    validateUpdateStation,
    validateGetStationById,
    validateStationStatusChange
} from "../../middlewares/stations-validators.js";

const router = Router();

// GET
router.get('/', validateJWT, getStations);
router.get('/all', validateJWT, getAllStations); 
router.get('/:id', validateGetStationById, validateJWT, getStationById);

// POST
router.post('/', validateCreateStation, validateJWT, createStation);  

// PUT 
router.put('/:id', validateUpdateStation, validateJWT, updateStation);
router.put('/:id/status', validateStationStatusChange, validateJWT, changeStationStatus);

export default router;