var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var db = require('./db');


app.get('/', function(req, res){

});

app.listen(port, function(){
	console.log('Listening to port '+ port);
});