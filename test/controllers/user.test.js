var request = require('supertest')
  , serviceLocator = require('service-locator').createServiceLocator()
  , should = require('should')
  , _ = require('lodash')
  , properties = {
    allowedDomains: []
  }
  , logger =
    { info: function () {}
    , warn: function () {}
    , error: function () {}
    , debug: function () {}
    }
  , userFixtures = require('../models/user/fixtures')

  , userService =
  {
    ensureAuthorized: function (req, res, next) {
      return next()
    }
  }

  , express = require('express')
  , app = express()
  , userController = require('../../controllers/user')

describe('User Controller', function () {
  before(function (done) {
    serviceLocator
      .register('properties', properties)
      .register('logger', logger)
      .register('userService', userService)

    userController.createRoutes(serviceLocator, app)
    done()
  })

  describe('GET /api/users - Getting all the user', function (done) {
    var apiUrl = '/api/users'

    it('should return a 200', function (done) {
      var result = [ userFixtures.validUser ]
      serviceLocator.userService.findAll = function (callback) {
        return callback(undefined, result)
      }

      request(app)
        .get(apiUrl)
        .expect(200, done)
    })

    it('should return an array of users', function (done) {
      var result = [ userFixtures.validUser ]
      serviceLocator.userService.findAll = function (callback) {
        return callback(undefined, result)
      }

      request(app)
        .get(apiUrl)
        .expect(200)
        .end(function (error, res) {
          res.body.length.should.equal(1)

          done(error)
        })
    })

    it('should return a 500 if findAll function errors', function (done) {
      serviceLocator.userService.findAll = function (callback) {
        return callback('error')
      }

      request(app)
        .get(apiUrl)
        .expect(500, done)
    })

    it('should not return secret fields', function (done) {
      var result = [ userFixtures.validUser ]
      serviceLocator.userService.findAll = function (callback) {
        return callback(undefined, result)
      }

      request(app)
        .get(apiUrl)
        .expect(200)
        .end(function (error, res) {
          res.body[0].should.not.have.property('password')

          done(error)
        })
    })

    it('should return public fields', function (done) {
      var result = [ userFixtures.validUser ]
      serviceLocator.userService.findAll = function (callback) {
        return callback(undefined, result)
      }

      request(app)
        .get(apiUrl)
        .expect(200)
        .end(function (error, res) {
          res.body[0].should.not.have.property('password')
          res.body[0].should.have.property('username')
          res.body[0].should.have.property('email_address')

          done(error)
        })

    })
  })

  describe('GET /api/users/:id - Get single user data', function (done) {
    var apiUrl = '/api/users/1234'

    it('should return a 200', function (done) {
      var result = userFixtures.validUser
      serviceLocator.userService.findById = function (id, callback) {
        return callback(undefined, result)
      }

      request(app)
        .get(apiUrl)
        .expect(200, done)
    })

    it('should return user', function (done) {
      var result = userFixtures.validUser
      serviceLocator.userService.findById = function (id, callback) {
        return callback(undefined, result)
      }

      request(app)
        .get(apiUrl)
        .expect(200)
        .end(function (error, res) {
          res.body.email_address.should.equal('maxim@synthmedia.co.uk')
          res.body.username.should.equal('maxim')

          done(error)
        })
    })

    it('should return a 500 if findAll function errors', function (done) {
      serviceLocator.userService.findById = function (id, callback) {
        return callback('error')
      }

      request(app)
        .get(apiUrl)
        .expect(500, done)
    })

    it('should not return secret fields', function (done) {
      var result = [ userFixtures.validUser ]
      serviceLocator.userService.findById = function (id, callback) {
        return callback(undefined, result)
      }

      request(app)
        .get(apiUrl)
        .expect(200)
        .end(function (error, res) {
          res.body.should.not.have.property('password')

          done(error)
        })
    })

    it('should return public fields', function (done) {
      var result = [ userFixtures.validUser ]
      serviceLocator.userService.findById = function (id, callback) {
        return callback(undefined, result)
      }

      request(app)
        .get(apiUrl)
        .expect(200)
        .end(function (error, res) {
          res.body.should.not.have.property('password')
          res.body.should.have.property('username')
          res.body.should.have.property('email_address')

          done(error)
        })

    })
  })
})