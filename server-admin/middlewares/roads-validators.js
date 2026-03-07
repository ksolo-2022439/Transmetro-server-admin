import { body, param } from 'express-validator';
import { checkValidators } from "./check-validators.js";

export const validateCreateRoad = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('El nombre de la ruta es obligatorio')
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre de la ruta debe tener entre 2 y 100 caracteres'),
    body('routeCode')
        .trim()
        .notEmpty()
        .withMessage('El código de la ruta es obligatorio (ej. L1, L12)')
        .toUpperCase(),
    body('typeRoad')
        .isIn(['CENTRALES', 'CARRIL LATERAL', 'TRASBORDO', 'TERMINALES'])
        .withMessage('El tipo de ruta debe ser CENTRALES, CARRIL LATERAL, TRASBORDO o TERMINALES'),
    body('stations')
        .optional()
        .isArray()
        .withMessage('Las estaciones deben enviarse como un arreglo de IDs'),
    body('stations.*')
        .isMongoId()
        .withMessage('Cada estación en el arreglo debe ser un ID válido de MongoDB'),
    body('coordinates')
        .isArray({ min: 2 })
        .withMessage('Las coordenadas deben ser un arreglo de al menos 2 puntos (LineString)'),
    body('coordinates.*')
        .isArray({ min: 2, max: 2 })
        .withMessage('Cada punto de la ruta debe ser un arreglo [longitud, latitud]'),
    body('coordinates.*.*')
        .isFloat()
        .withMessage('Las coordenadas de cada punto deben ser valores numéricos'),
    checkValidators
];

export const validateUpdateRoad = [
    param('id')
        .notEmpty()
        .withMessage('El identificador de la ruta es obligatorio'),
    body('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre de la ruta debe tener entre 2 y 100 caracteres'),
    body('typeRoad')
        .optional()
        .isIn(['CENTRALES', 'CARRIL LATERAL', 'TRASBORDO', 'TERMINALES'])
        .withMessage('El tipo de ruta debe ser CENTRALES, CARRIL LATERAL, TRASBORDO o TERMINALES'),
    body('stations')
        .optional()
        .isArray()
        .withMessage('Las estaciones deben enviarse como un arreglo de IDs'),
    body('coordinates')
        .optional()
        .isArray({ min: 2 })
        .withMessage('Las coordenadas deben ser un arreglo de al menos 2 puntos'),
    body('coordinates.*')
        .optional()
        .isArray({ min: 2, max: 2 })
        .withMessage('Cada punto debe ser un arreglo [longitud, latitud]'),
    checkValidators
];

export const validateGetRoadById = [
    param('id')
        .notEmpty()
        .withMessage('El identificador (ID o Código) de la ruta es obligatorio'),
    checkValidators
];

export const validateRoadStatusChange = [
    param('id')
        .notEmpty()
        .withMessage('El identificador de la ruta es obligatorio'),
    body('status')
        .notEmpty()
        .withMessage('El estado es obligatorio')
        .isIn(['ACTIVE', 'INACTIVE', 'MAINTENANCE', 'CLOSED'])
        .withMessage('El estado debe ser ACTIVE, INACTIVE, MAINTENANCE o CLOSED'),
    checkValidators
];