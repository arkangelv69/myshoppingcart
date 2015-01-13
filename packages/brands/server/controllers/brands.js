'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Brand = mongoose.model('Brand'),
  _ = require('lodash');


/**
 * Find brand by id
 */
exports.brand = function(req, res, next, id) {
  Brand.load(id, function(err, brand) {
    if (err) return next(err);
    if (!brand) return next(new Error('Failed to load brand ' + id));
    req.brand = brand;
    next();
  });
};

/**
 * Create an brand
 */
exports.create = function(req, res) {
  var brand = new Brand(req.body);
  brand.user = req.user;

  brand.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot save the brand'
      });
    }
    res.json(brand);

  });
};

/**
 * Update an brand
 */
exports.update = function(req, res) {
  var brand = req.brand;

  brand = _.extend(brand, req.body);

  brand.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot update the brand'
      });
    }
    res.json(brand);

  });
};

/**
 * Delete an brand
 */
exports.destroy = function(req, res) {
  var brand = req.brand;

  brand.remove(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot delete the brand'
      });
    }
    res.json(brand);

  });
};

/**
 * Show an brand
 */
exports.show = function(req, res) {
  res.json(req.brand);
};

/**
 * List of Brands
 */
exports.all = function(req, res) {
  Brand.find().sort('-created').populate('user', 'name username').exec(function(err, brands) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot list the brands'
      });
    }
    res.json(brands);

  });
};
