/* jshint -W079 */ 
/* Related to https://github.com/linnovate/mean/issues/898 */
'use strict';

/**
 * Module dependencies.
 */
var expect = require('expect.js'),
	mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Product = mongoose.model('Product');

/**
 * Globals
 */
var user;
var product;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model Product:', function() {
    beforeEach(function(done) {
      user = new User({
        name: 'Full name',
        email: 'test@test.com',
        username: 'user',
        password: 'password'
      });

      user.save(function() {
        product = new Product({
          name: 'Product Name',
          description: 'Product Description',
          user: user
        });

        done();
      });
    });

    describe('Method Save', function() {
      it('should be able to save without problems', function(done) {
        return product.save(function(err) {
          expect(err).to.be(null);
          expect(product.name).to.equal('Product Name');
          expect(product.description).to.equal('Product Description');
          expect(product.user.length).to.not.equal(0);
          expect(product.created.length).to.not.equal(0);
          done();
        });
      });

      it('should be able to show an error when try to save without name', function(done) {
        product.name = '';

        return product.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

      it('should be able to show an error when try to save without description', function(done) {
        product.description = '';

        return product.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

      it('should be able to show an error when try to save without user', function(done) {
        product.user = {};

        return product.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

    });

    afterEach(function(done) {
      product.remove(function () {
        user.remove(done);
      });
    });
  });
});
