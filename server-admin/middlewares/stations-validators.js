import { body, param } from 'express-validator';
import { checkValidators } from "./check-validators.js";

export const validateCreateStation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('El nombre de la estación es obligatorio')
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
    body('stationCode')
        .trim()
        .notEmpty()
        .withMessage('El código de la estación es obligatorio (ej. EST-01)')
        .toUpperCase(),
    body('typeStation')
        .isIn(['CENTRALES', 'CARRIL LATERAL', 'TRASBORDO', 'TERMINALES'])
        .withMessage('El tipo de estación debe ser CENTRALES, CARRIL LATERAL, TRASBORDO o TERMINALES'),
    body('coordinates')
        .isArray({ min: 2, max: 2 })
        .withMessage('Las coordenadas deben ser un arreglo de exactamente 2 números [longitud, latitud]'),
    body('coordinates.*')
        .isFloat()
        .withMessage('Las coordenadas deben ser valores numéricos (latitud/longitud)'),
    checkValidators
];

export const validateUpdateStation = [
    param('id')
        .notEmpty()
        .withMessage('El identificador de la estación es obligatorio'),
    body('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
    body('typeStation')
        .optional()
        .isIn(['CENTRALES', 'CARRIL LATERAL', 'TRASBORDO', 'TERMINALES'])
        .withMessage('El tipo de estación debe ser CENTRALES, CARRIL LATERAL, TRASBORDO o TERMINALES'),
    body('coordinates')
        .optional()
        .isArray({ min: 2, max: 2 })
        .withMessage('Las coordenadas deben ser un arreglo de exactamente 2 números [longitud, latitud]'),
    body('coordinates.*')
        .optional()
        .isFloat()
        .withMessage('Las coordenadas deben ser valores numéricos'),
    checkValidators
];

export const validateGetStationById = [
    param('id')
        .notEmpty()
        .withMessage('El identificador (ID o Código) de la estación es obligatorio'),
    checkValidators
];

export const validateStationStatusChange = [
    param('id')
        .notEmpty()
        .withMessage('El identificador de la estación es obligatorio'),
    body('status')
        .notEmpty()
        .withMessage('El estado es obligatorio')
        .isIn(['ACTIVE', 'INACTIVE', 'MAINTENANCE', 'CLOSED'])
        .withMessage('El estado debe ser ACTIVE, INACTIVE, MAINTENANCE o CLOSED'),
    checkValidators
];