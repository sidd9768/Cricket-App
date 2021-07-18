const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const venues = require('../seeds/venues')

const venueSchema = new Schema({
    name: String,
    image: String,
    country: String,
    capacity: String
})

module.exports = mongoose.model('Venue', venueSchema)