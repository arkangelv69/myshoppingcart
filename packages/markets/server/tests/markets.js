/* jshint -W079 */ 
/* Related to https://github.com/linnovate/mean/issues/898 */
'use strict';

/**
 * Module dependencies.
 */
var expect = require('expect.js'),
	mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Market = mongoose.model('Market');

/**
 * Globals
 */
var user;
var market;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model Market:', function() {
    beforeEach(function(done) {
      user = new User({
        name: 'Full name',
        email: 'test@test.com',
        username: 'user',
        password: 'password'
      });

      user.save(function() {
        market = new Market({
          title: 'Market Title',
          content: 'Market Content',
          user: user
        });

        done();
      });
    });

    describe('Method Save', function() {
      it('should be able to save without problems', function(done) {
        return market.save(function(err) {
          expect(err).to.be(null);
          expect(market.title).to.equal('Market Title');
          expect(market.content).to.equal('Market Content');
          expect(market.user.length).to.not.equal(0);
          expect(market.created.length).to.not.equal(0);
          done();
        });
      });

      it('should be able to show an error when try to save without title', function(done) {
        market.title = '';

        return market.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

      it('should be able to show an error when try to save without content', function(done) {
        market.content = '';

        return market.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

      it('should be able to show an error when try to save without user', function(done) {
        market.user = {};

        return market.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

    });

    afterEach(function(done) {
      market.remove(function () {
        user.remove(done);
      });
    });
  });
});
