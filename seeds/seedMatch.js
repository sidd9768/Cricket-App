const mongoose = require('mongoose')
// const venues = require('./matches')
const Matches = require('../models/matches')
const Team = require('../models/teams')
const Venue = require('../models/venue')

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

const teams = ['India', 'England', 'Australia', 'New Zealand', 'South Africa', 'Sri Lanka',
                'West Indies', 'Bangladesh', 'Pakistan', 'Zimbabwe']
                
const seedDB = async () => {
    await Matches.deleteMany({})
    for (let i=0; i<10; i++){
        const venue = new Venue({
            name: venues[i].name,
            image: venues[i].image,
            country: venues[i].country,
            capacity: venues[i].capacity,
        })
        await venue.save()
    }
}

seedDB().then( () => {
    mongoose.connection.close()
})