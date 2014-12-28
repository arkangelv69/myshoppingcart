'use strict';

//Setting up route
angular.module('mean.tickets').config(['$stateProvider',
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
      .state('All tickets', {
        url: '/tickets',
        templateUrl: 'tickets/views/tickets/list.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('Create ticket', {
        url: '/tickets/create',
        templateUrl: 'tickets/views/tickets/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit ticket', {
        url: '/tickets/:ticketId/edit',
        templateUrl: 'tickets/views/tickets/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('ticket by id', {
        url: '/tickets/:ticketId',
        templateUrl: 'tickets/views/tickets/view.html',
        resolve: {
          loggedin: checkLoggedin
        }
      });
  }
]);
