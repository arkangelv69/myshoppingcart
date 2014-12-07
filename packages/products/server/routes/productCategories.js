'use strict';

var productCategories = require('../controllers/productCategories');

// Product authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.productCategories.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

module.exports = function(ProductCategory, app, auth) {

  app.route('/products-categories')
    .get(productCategories.all)
    .post(auth.requiresLogin, productCategories.create);
  app.route('/products-categories/:categoryId')
    .get(auth.isMongoId, productCategories.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, productCategories.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, productCategories.destroy);

  // Finish with setting up the productId param
  app.param('categoryId', productCategories.productCategories);
};
