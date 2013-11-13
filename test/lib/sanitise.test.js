var request = require('supertest')
  , serviceLocator = require('service-locator').createServiceLocator()
  , should = require('should')
  , _ = require('lodash')
  , sanitise = require('../../lib/sanitise')

describe('Sanitise Function', function () {
  var fields = ['email_address', 'username']

  it('should only return specified fields', function (done) {
    var model =
      { email_address     : 'maxim@synthmedia.co.uk'
      , username          : 'maxim'
      , password          : 'synth001'
      }
    var sanitisedModel = sanitise(model, fields)
    sanitisedModel[0].should.have.property('email_address')
    sanitisedModel[0].should.have.property('username')
    sanitisedModel[0].should.not.have.property('password')

    done()
  })

  it('should work with single object', function (done) {
    var model =
      { email_address     : 'maxim@synthmedia.co.uk'
      , username          : 'maxim'
      , password          : 'synth001'
      }
    var sanitisedModel = sanitise(model, fields)
    sanitisedModel[0].should.have.property('email_address')
    sanitisedModel[0].should.have.property('username')
    sanitisedModel[0].should.not.have.property('password')

    done()
  })

  it('should work with array of objects', function (done) {
    var collection =
      [ { email_address     : 'maxim@synthmedia.co.uk'
        , username          : 'maxim'
        , password          : 'synth001'
        }
      , { email_address     : 'mark@synthmedia.co.uk'
        , username          : 'mark'
        , password          : 'cheeseCreak'
        }
      ]

    var sanitisedCollection = sanitise(collection, fields)
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