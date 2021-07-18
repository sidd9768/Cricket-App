const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchSummarySchema = new Schema({
    teamWon: String,
    teamLose: String,
    manOfTheMatch: String,
    bowlerOfTheMatch: String,
    fielderOfTheMatch: String,
})

module.exports = mongoose.model('MatchSummary', matchSummarySchema)