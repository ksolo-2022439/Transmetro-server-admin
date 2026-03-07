import { Router } from 'express';
import { 
    getStations, 
    getAllStations, 
    getStationById, 
    createStation, 
    updateStation, 
    changeStationStatus 
} from './station.controller.js';
// import { validateJWT } from '../../middlewares/validate-jwt.js';

import {
    validateCreateStation, 
    validateUpdateStation,
    validateGetStationById,
    validateStationStatusChange
} from "../../middlewares/stations-validators.js";

const router = Router();

// GET
router.get('/', getStations);
router.get('/all', getAllStations); 
router.get('/:id', validateGetStationById, getStationById);

// POST
router.post('/', validateCreateStation, createStation);  

// PUT 
router.put('/:id', validateUpdateStation, updateStation);
router.put('/:id/status', validateStationStatusChange, changeStationStatus);

export default router;