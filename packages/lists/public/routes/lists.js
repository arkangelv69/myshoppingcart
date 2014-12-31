'use strict';

//Setting up route
angular.module('mean.lists').config(['$stateProvider',
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
      .state('All lists', {
        url: '/lists',
        templateUrl: 'lists/views/list.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('Create list', {
        url: '/lists/create',
        templateUrl: 'lists/views/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit list', {
        url: '/lists/:listId/edit',
        templateUrl: 'lists/views/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('list by id', {
        url: '/lists/:listId',
        templateUrl: 'lists/views/view.html',
        resolve: {
          loggedin: checkLoggedin
        }
      });
  }
]);
