const mongoose = require('../db/connection');

const gamestateSchema = new mongoose.Schema({
    currency: {
        type: Number,
        default: 0,
    },
    upgrades: {
        shovel: {type: Number,
        default: 0,
        },
        boneBro: {type: Number,
            default: 0,
        },
        skeleSnake: {type: Number,
            default: 0,
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
} 
);

module.exports = mongoose.model('Gamestate', gamestateSchema);