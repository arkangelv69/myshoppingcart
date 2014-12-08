/* jshint -W079 */ 
/* Related to https://github.com/linnovate/mean/issues/898 */
'use strict';

/**
 * Module dependencies.
 */
var expect = require('expect.js'),
	mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Ticket = mongoose.model('Ticket');

/**
 * Globals
 */
var user;
var ticket;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model Ticket:', function() {
    beforeEach(function(done) {
      user = new User({
        name: 'Full name',
        email: 'test@test.com',
        username: 'user',
        password: 'password'
      });

      user.save(function() {
        ticket = new Ticket({
          title: 'Ticket Title',
          content: 'Ticket Content',
          user: user
        });

        done();
      });
    });

    describe('Method Save', function() {
      it('should be able to save without problems', function(done) {
        return ticket.save(function(err) {
          expect(err).to.be(null);
          expect(ticket.title).to.equal('Ticket Title');
          expect(ticket.content).to.equal('Ticket Content');
          expect(ticket.user.length).to.not.equal(0);
          expect(ticket.created.length).to.not.equal(0);
          done();
        });
      });

      it('should be able to show an error when try to save without title', function(done) {
        ticket.title = '';

        return ticket.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

      it('should be able to show an error when try to save without content', function(done) {
        ticket.content = '';

        return ticket.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

      it('should be able to show an error when try to save without user', function(done) {
        ticket.user = {};

        return ticket.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

    });

    afterEach(function(done) {
      ticket.remove(function () {
        user.remove(done);
      });
    });
  });
});
