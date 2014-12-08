'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Market Schema
 */
var MarketSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  abstract: {
    type: String,    
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }  
});

/**
 * Validations
 */
MarketSchema.path('title').validate(function(title) {
  return !!title;
}, 'Title cannot be blank');

MarketSchema.path('content').validate(function(content) {
  return !!content;
}, 'Content cannot be blank');

/**
 * Statics
 */
MarketSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Market', MarketSchema);