'use strict';

//Inventories service used for inventories REST endpoint
angular.module('mean.inventories').factory('Inventories', ['$resource',
  function($resource) {
    return $resource('inventories/:inventoryId', {
      inventoryId: '@_id'
    }, {
      update: {method: 'PUT'},
      query: { method: 'GET' }
    });
  }
]);
