'use strict'
var User = require('../models/User.js')

exports.register = (req, res) => {
  let newUser = new User(req.body);

}