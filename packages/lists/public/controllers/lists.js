'use strict';

angular.module('mean.lists').controller('ListsController', ['$scope', '$stateParams', '$location', 'Global', 'Lists', 'Products', 'Inventories', 'Tickets', 
  function($scope, $stateParams, $location, Global, Lists, Products, Inventories, Tickets) {
    $scope.global = Global;
    $scope.message = '';

    $scope.hasAuthorization = function(list) {
      if (!list || !list.user) return false;
      return $scope.global.isAdmin || list.user._id === $scope.global.user._id;
    };

    $scope.addItemProduct = function(event) {
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

    $scope.deleteItemProduct = function(index,event) {
      event.preventDefault();
      if($scope.list.productsList) {
        $scope.list.productsList.splice(index, 1);
      }
    };

    $scope.addItemToInventary = function(index) {
      event.preventDefault();
      //event.stopImmediatePropagation();
      //event.stopPropagation();
      Inventories.query(function(inventory) {
        var exist = false;
        if(!inventory.productsInventory) {

          var productsInventory = [];
          productsInventory.push({product:$scope.list.productsList[index].product});
          inventory = new Inventories({productsInventory:productsInventory});
          inventory.$save(function(){
              $location.path('lists');
              $scope.message = 'List updated!';
            });

        }else {
          angular.forEach(inventory.productsInventory, function(value, key) {
            if( value.product === $scope.list.productsList[index].product ) {
              exist =true;
              $scope.message = 'Product yet added to inventary!';
            }
          });
          if(!exist) {
            inventory.productsInventory.push({product:$scope.list.productsList[index].product});

            if (!inventory.updated) {
              inventory.updated = [];
            }
            inventory.updated.push(new Date().getTime());

            inventory.$update(function(){
              $location.path('lists');
              $scope.message = 'Product added to inventary!';
            });
          }
        }
      });
    };

    $scope.createTicket = function(event) {
      event.preventDefault();
      if ($scope.list.productsList && $scope.list.productsList.length) {
        var itemsTicket = $scope.list.productsList;
        var ticket = new Tickets({
          title: 'Título temporal',
          itemsTicket: itemsTicket
        });
        ticket.$save(function(response) {
          $location.path('tickets/' + response._id + '/edit');
        });        
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
            $scope.message = 'List updated!';
          });          
        }else {
          list = $scope.list;

          if (!list.updated) {
            list.updated = [];
          }
          list.updated.push(new Date().getTime());

          list.$update(function() {
            $location.path('lists');
            $scope.message = 'List updated!';
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
