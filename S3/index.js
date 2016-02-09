var env = process.env.NODE_ENV === 'development' ? 'development' : 'production'
var config = require('../config/config.json')[env]
var AWS = require('aws-sdk')
var s3 = new AWS.S3()

function createBucket(bucketName, fileName, data, res){
  s3.createBucket({Bucket: 'testing'}, function(){
  var params = {Bucket: bucketName, Key: fileName, Body: data}
  s3.putObject(params, function(err, data) {
    if (err)
      console.log(err)
    else
      res.send("Successfully uploaded data to "+bucketName)
    })
  })
}

exports.createBucket = createBucket