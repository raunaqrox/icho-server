'use strict'
const express = require('express')
const app = express()
const env = process.env.NODE_ENV === 'development' ? 'development' : 'production'
const config = require('./config/config.json')[env]
const db = require('./db')
const userController = require('./controllers/user')
const apiDescription = require('./docs/apiDescription.json')
const userAuthMiddleware = require('./middlewares/userAuthentication')
var port = config.PORT

app.use(function(req, res , next){
	console.log(req.originalUrl);
	next();
});

// prettify the json I send
app.set('json spaces', 20)

app.get('/', function(req, res){
	res.json(apiDescription);
});

app.post('/register', userController.register)

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

app.listen(port, () => {
  console.log("Listening on port ", port)
})