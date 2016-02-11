'use strict';

const jwt = require('jwt-simple')
const utils = require('../utils')
const config = utils.getConfig()
const secret = config.auth.secret
const db = require('../db')

module.exports = (req, res, next) => {
  let auth_token = req.header('X-Icho-Auth')
  let decoded;
  if(auth_token) {
    try{
      decoded = jwt.decode(auth_token, secret)
    } catch(err) {
      res.status(400)
      res.json({error:true, message: "Bad token"})
    }
    if(!(decoded && decoded.userId)) {
      res.status(400)
    } else if(parseInt(decoded.expire) < Date.now()) {
      res.status(403)
      res.json({error: true, message: "Token has expired"})
    } else{

    }
  }
}