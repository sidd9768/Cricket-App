const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pointSchema = new Schema({
    gamesWon: Number,
    gamesLose: Number,
    point: Number,
    nrr: Number
})

module.exports = mongoose.model('TeamPoint', pointSchema)