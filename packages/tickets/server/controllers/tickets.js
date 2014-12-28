'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Ticket = mongoose.model('Ticket'),
  _ = require('lodash');


/**
 * Find ticket by id
 */
exports.ticket = function(req, res, next, id) {
  Ticket.load(id, function(err, ticket) {
    if (err) return next(err);
    if (!ticket) return next(new Error('Failed to load ticket ' + id));
    req.ticket = ticket;
    next();
  });
};

/**
 * Create an ticket
 */
exports.create = function(req, res) {
  var ticket = new Ticket(req.body);
  console.log(ticket);
  ticket.user = req.user;

  ticket.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot save the ticket'
      });
    }
    res.json(ticket);

  });
};

/**
 * Update an ticket
 */
exports.update = function(req, res) {
  var ticket = req.ticket;

  ticket = _.extend(ticket, req.body);

  ticket.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot update the ticket'
      });
    }
    res.json(ticket);

  });
};

/**
 * Delete an ticket
 */
exports.destroy = function(req, res) {
  var ticket = req.ticket;

  ticket.remove(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot delete the ticket'
      });
    }
    res.json(ticket);

  });
};

/**
 * Show an ticket
 */
exports.show = function(req, res) {
  res.json(req.ticket);
};

/**
 * List of Tickets
 */
exports.all = function(req, res) {
  Ticket.find().sort('-created').populate('user', 'name username').exec(function(err, tickets) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot list the tickets'
      });
    }
    res.json(tickets);

  });
};
