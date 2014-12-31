/* jshint -W079 */ 
/* Related to https://github.com/linnovate/mean/issues/898 */
'use strict';

/**
 * Module dependencies.
 */
var expect = require('expect.js'),
	mongoose = require('mongoose'),
  User = mongoose.model('User'),
  List = mongoose.model('List');

/**
 * Globals
 */
var user;
var list;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model List:', function() {
    beforeEach(function(done) {
      user = new User({
        name: 'Full name',
        email: 'test@test.com',
        username: 'user',
        password: 'password'
      });

      user.save(function() {
        list = new List({
          title: 'List Title',
          content: 'List Content',
          user: user
        });

        done();
      });
    });

    describe('Method Save', function() {
      it('should be able to save without problems', function(done) {
        return list.save(function(err) {
          expect(err).to.be(null);
          expect(list.title).to.equal('List Title');
          expect(list.content).to.equal('List Content');
          expect(list.user.length).to.not.equal(0);
          expect(list.created.length).to.not.equal(0);
          done();
        });
      });

      it('should be able to show an error when try to save without title', function(done) {
        list.title = '';

        return list.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

      it('should be able to show an error when try to save without content', function(done) {
        list.content = '';

        return list.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

      it('should be able to show an error when try to save without user', function(done) {
        list.user = {};

        return list.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

    });

    afterEach(function(done) {
      list.remove(function () {
        user.remove(done);
      });
    });
  });
});
