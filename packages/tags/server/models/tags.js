'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Tag Schema
 */
var TagSchema = new Schema({
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
TagSchema.path('title').validate(function(title) {
  return !!title;
}, 'Title cannot be blank');

TagSchema.path('content').validate(function(content) {
  return !!content;
}, 'Content cannot be blank');

/**
 * Statics
 */
TagSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Tag', TagSchema);