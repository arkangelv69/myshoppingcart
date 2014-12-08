'use strict';

var tags = require('../controllers/tags');

// Tag authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.tag.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

module.exports = function(Tags, app, auth) {

  app.route('/tags')
    .get(tags.all)
    .post(auth.requiresLogin, tags.create);
  app.route('/tags/:tagId')
    .get(auth.isMongoId, tags.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, tags.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, tags.destroy);

  // Finish with setting up the tagId param
  app.param('tagId', tags.tag);
};
