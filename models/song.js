const mongoose = require('mongoose')
const Schema = mongoose.Schema

const songSchema = new Schema({
   title: String,
   album: String,
   artistId: String
})

module.exports = mongoose.model('song', songSchema)