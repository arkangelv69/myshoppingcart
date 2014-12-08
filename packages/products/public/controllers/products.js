'use strict';

angular.module('mean.products').controller('ProductController', ['$scope', '$stateParams', '$location', 'Global', 'Products', 'Categories', 'Tags',
  function($scope, $stateParams, $location, Global, Products, Categories, Tags) {
    $scope.global = Global;

    $scope.hasAuthorization = function(product) {
      if (!product || !product.user) return false;
      return $scope.global.isAdmin || product.user._id === $scope.global.user._id;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var product = new Products({
          title: this.title,
          content: this.content,
          images: this.images,
          categories: this.categories
        });
        product.$save(function(response) {
          $location.path('products/' + response._id);
        });

        this.title = '';
        this.content = '';
        this.images = [];
        this.categories = [];
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(product) {
      if (product) {
        product.$remove(function(response) {
          for (var i in $scope.products) {
            if ($scope.products[i] === product) {
              $scope.products.splice(i, 1);
            }
          }
          $location.path('products');
        });
      } else {
        $scope.product.$remove(function(response) {
          $location.path('products');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var product = $scope.product;
        if (!product.updated) {
          product.updated = [];
        }
        product.updated.push(new Date().getTime());

        product.$update(function() {
          $location.path('products/' + product._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Products.query(function(products) {
        $scope.products = products;
      });
    };

    $scope.findOne = function() {
      Products.get({
        productId: $stateParams.productId
      }, function(product) {
        $scope.product = product;
      });
    };

    //*********************start find metadat*****************************//
    $scope.listCategories = [];
    $scope.findCategory = function() {
      Categories.query(function(categories) {
        angular.forEach(categories, function(value, key) {
          if(typeof(key) === 'number' ) {
            $scope.listCategories.push(value);
          }
        });
      });
    };

    $scope.listTags = [];
    $scope.findTags = function() {
      Tags.query(function(tags) {
        angular.forEach(tags, function(value, key) {
          if(typeof(key) === 'number' ) {
            $scope.listTags.push(value);
          }
        });
      });
    };
    //*********************end find metadat*****************************//
  }
]);
