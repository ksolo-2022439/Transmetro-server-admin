import { Router } from 'express';
import { createAlert, getActiveAlerts, resolveAlert } from './alert.controller.js';
import { createAlertValidator, updateAlertStatusValidator } from '../../middlewares/alerts-validators.js';
import { validateJWT } from '../../middlewares/auth-validators.js';

const router = Router();

router.use(validateJWT);

router.post('/', createAlertValidator, createAlert);
router.get('/', getActiveAlerts);
router.put('/:id/status', updateAlertStatusValidator, resolveAlert);

export default router;