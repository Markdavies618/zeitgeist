var mongoose = require('mongoose')

module.exports = function (logger) {

  logger.info('Setting up User schema')

  var schema = {}

  schema.properties =
    { email_address     : { type : String }
    , username          : { type : String }
    , password          : { type : String }
    , date_registered   : { type: Date, default: Date.now }
    , role              : { type : Object }
    , facebook_id       : { type : Number }
    }

  schema.schema = mongoose.Schema(schema.properties)


  return schema

}