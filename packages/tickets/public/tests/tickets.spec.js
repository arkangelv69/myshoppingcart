'use strict';

(function() {
  // Tickets Controller Spec
  describe('MEAN controllers', function() {
    describe('ArticlesController', function() {
      // The $resource service augments the response object with methods for updating and deleting the resource.
      // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
      // the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
      // When the toEqualData matcher compares two objects, it takes only object properties into
      // account and ignores methods.
      beforeEach(function() {
        jasmine.addMatchers({
          toEqualData: function() {
            return {
              compare: function(actual, expected) {
                return {
                  pass: angular.equals(actual, expected)
                };
              }
            };
          }
        });
      });

      beforeEach(function() {
        module('mean');
        module('mean.system');
        module('mean.tickets');
      });

      // Initialize the controller and a mock scope
      var ArticlesController,
        scope,
        $httpBackend,
        $stateParams,
        $location;

      // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
      // This allows us to inject a service but then attach it to a variable
      // with the same name as the service.
      beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

        scope = $rootScope.$new();

        ArticlesController = $controller('ArticlesController', {
          $scope: scope
        });

        $stateParams = _$stateParams_;

        $httpBackend = _$httpBackend_;

        $location = _$location_;

      }));

      it('$scope.find() should create an array with at least one ticket object ' +
        'fetched from XHR', function() {

          // test expected GET request
          $httpBackend.expectGET('tickets').respond([{
            title: 'An Ticket about MEAN',
            content: 'MEAN rocks!'
          }]);

          // run controller
          scope.find();
          $httpBackend.flush();

          // test scope value
          expect(scope.tickets).toEqualData([{
            title: 'An Ticket about MEAN',
            content: 'MEAN rocks!'
          }]);

        });

      it('$scope.findOne() should create an array with one ticket object fetched ' +
        'from XHR using a ticketId URL parameter', function() {
          // fixture URL parament
          $stateParams.ticketId = '525a8422f6d0f87f0e407a33';

          // fixture response object
          var testArticleData = function() {
            return {
              title: 'An Ticket about MEAN',
              content: 'MEAN rocks!'
            };
          };

          // test expected GET request with response object
          $httpBackend.expectGET(/tickets\/([0-9a-fA-F]{24})$/).respond(testArticleData());

          // run controller
          scope.findOne();
          $httpBackend.flush();

          // test scope value
          expect(scope.ticket).toEqualData(testArticleData());

        });

      it('$scope.create() with valid form data should send a POST request ' +
        'with the form input values and then ' +
        'locate to new object URL', function() {

          // fixture expected POST data
          var postArticleData = function() {
            return {
              title: 'An Ticket about MEAN',
              content: 'MEAN rocks!'
            };
          };

          // fixture expected response data
          var responseArticleData = function() {
            return {
              _id: '525cf20451979dea2c000001',
              title: 'An Ticket about MEAN',
              content: 'MEAN rocks!'
            };
          };

          // fixture mock form input values
          scope.title = 'An Ticket about MEAN';
          scope.content = 'MEAN rocks!';

          // test post request is sent
          $httpBackend.expectPOST('tickets', postArticleData()).respond(responseArticleData());

          // Run controller
          scope.create(true);
          $httpBackend.flush();

          // test form input(s) are reset
          expect(scope.title).toEqual('');
          expect(scope.content).toEqual('');

          // test URL location to new object
          expect($location.path()).toBe('/tickets/' + responseArticleData()._id);
        });

      it('$scope.update(true) should update a valid ticket', inject(function(Tickets) {

        // fixture rideshare
        var putArticleData = function() {
          return {
            _id: '525a8422f6d0f87f0e407a33',
            title: 'An Ticket about MEAN',
            to: 'MEAN is great!'
          };
        };

        // mock ticket object from form
        var ticket = new Tickets(putArticleData());

        // mock ticket in scope
        scope.ticket = ticket;

        // test PUT happens correctly
        $httpBackend.expectPUT(/tickets\/([0-9a-fA-F]{24})$/).respond();

        // testing the body data is out for now until an idea for testing the dynamic updated array value is figured out
        //$httpBackend.expectPUT(/tickets\/([0-9a-fA-F]{24})$/, putArticleData()).respond();
        /*
                Error: Expected PUT /tickets\/([0-9a-fA-F]{24})$/ with different data
                EXPECTED: {"_id":"525a8422f6d0f87f0e407a33","title":"An Ticket about MEAN","to":"MEAN is great!"}
                GOT:      {"_id":"525a8422f6d0f87f0e407a33","title":"An Ticket about MEAN","to":"MEAN is great!","updated":[1383534772975]}
                */

        // run controller
        scope.update(true);
        $httpBackend.flush();

        // test URL location to new object
        expect($location.path()).toBe('/tickets/' + putArticleData()._id);

      }));

      it('$scope.remove() should send a DELETE request with a valid ticketId ' +
        'and remove the ticket from the scope', inject(function(Tickets) {

          // fixture rideshare
          var ticket = new Tickets({
            _id: '525a8422f6d0f87f0e407a33'
          });

          // mock rideshares in scope
          scope.tickets = [];
          scope.tickets.push(ticket);

          // test expected rideshare DELETE request
          $httpBackend.expectDELETE(/tickets\/([0-9a-fA-F]{24})$/).respond(204);

          // run controller
          scope.remove(ticket);
          $httpBackend.flush();

          // test after successful delete URL location tickets list
          //expect($location.path()).toBe('/tickets');
          expect(scope.tickets.length).toBe(0);

        }));
    });
  });
}());
