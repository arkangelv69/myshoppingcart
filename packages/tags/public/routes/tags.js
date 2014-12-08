'use strict';

//Setting up route
angular.module('mean.tags').config(['$stateProvider',
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
      .state('All tags', {
        url: '/tags',
        templateUrl: 'tags/views/tags/list.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('Create tag', {
        url: '/tags/create',
        templateUrl: 'tags/views/tags/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit tag', {
        url: '/tags/:tagId/edit',
        templateUrl: 'tags/views/tags/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('tag by id', {
        url: '/tags/:tagId',
        templateUrl: 'tags/views/tags/view.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      //Page create tag tag
      .state('List cactegories tag', {
        url: '/tags',
        templateUrl: 'tags/views/tags/list.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('Create cactegory tag', {
        url: '/tags/create',
        templateUrl: 'tags/views/tags/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit tag tag', {
        url: '/tags/:tagId/edit',
        templateUrl: 'tags/views/tags/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      ;
  }
]);
