import { Schema, model } from 'mongoose';

const AlertSchema = Schema({
    title: {
        type: String,
        required: [true, 'El título de la alerta es obligatorio']
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    typeAlert: {
        type: String,
        enum: ['INCIDENT', 'MAINTENANCE', 'INFO'],
        default: 'INFO'
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'RESOLVED'],
        default: 'ACTIVE'
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model('Alert', AlertSchema);