'use strict';

angular.module('mean.tickets').controller('TicketController', ['$scope', '$stateParams', '$location', 'Global', 'Tickets', 'Products' , 'Markets' ,
  function($scope, $stateParams, $location, Global, Tickets, Products, Markets) {
    $scope.global = Global;

    if(!$scope.itemsTicket) {
      $scope.itemsTicket = [];
      $scope.itemsTicket.push({
        product : '',
        price : '',
        quantity : '',
        duration : ''
      });
    }

    $scope.addProductToTicket = function(event) {
      event.preventDefault();
      //event.stopImmediatePropagation();
      //event.stopPropagation();
      if(!$scope.itemsTicket) {
        $scope.itemsTicket = [];
      }
      $scope.itemsTicket.push({
        product : '',
        price : '',
        quantity : '',
        duration : ''
      });
      if($scope.ticket) {
        if(!$scope.ticket.itemsTicket) {
          $scope.itemsTicket = [];
        }
        $scope.ticket.itemsTicket.push({
          product : '',
          price : '',
          quantity : '',
          duration : ''
        });
      }      
    };

    $scope.deleteProductOfTicket = function(index,event) {
      event.preventDefault();
      if($scope.ticket.itemsTicket) {
        $scope.ticket.itemsTicket.splice(index, 1);
      }
    };

    $scope.hasAuthorization = function(ticket) {
      if (!ticket || !ticket.user) return false;
      return $scope.global.isAdmin || ticket.user._id === $scope.global.user._id;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        for(var e = 0; e < this.itemsTicket.length; e=e+1) {
          if(!this.itemsTicket[e]) {
            this.itemsTicket.splice(e, 1);
          }
        }
        var ticket = new Tickets({
          title: this.title,
          itemsTicket: this.itemsTicket
        });
        ticket.$save(function(response) {
          $location.path('tickets/' + response._id);
        });

        this.title = '';
        this.itemsTicket = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(ticket) {
      if (ticket) {
        ticket.$remove(function(response) {
          for (var i in $scope.tickets) {
            if ($scope.tickets[i] === ticket) {
              $scope.tickets.splice(i, 1);
            }
          }
          $location.path('tickets');
        });
      } else {
        $scope.ticket.$remove(function(response) {
          $location.path('tickets');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var ticket = $scope.ticket;

        for(var e = 0; e < ticket.itemsTicket.length; e=e+1) {
          if(!ticket.itemsTicket[e]) {
            ticket.itemsTicket.splice(e, 1);
          }
        }

        if (!ticket.updated) {
          ticket.updated = [];
        }
        ticket.updated.push(new Date().getTime());

        ticket.$update(function() {
          $location.path('tickets/' + ticket._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Tickets.query(function(tickets) {
        $scope.tickets = tickets;
      });
    };

    $scope.findOne = function() {
      Tickets.get({
        ticketId: $stateParams.ticketId
      }, function(ticket) {
        $scope.ticket = ticket;
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
    $scope.listMarkets = [];
    $scope.findMarkets = function() {
      Markets.query(function(markets) {
        angular.forEach(markets, function(value, key) {
          if(typeof(key) === 'number' ) {
            $scope.listMarkets.push(value);
          }
        });
      });
    };
    //*********
  }
]);