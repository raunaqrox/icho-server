var express = require('express');
var app = express();
var db; 
var config = require('./config');
var port = config.PORT;
var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = process.env.DB_URL || 'mongodb://localhost:27017/icho';
var S3 = "https://s3-ap-southeast-1.amazonaws.com/icho/";

MongoClient.connect(url, function(err, d) {
  console.log("DB connected correctly to server");
  if(err) return console.error(err);
	db = d;
});

app.use(function(req, res , next){
	console.log(req.originalUrl);
	next();
});
app.get('/', function(req, res){
	res.send("All working");
});

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

app.get('/api/items', function(req, res){
	var type = req.query.type;
	var sort = {};
	if(type == "Popular"){
		sort.played = -1;
	}
	db.collection('items').find({$query:{},$orderby:sort}).toArray(function(err, result){
		res.json(result);
	});
});

app.get('/api/play', function(req, res){
	var id = req.query.id;
	db.collection('items').update({_id : new ObjectID(id)},{$inc : {played:1}}, function(err, result){
		if(err) console.error(err);
		db.collection("items").findOne({_id:new ObjectID(id)}, function(err, result){
			if(err) console.error(err);
			var url = S3 + result.uploader + "/" + result.title + ".mp3";
			console.log(url);
			res.send(url);
		})
		
	});
});

app.listen(port, function(){
	console.log('Listening to port '+ port);
});
