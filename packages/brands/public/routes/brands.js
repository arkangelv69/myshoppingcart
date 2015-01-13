'use strict';

//Setting up route
angular.module('mean.brands').config(['$stateProvider',
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
      .state('All brands', {
        url: '/brands',
        templateUrl: 'brands/views/brands/list.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('Create brand', {
        url: '/brands/create',
        templateUrl: 'brands/views/brands/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit brand', {
        url: '/brands/:brandId/edit',
        templateUrl: 'brands/views/brands/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('brand by id', {
        url: '/brands/:brandId',
        templateUrl: 'brands/views/brands/view.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      //Page create brand brand
      .state('List cactegories brand', {
        url: '/brands',
        templateUrl: 'brands/views/brands/list.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('Create cactegory brand', {
        url: '/brands/create',
        templateUrl: 'brands/views/brands/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit brand brand', {
        url: '/brands/:brandId/edit',
        templateUrl: 'brands/views/brands/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      ;
  }
]);
