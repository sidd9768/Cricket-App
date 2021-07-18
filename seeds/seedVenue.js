const mongoose = require('mongoose')
const venues = require('./venues')
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

const seedDB = async () => {
    await Venue.deleteMany({})
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