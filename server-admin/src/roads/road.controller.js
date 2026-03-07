'use strict';

import mongoose from 'mongoose';
import Road from './road.model.js';

// 1. Obtener todas las rutas 
export const getRoads = async (req, res) => {
    try {
        const { page = 1, limit = 10, status, typeRoad } = req.query;

        const filter = {};
        if (status) filter.status = status.toUpperCase();
        if (typeRoad) filter.typeRoad = typeRoad.toUpperCase();

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const roads = await Road.find(filter)
            .populate('stations', 'name stationCode typeStation location') // Trae la info de las estaciones asociadas
            .limit(parseInt(limit))
            .skip(skip)
            .sort({ createdAt: -1 });

        const total = await Road.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: roads,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalRecords: total,
                limit: parseInt(limit)
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener las rutas',
            error: error.message
        });
    }
};

// 2. Obtener TODAS las rutas
export const getAllRoads = async (req, res) => {
    try {
        const { status, typeRoad } = req.query;

        const filter = {};
        if (status) filter.status = status.toUpperCase();
        if (typeRoad) filter.typeRoad = typeRoad.toUpperCase();

        const roads = await Road.find(filter)
            .populate('stations', 'name stationCode')
            .sort({ createdAt: -1 });
            
        const total = await Road.countDocuments(filter);

        res.status(200).json({
            success: true,
            message: 'Rutas obtenidas exitosamente',
            totalRecords: total,
            data: roads
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener todas las rutas',
            error: error.message
        });
    }
};

// 3. Obtener una ruta por ID o Código
export const getRoadById = async (req, res) => {
    try {
        const { id } = req.params;
        let road;

        if (mongoose.Types.ObjectId.isValid(id)) {
            road = await Road.findById(id).populate('stations', 'name stationCode location');
        }
        if (!road) {
            road = await Road.findOne({ routeCode: id.toUpperCase() }).populate('stations', 'name stationCode location');
        }

        if (!road) {
            return res.status(404).json({
                success: false,
                message: 'Ruta no encontrada (buscado por ID o Código de Ruta)'
            });
        }

        res.status(200).json({
            success: true,
            data: road
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener la ruta',
            error: error.message
        });
    }
};

// 4. Crear una nueva ruta
export const createRoad = async (req, res) => {
    try {
        const { name, routeCode, typeRoad, stations, coordinates } = req.body;

        const roadData = {
            name,
            routeCode,
            typeRoad,
            stations: stations || [],
            path: {
                type: 'LineString',
                coordinates: coordinates
            }
        };

        const road = new Road(roadData);
        await road.save();

        res.status(201).json({
            success: true,
            message: 'Ruta creada exitosamente',
            data: road
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'El nombre o código de la ruta ya existe',
                error: error.keyValue
            });
        }
        res.status(500).json({
            success: false,
            message: 'Error al crear la ruta',
            error: error.message
        });
    }
};

// 5. Actualizar ruta
export const updateRoad = async (req, res) => {
    try {
        const { id } = req.params;
        const { coordinates, ...otherData } = req.body;
        
        const updateData = { ...otherData };
        
        if (coordinates) {
            updateData.path = {
                type: 'LineString',
                coordinates: coordinates
            };
        }

        let query = { _id: id };
        if (!mongoose.Types.ObjectId.isValid(id)) {
            query = { routeCode: id.toUpperCase() };
        }

        const road = await Road.findOneAndUpdate(query, updateData, {
            new: true,
            runValidators: true
        });

        if (!road) {
            return res.status(404).json({
                success: false,
                message: 'Ruta no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Ruta actualizada exitosamente',
            data: road
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al actualizar la ruta',
            error: error.message
        });
    }
};

// 6. Cambiar el estado de la ruta (Activar / Inactivar / Suspender)
export const changeRoadStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; 

        if (!['ACTIVE', 'INACTIVE', 'SUSPENDED'].includes(status.toUpperCase())) {
            return res.status(400).json({
                success: false,
                message: 'Estado inválido proporcionado'
            });
        }

        let query = { _id: id };
        if (!mongoose.Types.ObjectId.isValid(id)) {
            query = { routeCode: id.toUpperCase() };
        }

        const road = await Road.findOneAndUpdate(
            query,
            { status: status.toUpperCase() },
            { new: true }
        );

        if (!road) {
            return res.status(404).json({
                success: false,
                message: 'Ruta no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            message: `El estado de la ruta cambió a ${status.toUpperCase()} exitosamente`,
            data: road
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al cambiar el estado de la ruta',
            error: error.message
        });
    }
};