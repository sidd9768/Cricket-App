const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Player = require('./player')
const TeamPoint = require('./teamPoint')

const teamsSchema = new Schema({
    name: String,
    rank: Number,
    image: String,
    players: [
        {
            type: Schema.Types.ObjectId,
            ref: "Player"
        }
    ],
    matchesPlayed: {
        type: Number,
        default: 0
    },
    matchesWon: {
        type: Number,
        default: 0
    },
    matchesLose: {
        type: Number,
        default: 0
    },
    points: {
        type: Number,
        default: 0
    },
    nrr: {
        type: Number,
        default: 0
    },
})

module.exports = mongoose.model('Team', teamsSchema)