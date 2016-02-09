var mongoose = require('mongoose')
var env = process.env.NODE_ENV === 'development' ? 'development' : 'production'
var config = require('./config/config.json')[env]
var port = config.PORT
var url = config.database.url
mongoose.connect(url)
var db = mongoose.connection

db.on('error', () => {
  consoe.log("Error connecting")
})

db.once('open', () => {
  console.log("Database connected!")
})

module.exports = (app) => {
  app.listen(port, () => {
    console.log("Listening on port ", port)
  })
  return db
}
