'use strict';

//Setting up route
angular.module('mean.products').config(['$stateProvider',
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
      .state('All products', {
        url: '/products',
        templateUrl: 'products/views/products/list.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('Create product', {
        url: '/products/create',
        templateUrl: 'products/views/products/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit product', {
        url: '/products/:productId/edit',
        templateUrl: 'products/views/products/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('product by id', {
        url: '/products/:productId',
        templateUrl: 'products/views/products/view.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      //Page create category product
      .state('List cactegories product', {
        url: '/products-categories',
        templateUrl: 'products/views/categories/list.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('Create cactegory product', {
        url: '/products-categories/create',
        templateUrl: 'products/views/categories/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit product category', {
        url: '/products-categories/:categoryId/edit',
        templateUrl: 'products/views/categories/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      ;
  }
]);
