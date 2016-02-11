var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: String,
  url: String,
  createdAt: { type: Date, default: Date.now }
})

/**
 * Password hash middleware.
 */
itemSchema.pre('save', function(next) {
  // upload that item on s3, compress image and audio  
})

module.exports = mongoose.model('Item', itemSchema)