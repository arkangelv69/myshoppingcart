'use strict';

angular.module('mean.tickets').controller('TicketController', ['$scope', '$stateParams', '$location', 'Global', 'Tickets', 'Products' ,
  function($scope, $stateParams, $location, Global, Tickets, Products) {
    $scope.global = Global;

    if(!$scope.itemsTicket) {
      $scope.itemsTicket = [];
      $scope.itemsTicket.push({
        product : '',
        price : '',
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
        duration : ''
      });
      if($scope.ticket) {
        if(!$scope.ticket.itemsTicket) {
          $scope.itemsTicket = [];
        }
        $scope.ticket.itemsTicket.push({
          product : '',
          price : '',
          duration : ''
        });
      }      
    };

    $scope.hasAuthorization = function(ticket) {
      if (!ticket || !ticket.user) return false;
      return $scope.global.isAdmin || ticket.user._id === $scope.global.user._id;
    };

    $scope.create = function(isValid) {
      if (isValid) {
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
    //*********
  }
]);