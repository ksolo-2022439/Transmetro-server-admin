'use strict';

import Bus from './bus.model.js';
import Road from '../roads/road.model.js';
import mongoose from 'mongoose';

// 1. Obtener todos los buses (Con paginación y filtro de tipo de servicio)
export const getBuses = async (req, res) => {
    try {
        const { page = 1, limit = 10, serviceType } = req.query;
        
        const filter = {};
        if (serviceType) filter.serviceType = serviceType.toUpperCase();

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const buses = await Bus.find(filter)
            .populate('assignedRoute', 'name routeCode typeRoad') // Trae los datos de la ruta en vez de solo el ID
            .limit(parseInt(limit))
            .skip(skip)
            .sort({ createdAt: -1 });

        const total = await Bus.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: buses,
            summary: {
                totalBuses: total
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los buses',
            error: error.message
        });
    }
};

// 2. Crear un nuevo bus
export const createBus = async (req, res) => {
    try {
        const { busCode, plateNumber, serviceType } = req.body;

        const busData = {
            busCode,
            plateNumber,
            serviceType: serviceType.toUpperCase()
        };

        const bus = new Bus(busData);
        await bus.save();

        res.status(201).json({
            success: true,
            message: 'Bus creado exitosamente',
            data: bus
        });

    } catch (error) {
        // Captura el error si intentan meter un busCode o Placa repetida
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'El código o la placa del bus ya existe',
                error: error.keyValue
            });
        }
        res.status(500).json({
            success: false,
            message: 'Error al crear el bus',
            error: error.message
        });
    }
};

// 3. Asignar ruta a un bus (CON CANDADO DE SEGURIDAD CRUZADO)
export const assignRouteToBus = async (req, res) => {
    try {
        const { id } = req.params; // ID de Mongo del Bus
        const { routeId } = req.body; // ID de Mongo o Código (ej. L12) de la Ruta

        // Buscamos el bus
        const bus = await Bus.findById(id);
        if (!bus) {
            return res.status(404).json({ success: false, message: 'Bus no encontrado' });
        }

        // Buscamos la ruta (soporta búsqueda por ID de Mongo o por Código como L12)
        let query = mongoose.Types.ObjectId.isValid(routeId) ? { _id: routeId } : { routeCode: routeId.toUpperCase() };
        const road = await Road.findOne(query);

        if (!road) {
            return res.status(404).json({ success: false, message: 'Ruta no encontrada' });
        }

        // --- EL CANDADO MAESTRO ---
        if (bus.serviceType !== road.serviceType) {
            return res.status(400).json({
                success: false,
                message: `Error de compatibilidad: No puedes asignar una ruta diseñada para ${road.serviceType} a un bus de la flotilla de ${bus.serviceType}`
            });
        }

        // Si coinciden, guardamos
        bus.assignedRoute = road._id;
        await bus.save();

        res.status(200).json({
            success: true,
            message: 'Ruta asignada exitosamente al bus',
            data: bus
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al asignar la ruta al bus',
            error: error.message
        });
    }
};