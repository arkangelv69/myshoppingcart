'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Tag = mongoose.model('Tag'),
  _ = require('lodash');


/**
 * Find tag by id
 */
exports.tag = function(req, res, next, id) {
  Tag.load(id, function(err, tag) {
    if (err) return next(err);
    if (!tag) return next(new Error('Failed to load tag ' + id));
    req.tag = tag;
    next();
  });
};

/**
 * Create an tag
 */
exports.create = function(req, res) {
  var tag = new Tag(req.body);
  tag.user = req.user;

  tag.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot save the tag'
      });
    }
    res.json(tag);

  });
};

/**
 * Update an tag
 */
exports.update = function(req, res) {
  var tag = req.tag;

  tag = _.extend(tag, req.body);

  tag.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot update the tag'
      });
    }
    res.json(tag);

  });
};

/**
 * Delete an tag
 */
exports.destroy = function(req, res) {
  var tag = req.tag;

  tag.remove(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot delete the tag'
      });
    }
    res.json(tag);

  });
};

/**
 * Show an tag
 */
exports.show = function(req, res) {
  res.json(req.tag);
};

/**
 * List of Tags
 */
exports.all = function(req, res) {
  Tag.find().sort('-created').populate('user', 'name username').exec(function(err, tags) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot list the tags'
      });
    }
    res.json(tags);

  });
};
