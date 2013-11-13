var service = require('./service')

module.exports = function (serviceLocator, callback) {
  serviceLocator.logger.info('Registering User Service')

  serviceLocator.register('userService', service(serviceLocator))
  callback()
}