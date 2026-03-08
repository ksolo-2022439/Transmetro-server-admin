import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const createAlertValidator = [
    body('title', 'El título es obligatorio y debe ser texto').notEmpty().isString(),
    body('description', 'La descripción es obligatoria').notEmpty().isString(),
    body('typeAlert', 'El tipo de alerta no es válido').optional().isIn(['INCIDENT', 'MAINTENANCE', 'INFO']),
    checkValidators
];

export const updateAlertStatusValidator = [
    param('id', 'No es un ID válido de MongoDB').isMongoId(),
    body('status', 'El estado no es válido').isIn(['ACTIVE', 'RESOLVED']),
    checkValidators
];