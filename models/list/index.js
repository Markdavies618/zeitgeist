var service = require('./service')
    async   = require('async')
    moment  = require('moment')


module.exports = function (serviceLocator, callback) {
  serviceLocator.logger.info('Registering List Service')

  serviceLocator.register('listService', service(serviceLocator.logger))

  

}