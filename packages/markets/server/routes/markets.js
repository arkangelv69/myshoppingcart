'use strict';

var markets = require('../controllers/markets');

// Market authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.market.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

module.exports = function(Markets, app, auth) {

  app.route('/markets')
    .get(markets.all)
    .post(auth.requiresLogin, markets.create);
  app.route('/markets/:marketId')
    .get(auth.isMongoId, markets.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, markets.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, markets.destroy);

  // Finish with setting up the marketId param
  app.param('marketId', markets.market);
};
