// const mongoose = require('mongoose')
// // const venues = require('./matches')
// const Matches = require('../models/matches')
// const Team = require('../models/teams')
// const Venue = require('../models/venue')

// mongoose.connect('mongodb://localhost:27017/cricket', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// })

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "Connection Error:"))
// db.once("open", () => {
//     console.log("Database Connected!")
// })

// const teamCreate = async() => {
//     const team = new Team({
//         name: "India",
//         rank: 1,
//         image: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/Cricket_India_Crest.svg/1200px-Cricket_India_Crest.svg.png",
//     })
//     await team.save()
//     console.log(team)
// }

// teamCreate()


const matchTest = require('../models/matchSummaryGenerate')

matchTest("England", "Australia", 11 ,"true")