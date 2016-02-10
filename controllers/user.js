'use strict'
const User = require('../models/User.js')
const co = require('co');

exports.register = (req, res) => {
  //TODO validate if 
  let newUser = new User(req.body)
  // generate new token and add it to user
  newUser.save()
}

exports.login = (req, res) => {
  // validate the req.body
  User.findOne({id: req.userId}).exec().then((err, user) => {
    if(err) {
      // return and end response
    }
    user.comparePassword(req.body.password, (err, result) => {
      if(err){
        // return and end response
      }
      // generate new token and send it back
    })
  });
}