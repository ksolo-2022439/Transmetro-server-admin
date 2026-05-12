import { body, param } from "express-validator";
import { checkValidators } from "./check-validators.js";

// Validador para la creación de un nuevo Bus
export const validateCreateBus =[
  body("busCode")
    .trim()
    .notEmpty()
    .withMessage("El código del bus es obligatorio (ej. TM-101)")
    .isLength({ min: 2, max: 30 })
    .withMessage("El código del bus debe tener entre 2 y 30 caracteres")
    .toUpperCase(),
    
  body("plateNumber")
    .optional()
    .trim()
    .isString()
    .withMessage("El número de placa debe ser texto")
    .toUpperCase(),
    
  body("serviceType")
    .notEmpty()
    .withMessage("El tipo de servicio es obligatorio")
    .isIn(["TRANSMETRO", "TRANSURBANO", "TUBUS"])
    .withMessage("El tipo de servicio debe ser TRANSMETRO, TRANSURBANO o TUBUS"),
    
  checkValidators,
];

// Validador para el candado de asignación de Ruta
export const validateAssignRouteToBus =[
  param("id")
    .notEmpty()
    .withMessage("El ID del bus es obligatorio en la URL")
    .isMongoId()
    .withMessage("El identificador del bus debe ser un ID válido de MongoDB"),
    
  body("routeId")
    .notEmpty()
    .withMessage("El routeId es obligatorio en el body")
    .isString()
    .withMessage("El routeId debe ser un texto (ID o Código de Ruta)"),
    
  checkValidators,
];