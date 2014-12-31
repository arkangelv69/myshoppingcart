'use strict';

angular.module('mean.lists').controller('ListsController', ['$scope', '$stateParams', '$location', 'Global', 'Lists', 'Products', 
  function($scope, $stateParams, $location, Global, Lists, Products) {
    $scope.global = Global;

    $scope.hasAuthorization = function(list) {
      if (!list || !list.user) return false;
      return $scope.global.isAdmin || list.user._id === $scope.global.user._id;
    };

    $scope.addProductToTicket = function(event) {
      event.preventDefault();
      //event.stopImmediatePropagation();
      //event.stopPropagation();
      if($scope.list) {
        if(!$scope.list.productsList) {
          $scope.list.productsList = [];
        }
        $scope.list.productsList.push({product:''});
      }      
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var list = {};
        if($scope.list.first) {
          list = new Lists({
            productsList: $scope.list.productsList
          });
          list.$save(function(response) {
            $location.path('lists');
          });          
        }else {
          list = $scope.list;

          if (!list.updated) {
            list.updated = [];
          }
          list.updated.push(new Date().getTime());

          list.$update(function() {
            $location.path('lists');
          });

        }
      } else {
        $scope.submitted = true;
      }
    };

    $scope.showList = function() {
      Lists.get(function(list) {
        if(!list) {
          list = {};
          list.first = true;
          list.productsList = [];
          list.productsList.push({product:''});
        }
        $scope.list = list;
      });
    };

    //*********************start find metadat*****************************//
    $scope.listProducts = [];
    $scope.findProucts = function() {
      Products.query(function(products) {
        angular.forEach(products, function(value, key) {
          if(typeof(key) === 'number' ) {
            $scope.listProducts.push(value);
          }
        });
      });
    };
  }
]);
