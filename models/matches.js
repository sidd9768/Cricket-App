const mongoose = require('mongoose');
const Venue = require('./venue')
const MatchSummary = require('./matchResult')
const Schema = mongoose.Schema;

const matchSchema = new Schema({
    teamOne: String,
    teamTwo: String,
    matchNumber: Number,
    venue: {
        type: Schema.Types.ObjectId,
        ref: "Venue"
    },
    finished: Boolean,
    matchSummary: {
        type: Schema.Types.ObjectId,
        ref: "MatchSummary"
    }
})

module.exports = mongoose.model('Match', matchSchema)