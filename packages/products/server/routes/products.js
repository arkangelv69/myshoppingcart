'use strict';

var products = require('../controllers/products');

// Product authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.product.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

module.exports = function(Products, app, auth) {

  app.route('/products')
    .get(products.all)
    .post(auth.requiresLogin, products.create);
  app.route('/products/:productId')
    .get(auth.isMongoId, products.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, products.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, products.destroy);

  // Finish with setting up the productId param
  app.param('productId', products.product);
};
