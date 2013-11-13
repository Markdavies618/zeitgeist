var mongoose = require('mongoose')

module.exports = function (logger) {

  logger.info('Setting up List schema')

  var schema = {}

  schema.properties =
    { title          : { type : String }
    , description    : { type : String }
    , link           : { type : String }
    , items          : [{ type : String }]
    , type           : { type : String }
    , date_created   : { type: Date, default: Date.now }
    }

  schema.schema = mongoose.Schema(schema.properties)


  return schema

}