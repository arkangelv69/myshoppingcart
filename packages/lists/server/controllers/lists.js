'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  List = mongoose.model('List'),
  _ = require('lodash');


/**
 * Find list by id
 */
exports.list = function(req, res, next, id) {
  console.log(id);
  List.load(id, function(err, list) {
    if (err) return next(err);
    if (!list) return next(new Error('Failed to load list ' + id));
    req.list = list;
    next();
  });
};

/**
 * Create an list
 */
exports.create = function(req, res) {
  var list = new List(req.body);
  list.user = req.user;

  list.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot save the list'
      });
    }
    res.json(list);

  });
};

/**
 * Update an list
 */
exports.update = function(req, res) {
  var list = req.list;

  list = _.extend(list, req.body);

  list.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot update the list'
      });
    }
    res.json(list);

  });
};

/**
 * Show an list by user
 */
/**
 * Show an market
 */
exports.show = function(req, res) {  
  List.findOne({
    user: req.user._id
  }).populate('user', 'name username').exec(function(err, list) {
    console.log(list);
    console.log(err);
    if (err) {
      return res.status(500).json({
        error: 'Cannot list the articles'
      });
    }
    res.json(list);
  });
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
  List.find().sort('-created').populate('user', 'name username').exec(function(err, lists) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot list the articles'
      });
    }
    res.json(lists);

  });
};