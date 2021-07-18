const mongoose = require('mongoose');
const Venue = require('../models/venue')
const matches = require('../models/matches');

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
const venu = new Venue({
    teamOne: "Australia",
    teamTwo: "India",
    matchNumber: 1,
    Venue: await Venue.findOne()
})

venu.save()


