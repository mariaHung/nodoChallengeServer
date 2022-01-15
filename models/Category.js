const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, 'Please add a category'],
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
    createdAt: {
        type: Date,
        default: Date.now
    },

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});



module.exports = mongoose.model('Category', CategorySchema);