var request = require('supertest')
  , should = require('should')
  , _ = require('lodash')
  , async = require('async')
  , logger =
    { info: function () {}
    , warn: function () {}
    , error: function () {}
    , debug: function () {}
    }
  , daySchema = require('../../../models/day/schema')
  , dayService = require('../../../models/day/service')(logger)
  , dayFixtures = require('./fixtures')
  , mongoose = require('mongoose')
  , Day = dayService.model

  // Container for testing find events
  , daysContainer = []

describe('Day service', function () {

  before( function (done) {
    mongoose.connect('mongodb://localhost/test' + Math.round(Math.random() * 1000000).toString(36))

    mongoose.connection.once('open', function(){

      async.each(dayFixtures.dates, function(date, cb){
        dateCreator(date, function(){
          cb()
        })
      }, done)
    })
  })

  describe('findAll()', function () {
    it('should return an array of days', function (done) {
      dayService.findAll(function(err, days){
        should.exist(days)
        should.not.exist(err)
        days.should.be.instanceof(Array)
        days.length.should.equal(dayFixtures.dates.length)
        done(err)
      })
    })
  })


  describe('findById()', function () {
    it('should return a day', function (done) {
      dayService.findById(daysContainer[0]._id, function(err, day){
        should.exist(day)
        should.not.exist(err)
        day.should.be.instanceof(Object)
        day.title.should.equal(daysContainer[0].title)
        done(err)
      })
    })
  })


  describe('findByPermalink()', function () {
    it('should return a day', function (done) {
      dayService.findByPermalink(daysContainer[0].permalink, function(err, day){
        should.exist(day)
        should.not.exist(err)
        day.should.be.instanceof(Object)
        day.title.should.equal(daysContainer[0].title)
        day.permalink.should.equal(daysContainer[0].permalink)
        done(err)
      })
    })
  })

  describe('create()', function () {
    it('should return a day', function (done) {
      dayService.create(dayFixtures.validDay, function(err, day){
        should.exist(day)
        should.not.exist(err)
        day.should.be.instanceof(Object)
        day.title.should.equal(dayFixtures.validDay.title)
        day.permalink.should.equal(dayFixtures.validDay.permalink)
        done(err)
      })
    })
  })


  describe('update()', function () {
    it('should return an updated day', function (done) {
      var updatedDay = _.extend({}, daysContainer[0], { title: 'newTitle' })
      dayService.update( updatedDay, function(err, day){
        should.exist(day)
        should.not.exist(err)
        day.should.be.instanceof(Object)
        day.title.should.equal('newTitle')
        done(err)
      })
    })
  })

  after(function (done) {
    mongoose.connection.db.dropDatabase()
    mongoose.disconnect()
    done()
  })
})




function dateCreator(date, cb) {

  var day = _.extend({}, dayFixtures.validDay, { date: date })
  Day.findOneAndUpdate({ date : date}, day, { upsert : true }, function(err, newDay){
    daysContainer.push(newDay._doc)
    cb()
  })

}