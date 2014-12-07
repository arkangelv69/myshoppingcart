'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  ProductCategory = mongoose.model('ProductCategory'),
  _ = require('lodash');


/**
 * Find productCategories by id
 */
exports.productCategories = function(req, res, next, id) {
  ProductCategory.load(id, function(err, productCategories) {
    if (err) return next(err);
    if (!productCategories) return next(new Error('Failed to load productCategories ' + id));
    req.productCategories = productCategories;
    next();
  });
};

/**
 * Create an productCategories
 */
exports.create = function(req, res) {
  var productCategories = new ProductCategory(req.body);
  productCategories.user = req.user;

  productCategories.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot save the productCategories'
      });
    }
    res.json(productCategories);

  });
};

/**
 * Update an productCategories
 */
exports.update = function(req, res) {
  var productCategories = req.productCategories;

  productCategories = _.extend(productCategories, req.body);

  productCategories.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot update the productCategories'
      });
    }
    res.json(productCategories);

  });
};

/**
 * Delete an productCategories
 */
exports.destroy = function(req, res) {
  var productCategories = req.productCategories;

  productCategories.remove(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot delete the productCategories'
      });
    }
    res.json(productCategories);

  });
};

/**
 * Show an productCategories
 */
exports.show = function(req, res) {
  res.json(req.productCategories);
};

/**
 * List of ProductCategorys
 */
exports.all = function(req, res) {
  ProductCategory.find().sort('-created').populate('user', 'name username').exec(function(err, productCategoriess) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot list the productCategoriess'
      });
    }
    res.json(productCategoriess);

  });
};
