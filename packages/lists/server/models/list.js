'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * List Schema
 */
var ListSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },  
  productsList: {
    type: Array    
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

/**
 * Validations
 */

/*ListSchema.path('content').validate(function(content) {
  return !!content;
}, 'Content cannot be blank');*/

/**
 * Statics
 */
ListSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('List', ListSchema);
