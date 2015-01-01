'use strict';

var inventories = require('../controllers/inventories');

// Inventory authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.inventory.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

module.exports = function(Inventories, app, auth) {

  app.route('/inventories')
    .get(inventories.inventory, inventories.show)
    .post(auth.requiresLogin, inventories.create);
  app.route('/inventories/:inventoryId')
    .get(auth.isMongoId, inventories.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, inventories.update);

  // Finish with setting up the inventoryId param
  app.param('inventoryId', inventories.inventory);
};
