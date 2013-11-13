// 'use strict'

// var chai = require('chai')
//   , should = chai.should()
//   , utils = require('../utils')
//   , UserModel = require('../../models/user/service.js').model


// describe('User: model', function () {

//   describe('#create()', function () {

//     it('should create a new user', function () {
//       var newUser = new UserModel({
//         'username': 'bob'
//       , 'email': 'bob@synthmedia.co.uk'
//       , 'password': 'cheese_cake'
//       , 'admin': { 'role' : 'admin' , 'bitMask' : 4}
//       })

//       newUser.save(function (err, user) {
//         should.not.exist(err)
//         user.username.should.equal('bob')
//         user.email.should.equal('bob@synthmedia.co.uk')
//         user.admin.should.equal(true)
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