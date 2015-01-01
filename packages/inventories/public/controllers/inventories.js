'use strict';

angular.module('mean.inventories').controller('InventoriesController', ['$scope', '$stateParams', '$location', 'Global', 'Inventories', 'Products', 
  function($scope, $stateParams, $location, Global, Inventories, Products) {
    $scope.global = Global;
    $scope.message = '';

    $scope.hasAuthorization = function(inventory) {
      if (!inventory || !inventory.user) return false;
      return $scope.global.isAdmin || inventory.user._id === $scope.global.user._id;
    };

    $scope.addItemProduct = function(event) {
      event.preventDefault();
      //event.stopImmediatePropagation();
      //event.stopPropagation();
      if($scope.inventory) {
        if(!$scope.inventory.productsInventory) {
          $scope.inventory.productsInventory = [];
        }
        $scope.inventory.productsInventory.push({product:''});
      }      
    };

    $scope.deleteItemProduct = function(index) {
      if($scope.inventory.productsInventory) {
        $scope.inventory.productsInventory.splice(index, 1);
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var inventory = {};
        if($scope.inventory.first) {
          inventory = new Inventories({
            productsInventory: $scope.inventory.productsInventory
          });
          inventory.$save(function(response) {
            $location.path('inventories');
            $scope.message = 'Inventory updated!';
          });          
        }else {
          inventory = $scope.inventory;

          if (!inventory.updated) {
            inventory.updated = [];
          }
          inventory.updated.push(new Date().getTime());

          inventory.$update(function() {
            $location.path('inventories');
            $scope.message = 'Inventory updated!';
          });

        }
      } else {
        $scope.submitted = true;
      }
    };

    $scope.showInventory = function() {
      Inventories.get(function(inventory) {
        if(!inventory) {
          inventory = {};
          inventory.first = true;
          inventory.productsInventory = [];
          inventory.productsInventory.push({product:''});
        }
        $scope.inventory = inventory;
      });
    };

    //*********************start find metadat*****************************//
    $scope.inventoryProducts = [];
    $scope.findProucts = function() {
      Products.query(function(products) {
        angular.forEach(products, function(value, key) {
          if(typeof(key) === 'number' ) {
            $scope.inventoryProducts.push(value);
          }
        });
      });
    };
  }
]);
