'use strict';

//Tags service used for tags REST endpoint
angular.module('mean.tags').factory('Tags', ['$resource',
  function($resource) {
    return $resource('tags/:tagId', {
      tagId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
