var _ = require('lodash')

module.exports = function (models, fields) {
  models = [].concat(models)
  var sanitisedModels = []

  _.forEach(models, function (model) {
    var sanitisedModel = {}

    _.forEach(fields, function (field) {
      sanitisedModel[field] = model[field]
    })

    sanitisedModels.push(sanitisedModel)
  })

  return sanitisedModels
}