var request = require('supertest')
  , serviceLocator = require('service-locator').createServiceLocator()
  , should = require('should')
  , _ = require('lodash')
  , sanitise = require('../../../../models/user/lib/sanitise')
  , userFixtures = require('../fixtures')

describe('User model sanitise', function () {

  it('should only return specified fields', function (done) {
    var sanitisedModel = sanitise(userFixtures.validUser)
    sanitisedModel[0].should.have.property('email_address')
    sanitisedModel[0].should.have.property('username')
    sanitisedModel[0].should.not.have.property('password')

    done()
  })

  it('should work with single object', function (done) {
    var sanitisedModel = sanitise(userFixtures.validUser)
    sanitisedModel[0].should.have.property('email_address')
    sanitisedModel[0].should.have.property('username')
    sanitisedModel[0].should.not.have.property('password')

    done()
  })

  it('should work with array of objects', function (done) {
    var collection = [ userFixtures.validUser, userFixtures.validUser ]

    var sanitisedCollection = sanitise(collection)
    // Check first model
    sanitisedCollection[0].should.have.property('email_address')
    sanitisedCollection[0].should.have.property('username')
    sanitisedCollection[0].should.not.have.property('password')
    // Check second model
    sanitisedCollection[0].should.have.property('email_address')
    sanitisedCollection[0].should.have.property('username')
    sanitisedCollection[1].should.not.have.property('password')

    done()
  })
})