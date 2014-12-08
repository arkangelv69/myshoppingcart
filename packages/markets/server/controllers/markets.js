'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Market = mongoose.model('Market'),
  _ = require('lodash');


/**
 * Find market by id
 */
exports.market = function(req, res, next, id) {
  Market.load(id, function(err, market) {
    if (err) return next(err);
    if (!market) return next(new Error('Failed to load market ' + id));
    req.market = market;
    next();
  });
};

/**
 * Create an market
 */
exports.create = function(req, res) {
  var market = new Market(req.body);
  market.user = req.user;

  market.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot save the market'
      });
    }
    res.json(market);

  });
};

/**
 * Update an market
 */
exports.update = function(req, res) {
  var market = req.market;

  market = _.extend(market, req.body);

  market.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot update the market'
      });
    }
    res.json(market);

  });
};

/**
 * Delete an market
 */
exports.destroy = function(req, res) {
  var market = req.market;

  market.remove(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot delete the market'
      });
    }
    res.json(market);

  });
};

/**
 * Show an market
 */
exports.show = function(req, res) {
  res.json(req.market);
};

/**
 * List of Markets
 */
exports.all = function(req, res) {
  Market.find().sort('-created').populate('user', 'name username').exec(function(err, markets) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot list the markets'
      });
    }
    res.json(markets);

  });
};
