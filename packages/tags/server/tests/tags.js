/* jshint -W079 */ 
/* Related to https://github.com/linnovate/mean/issues/898 */
'use strict';

/**
 * Module dependencies.
 */
var expect = require('expect.js'),
	mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Tag = mongoose.model('Tag');

/**
 * Globals
 */
var user;
var tag;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model Tag:', function() {
    beforeEach(function(done) {
      user = new User({
        name: 'Full name',
        email: 'test@test.com',
        username: 'user',
        password: 'password'
      });

      user.save(function() {
        tag = new Tag({
          title: 'Tag Title',
          content: 'Tag Content',
          user: user
        });

        done();
      });
    });

    describe('Method Save', function() {
      it('should be able to save without problems', function(done) {
        return tag.save(function(err) {
          expect(err).to.be(null);
          expect(tag.title).to.equal('Tag Title');
          expect(tag.content).to.equal('Tag Content');
          expect(tag.user.length).to.not.equal(0);
          expect(tag.created.length).to.not.equal(0);
          done();
        });
      });

      it('should be able to show an error when try to save without title', function(done) {
        tag.title = '';

        return tag.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

      it('should be able to show an error when try to save without content', function(done) {
        tag.content = '';

        return tag.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

      it('should be able to show an error when try to save without user', function(done) {
        tag.user = {};

        return tag.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

    });

    afterEach(function(done) {
      tag.remove(function () {
        user.remove(done);
      });
    });
  });
});
