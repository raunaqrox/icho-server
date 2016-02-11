'use strict'
const User = require('../models/User.js')

exports.register = (req, res) => {
  //TODO validate if 
  User.findOne({email: req.body.email}).exec().then((err, existingUser)=>{
    if(existingUser){
      return res.json({error: true, message: "User already exists"})
    }
    let newUser = new User(req.body)
    return newUser.save()
  }).then(()=>{
    res.sendStatus(200);
  }).catch(err => {
    return res.json({error: true, stack: JSON.stringify(err)})
  })
}
  // generate new token and add it to user

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