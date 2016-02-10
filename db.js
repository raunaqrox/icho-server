const mongoose = require('mongoose')
const utils = require('./utils')
const config = utils.getConfig()
const url = config.database.url

mongoose.Promise = require('bluebird')

mongoose.connect(url)

const db = mongoose.connection

db.on('error', () => {
  consoe.log("Error connecting")
})

db.once('open', () => {
  console.log("Database connected!")
})


module.exports = db;