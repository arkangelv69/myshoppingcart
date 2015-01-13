'use strict';

//Brands service used for brands REST endpoint
angular.module('mean.brands').factory('Brands', ['$resource',
  function($resource) {
    return $resource('brands/:brandId', {
      brandId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
