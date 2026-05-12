import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Tconecta API Documentation',
            version: '1.0.0',
            description: 'API Documentation for Tconecta Admin Server',
            contact: {
                name: 'Tconecta Team',
                email: 'support@tconecta.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:3001/TCONECTA/v1',
                description: 'Development Server'
            },
            {
                url: 'https://api.tconecta.com/TCONECTA/v1',
                description: 'Production Server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'JWT Bearer token required for authentication'
                }
            },
            schemas: {   
                Bus: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        busCode: { type: 'string', description: 'Código único del bus (ej. TM-100)' },
                        plateNumber: { type: 'string', description: 'Placa vehicular' },
                        serviceType: { 
                            type: 'string', 
                            enum:['TRANSMETRO', 'TRANSURBANO', 'TUBUS'],
                            description: 'A qué sistema pertenece el bus'
                        },
                        assignedRoute: { type: 'string', description: 'ID de la ruta asignada actualmente' },
                        status: {
                            type: 'string',
                            enum: ['ACTIVE', 'INACTIVE', 'MAINTENANCE']
                        },
                        createdAt: { type: 'string', format: 'date-time' }
                    }
                },
                Road: {
                    type: 'object',
                    properties: {
                        // ... (propiedades de Road que ya tenías)
                        serviceType: { 
                            type: 'string', 
                            enum:['TRANSMETRO', 'TRANSURBANO', 'TUBUS']
                        }
                    }
                },
                Station: {
                    type: 'object',
                    properties: {
                        // ... (propiedades de Station que ya tenías)
                        serviceType: { 
                            type: 'string', 
                            enum:['TRANSMETRO', 'TRANSURBANO', 'TUBUS']
                        }
                    }
                },
                Station: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'Unique identifier for the station'
                        },
                        name: {
                            type: 'string',
                            description: 'Name of the station'
                        },
                        stationCode: {
                            type: 'string',
                            description: 'Code identifier for the station'
                        },
                        typeStation: {
                            type: 'string',
                            enum: ['TERMINAL', 'PARADA', 'INTERMEDIA'],
                            description: 'Type of station'
                        },
                        location: {
                            type: 'object',
                            properties: {
                                latitude: {
                                    type: 'number'
                                },
                                longitude: {
                                    type: 'number'
                                }
                            },
                            description: 'Geographic location'
                        },
                        status: {
                            type: 'string',
                            enum: ['ACTIVO', 'INACTIVO'],
                            description: 'Status of the station'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Creation timestamp'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Last update timestamp'
                        }
                    }
                },
                Alert: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'Unique identifier for the alert'
                        },
                        title: {
                            type: 'string',
                            description: 'Title of the alert'
                        },
                        description: {
                            type: 'string',
                            description: 'Detailed description of the alert'
                        },
                        type: {
                            type: 'string',
                            enum: ['CONGESTIÓN', 'ACCIDENTE', 'MANTENIMIENTO', 'OTRO'],
                            description: 'Type of alert'
                        },
                        status: {
                            type: 'string',
                            enum: ['ACTIVA', 'RESUELTA'],
                            description: 'Status of the alert'
                        },
                        severity: {
                            type: 'string',
                            enum: ['BAJA', 'MEDIA', 'ALTA'],
                            description: 'Severity level of the alert'
                        },
                        location: {
                            type: 'object',
                            properties: {
                                road: {
                                    type: 'string'
                                },
                                station: {
                                    type: 'string'
                                }
                            },
                            description: 'Location of the alert'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Creation timestamp'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Last update timestamp'
                        }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false
                        },
                        message: {
                            type: 'string',
                            description: 'Error message'
                        },
                        error: {
                            type: 'string',
                            description: 'Error details'
                        }
                    }
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: [
        './src/roads/road.routes.js',
        './src/stations/station.routes.js',
        './src/alerts/alert.routes.js',
        './src/buses/bus.routes.js', 
        './configs/app.js'
    ]
};

export const specs = swaggerJsdoc(options);
