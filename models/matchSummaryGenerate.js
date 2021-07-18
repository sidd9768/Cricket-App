const mongoose = require('mongoose')
// const venues = require('./matches')
const Matches = require('./matches')
const Team = require('./teams')
const Venue = require('./venue')
const MatchSummary = require('./matchResult')
const Player = require('./player')
const TeamPoint = require('./teamPoint')

mongoose.connect('mongodb://localhost:27017/cricket', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"))
db.once("open", () => {
    console.log("Database Connected!")
})

const matchTest = async (teamOne, teamTwo, matchNumber, fin) => {
    console.log(teamOne)
    console.log(teamTwo)

    if (fin === "true") {
        const venues = await Venue.find({})
        const ven = venues[Math.floor(Math.random() * 10)]
        console.log(ven)

        const teams = [teamOne, teamTwo]
        const teamW = teams[Math.floor(Math.random() * 2)]
        const teamL = (teamW === teamOne) ? teamTwo : teamOne
        console.log("WON WON WON " + teamW)

        const teamWon = await Team.find({
            name: teamW
        }).populate('players')
        const teamLose = await Team.find({
            name: teamL
        }).populate('players')

        const playersWon = teamWon[0].players
        const playersLose = teamLose[0].players

        const matchSummary = new MatchSummary({
            teamWon: teamWon[0].name,
            teamLose: teamLose[0].name,
            manOfTheMatch: playersWon[Math.floor(Math.random() * 10)].name,
            bowlerOfTheMatch: playersWon[Math.floor(Math.random() * 10)].name,
            fielderOfTheMatch: playersWon[Math.floor(Math.random() * 10)].name,
        });

        const match = new Matches({
            teamOne: teamOne,
            teamTwo: teamTwo,
            matchNumber: matchNumber,
            venue: ven,
            finished: fin,
            matchSummary: matchSummary
        });
        
        match.venue = ven
        match.matchSummary = matchSummary
        teamWon[0].matchesPlayed += 1
        teamWon[0].matchesWon += 1
        teamWon[0].points += 2
        teamWon[0].nrr += Math.random()

        teamLose[0].matchesPlayed += 1
        teamLose[0].matchesLose += 1
        teamLose[0].nrr -= Math.random()

        console.log("TEAM WON")
        console.log(teamWon)
        console.log("TEAM LOSE")
        console.log(teamLose)
        console.log(match)

        await teamWon[0].save()
        await teamLose[0].save()
        await matchSummary.save()
        await match.save()
    } else {

        const venues = await Venue.find({})
        const ven = venues[Math.floor(Math.random() * 10)]
        console.log(ven)

        const teams = [teamOne, teamTwo]
        const teamW = teams[Math.floor(Math.random() * 2)]
        const teamL = (teamW === teamOne) ? teamTwo : teamOne
        console.log("WON WON WON " + teamW)

        const teamWon = await Team.find({
            name: teamW
        }).populate('players')
        const teamLose = await Team.find({
            name: teamL
        }).populate('players')

        const playersWon = teamWon[0].players
        const playersLose = teamLose[0].players

        const matchSummary = new MatchSummary({
            teamWon: "N/A",
            teamLose: "N/A",
            manOfTheMatch: "N/A",
            bowlerOfTheMatch: "N/A",
            fielderOfTheMatch: "N/A",
        });

        const match = new Matches({
            teamOne: teamOne,
            teamTwo: teamTwo,
            matchNumber: matchNumber,
            venue: ven,
            finished: fin,
            matchSummary: matchSummary
        });

        match.venue = ven
        match.matchSummary = matchSummary
        console.log(match)
        await teamWon[0].save()
        await teamLose[0].save()
        await matchSummary.save()
        await match.save()
    }
}
// matchTest("India", "Pakistan")

module.exports = matchTest