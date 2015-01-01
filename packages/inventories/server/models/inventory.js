'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Inventory Schema
 */
var InventorySchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },  
  productsInventory: {
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

/*InventorySchema.path('content').validate(function(content) {
  return !!content;
}, 'Content cannot be blank');*/

/**
 * Statics
 */
InventorySchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Inventory', InventorySchema);
