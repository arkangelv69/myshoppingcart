'use strict';

//Setting up route
angular.module('mean.markets').config(['$stateProvider',
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
      .state('All markets', {
        url: '/markets',
        templateUrl: 'markets/views/markets/list.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('Create market', {
        url: '/markets/create',
        templateUrl: 'markets/views/markets/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit market', {
        url: '/markets/:marketId/edit',
        templateUrl: 'markets/views/markets/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('market by id', {
        url: '/markets/:marketId',
        templateUrl: 'markets/views/markets/view.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      //Page create market market
      .state('List cactegories market', {
        url: '/markets',
        templateUrl: 'markets/views/markets/list.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('Create cactegory market', {
        url: '/markets/create',
        templateUrl: 'markets/views/markets/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit market market', {
        url: '/markets/:marketId/edit',
        templateUrl: 'markets/views/markets/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      ;
  }
]);
