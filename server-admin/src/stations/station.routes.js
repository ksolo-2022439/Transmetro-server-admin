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
// import { validateJWT } from '../../middlewares/validate-jwt.js';

import {
    validateCreateStation, 
    validateUpdateStation,
    validateGetStationById,
    validateStationStatusChange
} from "../../middlewares/stations-validators.js";

const router = Router();

// GET
router.get('/', validatePagination, validateStationFilters, getStations);
router.get('/all', validateStationFilters, getAllStations); 
router.get('/:id', validateGetStationById, getStationById);

// POST
router.post('/', validateCreateStation, createStation);  

// PUT 
router.put('/:id', validateUpdateStation, updateStation);
router.put('/:id/status', validateStationStatusChange, changeStationStatus);

export default router;