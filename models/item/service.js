var mongoose = require('mongoose')
  , schema = require('./schema')
  , check =           require('validator').check


module.exports = function (logger) {
  logger.info('Setting up Item service')

  var service = {}

  service.model = mongoose.model('Item', schema(logger).schema)

  service.findAll = function(cb) {
    service.model.find().sort({'date': 1}).exec(function (err, days) {
      if (err){
        logger.error('Find all user error:', err)
      }

      return cb(err, days)
    })
  }

  service.findById = function(id, cb) {
    service.model.findOne({_id : id }).exec(function (err, day) {
      if (err){
        logger.error('Find by Id day error:',err)
        cb(err)
      }
      else if(!day) {
        cb(null)
      }
      else {
        cb(null, day)
      }
    })
  }

  service.findByPermalink = function(permalink , cb) {
    service.model.findOne({permalink : permalink }).exec(function (err, day) {
      if (err){
        logger.error('Find by Id day error:',err)
        cb(err)
      }
      else if(!day) {
        cb(null)
      }
      else {
        cb(null, day)
      }
    })
  }

  service.create = function ( body, cb ) {
    var day = new service.model(body)
    day.save(function (err) {
      if (!err) {
        cb(null, day)
      } else {
        cb(err)
      }
    })
  }



  service.update = function ( body , cb ) {
    service.model.findById(body._id, function (err, result) {
      if (err) {
        cb(err)
      } else if(!result) {
        cb(null)
      } else {
        Object.keys(body).forEach(function (key) {
          result[key] = body[key]
        })

        result.save(function (err) {
          if (!err) {
            cb(null, result)
          } else {
            cb(err)
          }
        })
      }
    })
  }

  service.delete = function ( id , cb ) {
    service.model.findById(id, function (err, result) {
      if (err) {
        cb(err)
      } else {
        result.remove()
        result.save(function (err) {
          if (!err) {
            cb(null, {})
          } else {
            cb(err)
          }
        })
      }
    })
  }



  service.validate = function(user) {
    check(user.username, 'Username must be 1-20 characters long').len(1, 20)
    check(user.password, 'Password must be 5-60 characters long').len(5, 60)

    return
  }




  return service
}