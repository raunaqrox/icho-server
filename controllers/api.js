'use strict';

const db = require('../db')
const utils = require('../utils')
const config = utils.getConfig()
const S3 = config.amazon.S3
const Item = require('../models/Item')

exports.allItems = (req, res) => {
  const type = req.query.type
  let sort = {}
  if(type === "Popular"){
    sort.played = -1
  }
  Item.find({$query:{},$orderby:sort}).toArray(function(err, result){
    res.json(result)
  })
}

exports.play = (req, res) => {
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
}