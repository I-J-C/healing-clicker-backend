const mongoose = require('../db/connection');

const gamestateSchema = new mongoose.Schema({
    currency: Number,
    idleBones: Number,
    shovel: Number,
    boneBro: Number,
    skeleSnake: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
} 
);

module.exports = mongoose.model('Gamestate', gamestateSchema);