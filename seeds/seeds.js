const mongoose = require('mongoose')
const teams = require('./teams')
const Team = require('../models/teams')

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

const seedDB = async () => {
    await Team.deleteMany({})
    for (let i=0; i<10; i++){
        const rank = Math.floor(Math.random() * 10) + 1
        const team = new Team({
            name: teams[i].name,
            rank: teams[i].rank,
            image: teams[i].logo
        })
        await team.save()
    }
}

seedDB().then( () => {
    mongoose.connection.close()
})