'use strict';

angular.module('mean.markets').controller('MarketController', ['$scope', '$stateParams', '$location', 'Global', 'Markets',
  function($scope, $stateParams, $location, Global, Markets) {
    $scope.global = Global;

    $scope.hasAuthorization = function(market) {
      if (!market || !market.user) return false;
      return $scope.global.isAdmin || market.user._id === $scope.global.user._id;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var market = new Markets({
          title: this.title,
          content: this.content
        });
        market.$save(function(response) {
          $location.path('markets/' + response._id);
        });

        this.title = '';
        this.content = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(market) {
      if (market) {
        market.$remove(function(response) {
          for (var i in $scope.markets) {
            if ($scope.markets[i] === market) {
              $scope.markets.splice(i, 1);
            }
          }
          $location.path('markets');
        });
      } else {
        $scope.market.$remove(function(response) {
          $location.path('markets');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var market = $scope.market;
        if (!market.updated) {
          market.updated = [];
        }
        market.updated.push(new Date().getTime());

        market.$update(function() {
          $location.path('markets/' + market._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Markets.query(function(markets) {
        $scope.markets = markets;
      });
    };

    $scope.findOne = function() {
      Markets.get({
        marketId: $stateParams.marketId
      }, function(market) {
        $scope.market = market;
      });
    };
  }
]);
