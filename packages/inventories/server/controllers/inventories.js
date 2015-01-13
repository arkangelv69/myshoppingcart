'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Inventory = mongoose.model('Inventory'),
  _ = require('lodash');


/**
 * Find inventory by id
 */
exports.inventory = function(req, res, next, id) {  
  Inventory.load(id, function(err, inventory) {
    if (err) return next(err);
    if (!inventory) return next(new Error('Failed to load inventory ' + id));
    req.inventory = inventory;
    next();
  });
};

/**
 * Create an inventory
 */
exports.create = function(req, res) {
  var inventory = new Inventory(req.body);
  inventory.user = req.user;

  inventory.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot save the inventory'
      });
    }
    res.json(inventory);

  });
};

/**
 * Update an inventory
 */
exports.update = function(req, res) {
  var inventory = req.inventory;

  inventory = _.extend(inventory, req.body);

  inventory.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot update the inventory'
      });
    }
    res.json(inventory);

  });
};

/**
 * Show an inventory by user
 */
/**
 * Show an market
 */
exports.show = function(req, res) {  
  Inventory.findOne({
    user: req.user._id
  }).populate('user', 'name username').exec(function(err, inventory) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot inventory the articles'
      });
    }
    res.json(inventory);
  });
};

/**
 * Inventory of Articles
 */
exports.all = function(req, res) {
  Inventory.find().sort('-created').populate('user', 'name username').exec(function(err, inventories) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot inventory the articles'
      });
    }
    res.json(inventories);

  });
};