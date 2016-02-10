'use strict'

const express = require('express')
const app = express()
const db = require('./db')

const userController = require('./controllers/user')
const api = require('./controllers/api')

const apiDescription = require('./docs/apiDescription.json')
const utils = require('./utils')
const config = utils.getConfig()
const port = config.PORT

const userAuthMiddleware = require('./middlewares/userAuthentication')

// middlewares
app.use(function(req, res , next){
	console.log(req.originalUrl);
	next();
});

// prettify the json I send
app.set('json spaces', 20)

app.get('/', function(req, res){
	res.json(apiDescription);
});

// user
app.post('/login', userController.login)
app.post('/register', userController.register)

// api
app.get('/api/items', api.allItems);
app.get('/api/play', api.play);

app.listen(port, () => {
  console.log("Listening on port ", port)
})