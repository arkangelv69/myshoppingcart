'use strict';

//Tickets service used for tickets REST endpoint
angular.module('mean.tickets').factory('Tickets', ['$resource',
  function($resource) {
    return $resource('tickets/:ticketId', {
      ticketId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
