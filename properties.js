var _ = require('lodash')

  , baseProperties =
    { basePort: 4002
    , db:
      { host: 'localhost'
      , name: 'bestivalcalender'
      , port: 27017
      }
    , facebook:
      { appId: '595639770493576'
      , appSecret: 'c86afb797d979840fe7d9e4109589788'
      , callbackUrl: 'http://localhost:4004/auth/facebook/callback'
      }
    , adminIds:
      [ '500261036'
      , '564510071'
      , '545998365'
      , '510438540'
      , '644049123'
      ]
    , allowedDomains:
      [ 'http://localhost:4004' ]
    , startDate : 'December 1, 2013 00:00:00'
    , endDate : 'December 25, 2013 00:00:00'
    }

  , properties =
    { development: { }
    , testing:
      { db:
        { user: 'mark618'
        , password: 'synth001'
        , host: 'paulo.mongohq.com'
        , port: 10063
        , name: 'bestivalcalendar'
      }
    , facebook:
      { appId: '1425764387652251'
      , appSecret: 'ed6a191ba0082462dc595802b1448a5d'
      , callbackUrl: 'http://jaar.synthmedia.co.uk:4014/auth/facebook/callback'
      }
    , allowedDomains:
      [ 'http://jaar.synthmedia.co.uk:4014' ]
    }
    , production:
      { db: 'mongodb://localhost/esis-test' }
    }

module.exports = function() {
  var environment = process.env.NODE_ENV || 'development'

  return _.extend({ environment: environment }, baseProperties, properties[environment])
}