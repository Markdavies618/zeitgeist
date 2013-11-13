var database = require('./database')
  , async = require('async')

module.exports = function (serviceLocator, callback) {
  var services =
      [ 'item'
      , 'list'
      ]

  database(serviceLocator.properties.db, serviceLocator.logger).connect(function () {
    async.each(services, function (service, callback) {
      require('./' + service)(serviceLocator, callback)
    }, callback)
  })
}