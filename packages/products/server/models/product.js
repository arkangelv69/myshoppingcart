'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Product Schema
 */
var ProductSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  images: {
    type: Object,
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  categories: [{
    type: Schema.ObjectId,
    ref: 'Category'
  }],
  brand: {
    type: Schema.ObjectId,
    ref: 'Brand'
  }
});

/**
 * Validations
 */
ProductSchema.path('name').validate(function(name) {
  return !!name;
}, 'Name cannot be blank');

ProductSchema.path('description').validate(function(description) {
  return !!description;
}, 'Description cannot be blank');

/**
 * Statics
 */
ProductSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Product', ProductSchema);