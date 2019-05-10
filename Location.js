const mongoose = require('mongoose')
const Schema = mongoose.Schema

const locationSchema = new Schema({
    title: String,
    destination: String,
    country: String
})

const LocationClass = mongoose.model('location', locationSchema)
module.exports = LocationClass