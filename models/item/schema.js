var mongoose = require('mongoose')

module.exports = function (logger) {

  logger.info('Setting up Day schema')

  var schema = {}

  schema.properties =
    { artist         : { type : String }
    , name           : { type : String }
    , type           : { type : String }
    , spotify_link   : { type : String }
    , itunes_link    : { type : String }
    , rdio_link      : { type : String }
    , artwork        : { type : String }
    , type           : { type : String }
    , date_created   : { type: Date, default: Date.now }
    }

  schema.schema = mongoose.Schema(schema.properties)


  return schema

}