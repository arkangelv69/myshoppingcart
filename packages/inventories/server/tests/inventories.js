/* jshint -W079 */ 
/* Related to https://github.com/linnovate/mean/issues/898 */
'use strict';

/**
 * Module dependencies.
 */
var expect = require('expect.js'),
	mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Inventory = mongoose.model('Inventory');

/**
 * Globals
 */
var user;
var inventory;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model Inventory:', function() {
    beforeEach(function(done) {
      user = new User({
        name: 'Full name',
        email: 'test@test.com',
        username: 'user',
        password: 'password'
      });

      user.save(function() {
        inventory = new Inventory({
          title: 'Inventory Title',
          content: 'Inventory Content',
          user: user
        });

        done();
      });
    });

    describe('Method Save', function() {
      it('should be able to save without problems', function(done) {
        return inventory.save(function(err) {
          expect(err).to.be(null);
          expect(inventory.title).to.equal('Inventory Title');
          expect(inventory.content).to.equal('Inventory Content');
          expect(inventory.user.length).to.not.equal(0);
          expect(inventory.created.length).to.not.equal(0);
          done();
        });
      });

      it('should be able to show an error when try to save without title', function(done) {
        inventory.title = '';

        return inventory.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

      it('should be able to show an error when try to save without content', function(done) {
        inventory.content = '';

        return inventory.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

      it('should be able to show an error when try to save without user', function(done) {
        inventory.user = {};

        return inventory.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

    });

    afterEach(function(done) {
      inventory.remove(function () {
        user.remove(done);
      });
    });
  });
});
