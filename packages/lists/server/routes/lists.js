'use strict';

var lists = require('../controllers/lists');

// List authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.list.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

module.exports = function(Lists, app, auth) {

  app.route('/lists')
    .get(lists.list, lists.show)
    .post(auth.requiresLogin, lists.create);
  app.route('/lists/:listId')
    .get(auth.isMongoId, lists.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, lists.update);

  // Finish with setting up the listId param
  app.param('listId', lists.list);
};
