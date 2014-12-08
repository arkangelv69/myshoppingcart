'use strict';

//Setting up route
angular.module('mean.categories').config(['$stateProvider',
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
      .state('All categories', {
        url: '/categories',
        templateUrl: 'categories/views/categories/list.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('Create category', {
        url: '/categories/create',
        templateUrl: 'categories/views/categories/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit category', {
        url: '/categories/:categoryId/edit',
        templateUrl: 'categories/views/categories/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('category by id', {
        url: '/categories/:categoryId',
        templateUrl: 'categories/views/categories/view.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      //Page create category category
      .state('List cactegories category', {
        url: '/categories',
        templateUrl: 'categories/views/categories/list.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('Create cactegory category', {
        url: '/categories/create',
        templateUrl: 'categories/views/categories/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit category category', {
        url: '/categories/:categoryId/edit',
        templateUrl: 'categories/views/categories/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      ;
  }
]);
