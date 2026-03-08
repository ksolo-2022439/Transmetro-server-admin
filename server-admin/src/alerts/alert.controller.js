"use strict";

import Alert from './alert.model.js';

// Crear una nueva alerta
export const createAlert = async (req, res) => {
    try {
        const { title, description, typeAlert } = req.body;

        const newAlert = new Alert({
            title,
            description,
            typeAlert
        });

        await newAlert.save();

        res.status(201).json({
            success: true,
            message: 'Alerta publicada exitosamente',
            data: newAlert
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear la alerta',
            error: error.message
        });
    }
};

// Listar todas las alertas activas
export const getActiveAlerts = async (req, res) => {
    try {
        const alerts = await Alert.find({ status: 'ACTIVE' }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            total: alerts.length,
            data: alerts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener las alertas',
            error: error.message
        });
    }
};

// Cambiar el estado de una alerta (ej. marcar como resuelta)
export const resolveAlert = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const alert = await Alert.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!alert) {
            return res.status(404).json({
                success: false,
                message: 'Alerta no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Estado de alerta actualizado',
            data: alert
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar la alerta',
            error: error.message
        });
    }
};