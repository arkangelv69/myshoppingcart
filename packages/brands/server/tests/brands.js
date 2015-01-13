/* jshint -W079 */ 
/* Related to https://github.com/linnovate/mean/issues/898 */
'use strict';

/**
 * Module dependencies.
 */
var expect = require('expect.js'),
	mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Brand = mongoose.model('Brand');

/**
 * Globals
 */
var user;
var brand;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model Brand:', function() {
    beforeEach(function(done) {
      user = new User({
        name: 'Full name',
        email: 'test@test.com',
        username: 'user',
        password: 'password'
      });

      user.save(function() {
        brand = new Brand({
          title: 'Brand Title',
          content: 'Brand Content',
          user: user
        });

        done();
      });
    });

    describe('Method Save', function() {
      it('should be able to save without problems', function(done) {
        return brand.save(function(err) {
          expect(err).to.be(null);
          expect(brand.title).to.equal('Brand Title');
          expect(brand.content).to.equal('Brand Content');
          expect(brand.user.length).to.not.equal(0);
          expect(brand.created.length).to.not.equal(0);
          done();
        });
      });

      it('should be able to show an error when try to save without title', function(done) {
        brand.title = '';

        return brand.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

      it('should be able to show an error when try to save without content', function(done) {
        brand.content = '';

        return brand.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

      it('should be able to show an error when try to save without user', function(done) {
        brand.user = {};

        return brand.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

    });

    afterEach(function(done) {
      brand.remove(function () {
        user.remove(done);
      });
    });
  });
});
