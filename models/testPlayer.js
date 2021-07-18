const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    name: String,
    age: Number,
    image: String,
    role: {
        type: String,
        enum: ["Batsman", "Bowler","Wicket-Keeper", "All Rounder"]
    },
    matchPlayed: Number,
    runs: Number,
    average: Number,
    wickets: Number,
    catches: Number
})

module.exports = mongoose.model("TestPlayer", playerSchema)