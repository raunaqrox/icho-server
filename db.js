var MongoClient = require('mongodb').MongoClient;
var url = process.env.DB_URL || 'mongodb://localhost:27017/icho';

module.exports = MongoClient.connect(url, function(err, db) {
  console.log("DB connected correctly to server");
  if(err) return console.error(err);
  return db
});
