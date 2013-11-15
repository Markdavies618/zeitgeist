var mongoose = require('mongoose')

module.exports = function (logger) {

  logger.info('Setting up Day schema')

  var schema = {}

  schema.properties =
    { artist         : { type : String }
    , name           : { type : String }
    , type           : { type : String }
    , spotify        : { type : String }
    , itunes         : { type : String }
    , rdio           : { type : String }
    , artwork        : { type : String }
    , date_created   : { type: Date, default: Date.now }
    }

  schema.schema = mongoose.Schema(schema.properties)


  return schema

}