const express = require('express');
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const path = require('path')

const Team = require('./models/teams')
const Player = require('./models/player')
const Venue = require('./models/venue')
const Match = require('./models/matches')
const matchTest = require('./models/matchSummaryGenerate')

const catchAsync = require('./utilities/catchAsync')
const ExpressError = require('./utilities/ExpressError')

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({extended: true}))


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

app.get('/:var(teams)?', catchAsync(async (req, res) => {
    const teams = await Team.find({}).sort({rank: 1})
    res.render('teams/teams', {teams})
}))

app.get('/matches', catchAsync(async (req, res) => {
    const matches = await Match.find({}).populate('venue').populate('matchSummary')
    // const teamOne = Team.find({name: })
    console.log(matches)
    res.render('matches/matches', {matches})
}))

app.get('/matches/:id', catchAsync(async (req, res) => {
    const match = await Match.findById(req.params.id).populate('venue').populate('matchSummary')
    const teamWon = await Team.find({name: match.matchSummary.teamWon}).populate('players')
    const teamLose = await Team.find({name: match.matchSummary.teamLose}).populate('players')
    const manOfTheMatch = await Player.find({name: match.matchSummary.manOfTheMatch})
    const bowlerOfTheMatch = await Player.find({name: match.matchSummary.bowlerOfTheMatch})
    const fielderOfTheMatch = await Player.find({name: match.matchSummary.fielderOfTheMatch})
    console.log(match)
    res.render("matches/matchDetail", {match, teamWon, teamLose , manOfTheMatch, bowlerOfTheMatch, fielderOfTheMatch})
}))

app.get('/venues', catchAsync(async (req, res) => {
    const venues = await Venue.find({})
    res.render('venues/venues', {venues})
}))

app.get('/venues/:id', catchAsync(async (req, res) => {
    const venue = await Venue.findById(req.params.id)
    res.render('venues/venueDetail', {venue})
}))

app.get('/matchMaker', (req, res) => {
    res.render('matchMaker')
})

app.post('/matchMaker', catchAsync(async (req, res) => {
    const {teamOne, teamTwo, matchNumber, finished} = req.body.match
    matchTest(teamOne, teamTwo, matchNumber, finished)
    res.redirect('/matchMaker')
}))

app.get('/pointsTable', catchAsync(async (req, res) => {
    const teams = await Team.find({})
    console.log(teams)
    res.render('pointsTable', {teams})
}))

app.get('/teams/:id', catchAsync(async (req, res) => {
    // const id = req.params.id
    const team = await Team.findById(req.params.id).populate("players");
    // const team = await Team.findById(req.params.id)
    const teamName = team.name
    const players = team.players
    console.log(players)
    res.render('teams/teamDetails', {teamName, players})
}))

app.get('/:teamName/player/new', (req,res) => {
    const teamName = req.params.teamName
    res.render('players/new', {teamName})
})

app.post('/:teamName/player', catchAsync(async(req, res) => {
    const teamName = req.params.teamName.trim()
    const team = await Team.find({name: `${teamName}`})
    const player = new Player(req.body.player)
    team[0].players.push(player)    
    await team[0].save()
    await player.save()
    res.redirect(`/${teamName}`);
}))

app.get('/teams/:teamName/:playerId', catchAsync(async (req, res) => {
    const teamName = req.params.teamName
    const player = await Player.findById(req.params.playerId)
    res.render("players/playerDetails", {player, teamName})
}))

app.all("*", (req, res, next) => {
    next(new ExpressError('Page not found', 404))
})

app.use((err, req, res, next) => {
    const {statusCode = 500} = err
    err.statusCode = 404
    err.message = "Page not found!"
    res.status(statusCode).render('error', {err})
})

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000!")
} )