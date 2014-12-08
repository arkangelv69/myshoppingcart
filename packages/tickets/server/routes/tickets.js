'use strict';

var tickets = require('../controllers/tickets');

// Ticket authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.ticket.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

module.exports = function(Tickets, app, auth) {

  app.route('/tickets')
    .get(tickets.all)
    .post(auth.requiresLogin, tickets.create);
  app.route('/tickets/:ticketId')
    .get(auth.isMongoId, tickets.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, tickets.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, tickets.destroy);

  // Finish with setting up the ticketId param
  app.param('ticketId', tickets.ticket);
};
