'use strict';

var brands = require('../controllers/brands');

// Brand authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.brand.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

module.exports = function(Brands, app, auth) {

  app.route('/brands')
    .get(brands.all)
    .post(auth.requiresLogin, brands.create);
  app.route('/brands/:brandId')
    .get(auth.isMongoId, brands.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, brands.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, brands.destroy);

  // Finish with setting up the brandId param
  app.param('brandId', brands.brand);
};
