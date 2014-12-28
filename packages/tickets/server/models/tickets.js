'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Ticket Schema
 */
var TicketSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  itemsTicket: {
    type: Array
  }
});

/**
 * Validations
 */
TicketSchema.path('title').validate(function(title) {
  return !!title;
}, 'Title cannot be blank');


/**
 * Statics
 */
TicketSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Ticket', TicketSchema);