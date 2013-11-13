var service = require('./service')
    async   = require('async')
    moment  = require('moment')


module.exports = function (serviceLocator, callback) {
  serviceLocator.logger.info('Registering Item Service')

  serviceLocator.register('itemService', service(serviceLocator.logger))




}