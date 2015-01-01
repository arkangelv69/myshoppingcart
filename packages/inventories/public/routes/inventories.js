'use strict';

//Setting up route
angular.module('mean.inventories').config(['$stateProvider',
  function($stateProvider) {
    // Check if the user is connected
    var checkLoggedin = function($q, $timeout, $http, $location) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0') $timeout(deferred.resolve);

        // Not Authenticated
        else {
          $timeout(deferred.reject);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };

    // states for my app
    $stateProvider
      .state('All inventories', {
        url: '/inventories',
        templateUrl: 'inventories/views/inventory.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('Create inventory', {
        url: '/inventories/create',
        templateUrl: 'inventories/views/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit inventory', {
        url: '/inventories/:inventoryId/edit',
        templateUrl: 'inventories/views/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('inventory by id', {
        url: '/inventories/:inventoryId',
        templateUrl: 'inventories/views/view.html',
        resolve: {
          loggedin: checkLoggedin
        }
      });
  }
]);
