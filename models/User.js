const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true,
        enum: [
            "Novato Masculino",
            "Novato Femenino",
            "Escalado Masculino",
            "Escalado Femenino",
            "Avanzado Masculino",
            "Avanzado Femenino",
            "RX'd Masculino",
        ]
    },
    payment: {
        type: String,
        required: true,
        trim: true
    },
    register: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model('User', UsersSchema);