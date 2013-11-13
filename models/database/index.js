var mongoose = require('mongoose')
  , db = mongoose.connection

module.exports = function (options, logger) {
  function connect(callback) {
    var connectionString = 'mongodb://'

    if (options.user) {
      connectionString += options.user + ':' + options.password + '@'
    }

    connectionString += options.host + ':' + options.port + '/' + options.name

    logger.info('Connecting to', connectionString)
    mongoose.connect(connectionString)

    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', function () {
      logger.info('Database connected!')
      if (callback) callback()
    })
  }

  return {
    connect: connect
  }
}