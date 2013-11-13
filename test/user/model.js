// 'use strict'

// var chai = require('chai')
//   , should = chai.should()
//   , utils = require('../utils')
//   , serviceLocator  = require('service-locator').createServiceLocator()
//   , bunyan = require('bunyan')
//   , logger = bunyan.createLogger({name: 'hashtap'})
//   serviceLocator.register('logger', logger)
//   require('../../models/feed/index.js')(serviceLocator)
//   var feedModel = serviceLocator.feedService.model


// describe('Feed: model', function () {

//   describe('#create()', function () {

//     it('should create a new feed', function () {

//       var newFeed = {
//         'title': 'test page'
//       , 'hashtags': ['bob@synthmedia.co.uk']
//       }

//       serviceLocator.feedService.create(newFeed, function(err, feed){
//         should.not.exist(err)
//         feed.title.should.equal('test page')
//         feed.hashtags.should.equal(['bob@synthmedia.co.uk'])
//       })

//     })

//     // it('should return err if not an email address', function (done) {
//     //   var newUser = new UserModel({
//     //     'username': 'steve'
//     //   , 'email': 'steve'
//     //   , 'password': 'cheese cake'
//     //   , 'admin': true
//     //   })

//     //   newUser.save(function (err, user) {
//     //     should.exist(err)
//     //     done()
//     //   })
//     // })
//   })

//   // describe('#comparePasswordAndHash()', function () {
//   //   it('should return true if password is valid', function (done) {
//   //     var password = 'fruit cake'
//   //       , newUser = new UserModel({
//   //                     'username': 'bill'
//   //                   , 'email': 'bill@synthmedia.co.uk'
//   //                   , 'password': password
//   //                   , 'admin': true
//   //                   })

//   //     newUser.save(function (err, user) {
//   //       newUser.comparePassword(password, function (err, isMatch) {
//   //         isMatch.should.equal(true)

//   //         console.log(isMatch)

//   //         done()
//   //       })
//   //     })
//   //   })

//   //   it('should return false if password is invalid', function (done) {
//   //     var password = 'fruit cake'
//   //       , newUser = new UserModel({
//   //                     'username': 'bill'
//   //                   , 'email': 'bill@synthmedia.co.uk'
//   //                   , 'password': password
//   //                   , 'admin': true
//   //                   })
//   //       , invalidPassword = 'carrot cake'

//   //     newUser.save(function (err, user) {
//   //       newUser.comparePassword(invalidPassword, function (err, isMatch) {
//   //         isMatch.should.not.equal(true)

//   //         console.log(isMatch)

//   //         done()
//   //       })
//   //     })
//   //   })
//   // })



// })