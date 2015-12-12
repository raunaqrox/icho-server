var express = require('express');
var app = express();
var db = require('./db');
var config = require('./config');
var port = config.PORT;
var AWS = require('aws-sdk');
// AWS.config.loadFromPath('./aws_config.json')
var s3 = new AWS.S3();
function createBucket(bucketName, fileName, data, res){
	s3.createBucket({Bucket: 'testing'}, function(){
	var params = {Bucket: bucketName, Key: fileName, Body: data};
	s3.putObject(params, function(err, data) {
		if (err)
			console.log(err);
		else
			res.send("Successfully uploaded data to "+bucketName);
		});
	});
}

app.get('/', function(req, res){
	var data = req.query.data;
	createBucket('testing', 'test', data, res);
});

app.listen(port, function(){
	console.log('Listening to port '+ port);
});