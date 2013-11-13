var request = require('supertest')
  , serviceLocator = require('service-locator').createServiceLocator()
  , should = require('should')
  , _ = require('lodash')
  , properties = {
    allowedDomains: []
  }
  , dayFixtures = require('../models/day/fixtures')
  , logger =
    { info: function () {}
    , warn: function () {}
    , error: function () {}
    , debug: function () {}
    }

  , userService =
  {
    ensureAuthorized: function (req, res, next) {
      return next()
    }
  }

  , express = require('express')
  , app = express()
  , daysController = require('../../controllers/days')

app.use(express.bodyParser())

describe('Day controller', function () {

  before( function (done) {
    serviceLocator
      .register('properties', properties)
      .register('logger', logger)
      .register('dayService', {})
      .register('userService', userService)

    daysController.createRoutes(serviceLocator, app)
    done()
  })


  describe('GET /api/days - Getting all days', function () {
    var apiUrl = '/api/days'

    it('should return a 200', function (done) {
      serviceLocator.dayService.findAll = function (callback) {
        return callback(undefined, [ dayFixtures.validDay ])
      }

      request(app)
        .get(apiUrl)
        .expect(200, done)

    })

    it('should return an array of dates', function (done) {
      var result = [ dayFixtures.validDay ]
      serviceLocator.dayService.findAll = function (callback) {
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
      serviceLocator.dayService.findAll = function (callback) {
        return callback('error')
      }

      request(app)
        .get(apiUrl)
        .expect(500, done)

    })

  })






  describe('GET /api/days/:permalink - Getting day by permalink', function () {
    var apiUrl = '/api/days'

    it('should return a 200', function (done) {
      serviceLocator.dayService.findByPermalink = function ( permalink, callback) {
        return callback(undefined, dayFixtures.validDay)
      }

      request(app)
        .get(apiUrl + '/asdf')
        .expect(200, done)

    })


    it('should return a date if permalink exists', function (done) {
      serviceLocator.dayService.findByPermalink = function ( permalink, callback) {
        return callback(undefined, dayFixtures.validDay)
      }

      request(app)
        .get(apiUrl + '/asdf')
        .expect(200)
        .end(function (error, res) {
          res.body.day.title.should.equal(dayFixtures.validDay.title)
          done(error)
        })
    })

    it('should return a 404 if no permalink exists', function (done) {
      serviceLocator.dayService.findByPermalink = function ( permalink, callback) {
        return callback(undefined, undefined)
      }

      request(app)
        .get(apiUrl+'/asdf')
        .expect(404, done)

    })

    it('should return a 500 if findByPermalink errors', function (done) {
      serviceLocator.dayService.findByPermalink = function ( permalink, callback) {
        return callback('error')
      }

      request(app)
        .get(apiUrl + '/asdf')
        .expect(500, done)

    })
  })







  describe('POST /api/days - Posting a days', function () {
    var apiUrl = '/api/days'

    it('should return a 200', function (done) {

      serviceLocator.dayService.create = function ( body, callback) {
        return callback(undefined,  dayFixtures.validDay )
      }

      request(app)
        .post(apiUrl)
        .set('Content-Type', 'application/json')
        .send(dayFixtures.validDay )
        .expect(200, done)

    })

    it('should return a date', function (done) {

      serviceLocator.dayService.create = function ( body ,callback) {
        return callback(undefined, dayFixtures.validDay)
      }

      request(app)
        .post(apiUrl)
        .expect(200)
        .end(function (error, res) {
          res.body.day.title.should.equal(dayFixtures.validDay.title)

          done(error)
        })
    })

    it('should return a 500 if create function errors', function (done) {
      serviceLocator.dayService.create = function ( body ,callback) {
        return callback('error')
      }

      request(app)
        .post(apiUrl)
        .expect(500, done)

    })

  })





  describe('PUT /api/days - Updating a day', function () {
    var apiUrl = '/api/days'

    it('should return a 200', function (done) {

      serviceLocator.dayService.update = function ( body, callback) {
        return callback(undefined,  dayFixtures.validDay )
      }

      request(app)
        .put(apiUrl)
        .set('Content-Type', 'application/json')
        .send( { _id : 'id', content : dayFixtures.validDay } )
        .expect(200, done)

    })

    it('should return a day', function (done) {

      serviceLocator.dayService.update = function ( body, callback) {
        var updatedDate = _.extend({}, dayFixtures.validDay, { body: 'New body' })
        return callback(undefined,  updatedDate )
      }

      request(app)
        .put(apiUrl)
        .set('Content-Type', 'application/json')
        .send( { _id : 'id', content : dayFixtures.validDay } )
        .expect(200)
        .end(function (error, res) {
          res.body.day.title.should.equal(dayFixtures.validDay.title)
          res.body.day.body.should.equal('New body')

          done(error)
        })
    })

    it('should return a 404 if day does not exists', function (done) {
      serviceLocator.dayService.update = function ( body, callback) {
        return callback(undefined)
      }

      request(app)
        .put(apiUrl)
        .set('Content-Type', 'application/json')
        .send( { _id : 'id', content : dayFixtures.validDay } )
        .expect(404, done)

    })

    it('should return a 500 if update errors', function (done) {
      serviceLocator.dayService.update = function ( body, callback) {
        return callback('error')
      }

      request(app)
        .put(apiUrl)
        .set('Content-Type', 'application/json')
        .send( { _id : 'id', content : dayFixtures.validDay } )
        .expect(500, done)

    })

  })
})