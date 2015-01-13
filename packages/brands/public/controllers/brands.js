'use strict';

angular.module('mean.brands').controller('BrandController', ['$scope', '$stateParams', '$location', 'Global', 'Brands',
  function($scope, $stateParams, $location, Global, Brands) {
    $scope.global = Global;

    $scope.hasAuthorization = function(brand) {
      if (!brand || !brand.user) return false;
      return $scope.global.isAdmin || brand.user._id === $scope.global.user._id;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var brand = new Brands({
          title: this.title,
          content: this.content
        });
        brand.$save(function(response) {
          $location.path('brands/' + response._id);
        });

        this.title = '';
        this.content = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(brand) {
      if (brand) {
        brand.$remove(function(response) {
          for (var i in $scope.brands) {
            if ($scope.brands[i] === brand) {
              $scope.brands.splice(i, 1);
            }
          }
          $location.path('brands');
        });
      } else {
        $scope.brand.$remove(function(response) {
          $location.path('brands');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var brand = $scope.brand;
        if (!brand.updated) {
          brand.updated = [];
        }
        brand.updated.push(new Date().getTime());

        brand.$update(function() {
          $location.path('brands/' + brand._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Brands.query(function(brands) {
        $scope.brands = brands;
      });
    };

    $scope.findOne = function() {
      Brands.get({
        brandId: $stateParams.brandId
      }, function(brand) {
        $scope.brand = brand;
      });
    };
  }
]);
