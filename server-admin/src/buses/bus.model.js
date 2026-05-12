import mongoose from 'mongoose';

const busSchema = new mongoose.Schema({
    busCode: { 
        type: String,
        required:[true, 'El código del bus es obligatorio'],
        unique: true,
        trim: true,
        uppercase: true // Siempre lo guardará en mayúsculas (ej. TM-101)
    },
    plateNumber: { 
        type: String,
        trim: true,
        uppercase: true,
        default: null
    },
    serviceType: { 
        type: String,
        required:[true, 'El tipo de servicio es obligatorio'],
        enum:['TRANSMETRO', 'TRANSURBANO', 'TUBUS']
    },
    assignedRoute: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Road', // Relación directa con la colección de Rutas
        default: null
    },
    status: {
        type: String,
        enum:['ACTIVE', 'INACTIVE', 'MAINTENANCE'],
        default: 'ACTIVE'
    }
}, { 
    timestamps: true, 
    versionKey: false 
});

export default mongoose.model('Bus', busSchema);