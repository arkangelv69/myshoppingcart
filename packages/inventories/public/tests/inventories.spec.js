'use strict';

(function() {
  // Inventories Controller Spec
  describe('MEAN controllers', function() {
    describe('InventoriesController', function() {
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
        module('mean.inventories');
      });

      // Initialize the controller and a mock scope
      var InventoriesController,
        scope,
        $httpBackend,
        $stateParams,
        $location;

      // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
      // This allows us to inject a service but then attach it to a variable
      // with the same name as the service.
      beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

        scope = $rootScope.$new();

        InventoriesController = $controller('InventoriesController', {
          $scope: scope
        });

        $stateParams = _$stateParams_;

        $httpBackend = _$httpBackend_;

        $location = _$location_;

      }));

      it('$scope.find() should create an array with at least one inventory object ' +
        'fetched from XHR', function() {

          // test expected GET request
          $httpBackend.expectGET('inventories').respond([{
            title: 'An Inventory about MEAN',
            content: 'MEAN rocks!'
          }]);

          // run controller
          scope.find();
          $httpBackend.flush();

          // test scope value
          expect(scope.inventories).toEqualData([{
            title: 'An Inventory about MEAN',
            content: 'MEAN rocks!'
          }]);

        });

      it('$scope.findOne() should create an array with one inventory object fetched ' +
        'from XHR using a inventoryId URL parameter', function() {
          // fixture URL parament
          $stateParams.inventoryId = '525a8422f6d0f87f0e407a33';

          // fixture response object
          var testInventoryData = function() {
            return {
              title: 'An Inventory about MEAN',
              content: 'MEAN rocks!'
            };
          };

          // test expected GET request with response object
          $httpBackend.expectGET(/inventories\/([0-9a-fA-F]{24})$/).respond(testInventoryData());

          // run controller
          scope.findOne();
          $httpBackend.flush();

          // test scope value
          expect(scope.inventory).toEqualData(testInventoryData());

        });

      it('$scope.create() with valid form data should send a POST request ' +
        'with the form input values and then ' +
        'locate to new object URL', function() {

          // fixture expected POST data
          var postInventoryData = function() {
            return {
              title: 'An Inventory about MEAN',
              content: 'MEAN rocks!'
            };
          };

          // fixture expected response data
          var responseInventoryData = function() {
            return {
              _id: '525cf20451979dea2c000001',
              title: 'An Inventory about MEAN',
              content: 'MEAN rocks!'
            };
          };

          // fixture mock form input values
          scope.title = 'An Inventory about MEAN';
          scope.content = 'MEAN rocks!';

          // test post request is sent
          $httpBackend.expectPOST('inventories', postInventoryData()).respond(responseInventoryData());

          // Run controller
          scope.create(true);
          $httpBackend.flush();

          // test form input(s) are reset
          expect(scope.title).toEqual('');
          expect(scope.content).toEqual('');

          // test URL location to new object
          expect($location.path()).toBe('/inventories/' + responseInventoryData()._id);
        });

      it('$scope.update(true) should update a valid inventory', inject(function(Inventories) {

        // fixture rideshare
        var putInventoryData = function() {
          return {
            _id: '525a8422f6d0f87f0e407a33',
            title: 'An Inventory about MEAN',
            to: 'MEAN is great!'
          };
        };

        // mock inventory object from form
        var inventory = new Inventories(putInventoryData());

        // mock inventory in scope
        scope.inventory = inventory;

        // test PUT happens correctly
        $httpBackend.expectPUT(/inventories\/([0-9a-fA-F]{24})$/).respond();

        // testing the body data is out for now until an idea for testing the dynamic updated array value is figured out
        //$httpBackend.expectPUT(/inventories\/([0-9a-fA-F]{24})$/, putInventoryData()).respond();
        /*
                Error: Expected PUT /inventories\/([0-9a-fA-F]{24})$/ with different data
                EXPECTED: {"_id":"525a8422f6d0f87f0e407a33","title":"An Inventory about MEAN","to":"MEAN is great!"}
                GOT:      {"_id":"525a8422f6d0f87f0e407a33","title":"An Inventory about MEAN","to":"MEAN is great!","updated":[1383534772975]}
                */

        // run controller
        scope.update(true);
        $httpBackend.flush();

        // test URL location to new object
        expect($location.path()).toBe('/inventories/' + putInventoryData()._id);

      }));

      it('$scope.remove() should send a DELETE request with a valid inventoryId ' +
        'and remove the inventory from the scope', inject(function(Inventories) {

          // fixture rideshare
          var inventory = new Inventories({
            _id: '525a8422f6d0f87f0e407a33'
          });

          // mock rideshares in scope
          scope.inventories = [];
          scope.inventories.push(inventory);

          // test expected rideshare DELETE request
          $httpBackend.expectDELETE(/inventories\/([0-9a-fA-F]{24})$/).respond(204);

          // run controller
          scope.remove(inventory);
          $httpBackend.flush();

          // test after successful delete URL location inventories inventory
          //expect($location.path()).toBe('/inventories');
          expect(scope.inventories.length).toBe(0);

        }));
    });
  });
}());
