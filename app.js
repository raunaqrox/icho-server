var express = require('express')
var app = express()
var env = process.env.NODE_ENV === 'development' ? 'development' : 'production'
var config = require('./config/config.json')[env]
var db = require('./db')(app)

app.use(function(req, res , next){
	console.log(req.originalUrl);
	next();
});

app.get('/', function(req, res){
	res.send("All working");
});

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