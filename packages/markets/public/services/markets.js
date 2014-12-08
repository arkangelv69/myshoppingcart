'use strict';

//Markets service used for markets REST endpoint
angular.module('mean.markets').factory('Markets', ['$resource',
  function($resource) {
    return $resource('markets/:marketId', {
      marketId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
