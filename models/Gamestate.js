const mongoose = require('../db/connection');

const gamestateSchema = new mongoose.Schema({
    currency: {
        type: Number,
        required: true
    },
    upgrade1: {
        type: Number,
        default: 0,
    },
    // upgrade#: {
    //     type: Number,
    //     default: 0,
    // },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Gamestate', gamestateSchema);