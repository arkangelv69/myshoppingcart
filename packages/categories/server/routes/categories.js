'use strict';

var categories = require('../controllers/categories');

// Category authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.category.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

module.exports = function(Categories, app, auth) {

  app.route('/categories')
    .get(categories.all)
    .post(auth.requiresLogin, categories.create);
  app.route('/categories/:categoryId')
    .get(auth.isMongoId, categories.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, categories.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, categories.destroy);

  // Finish with setting up the categoryId param
  app.param('categoryId', categories.category);
};
