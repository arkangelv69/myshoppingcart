/* jshint -W079 */ 
/* Related to https://github.com/linnovate/mean/issues/898 */
'use strict';

/**
 * Module dependencies.
 */
var expect = require('expect.js'),
	mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Category = mongoose.model('Category');

/**
 * Globals
 */
var user;
var category;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model Category:', function() {
    beforeEach(function(done) {
      user = new User({
        name: 'Full name',
        email: 'test@test.com',
        username: 'user',
        password: 'password'
      });

      user.save(function() {
        category = new Category({
          title: 'Category Title',
          content: 'Category Content',
          user: user
        });

        done();
      });
    });

    describe('Method Save', function() {
      it('should be able to save without problems', function(done) {
        return category.save(function(err) {
          expect(err).to.be(null);
          expect(category.title).to.equal('Category Title');
          expect(category.content).to.equal('Category Content');
          expect(category.user.length).to.not.equal(0);
          expect(category.created.length).to.not.equal(0);
          done();
        });
      });

      it('should be able to show an error when try to save without title', function(done) {
        category.title = '';

        return category.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

      it('should be able to show an error when try to save without content', function(done) {
        category.content = '';

        return category.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

      it('should be able to show an error when try to save without user', function(done) {
        category.user = {};

        return category.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

    });

    afterEach(function(done) {
      category.remove(function () {
        user.remove(done);
      });
    });
  });
});
