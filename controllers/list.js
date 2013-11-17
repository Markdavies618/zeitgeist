var corsMiddleware = require('../lib/cors.js')
  , noCache = require('../lib/no-cache.js')

module.exports.createRoutes = function (serviceLocator, app) {
  serviceLocator.logger.info('Setting up list routes')

  var cors = corsMiddleware(serviceLocator.properties.allowedDomains)

  app.get('/api/lists', cors, function (req, res) {
    serviceLocator.listService.findAll(function(err, days){
      if ( err ){
        serviceLocator.logger.error('Find day findByPermalink Error', err);
        return res.send(500);
      }

      res.json(days);

    })
  });


  app.get('/api/lists/:permalink', cors, function (req, res) {
    serviceLocator.listService.findByPermalink(req.params.permalink, function(err, day){
      if ( err ){
        serviceLocator.logger.info('Find day findByPermalink Error', err);
        return res.send(500);
      }
      if (!day) return res.send(404)

      res.json({ day : day });
    })
  });



  app.post('/api/lists', cors, noCache, function (req, res) {
    serviceLocator.listService.create(req.body ,function(err, list){
      if ( err ){
        serviceLocator.logger.info('Post Days Error', err);
        return res.send(500);
      }
      serviceLocator.logger.info('List Added', list);

      res.json(list);

    })
  });


  app.put('/api/lists', cors, noCache, function (req, res) {
    serviceLocator.listService.update(req.body.content ,function(err, day){
      if ( err ){
        serviceLocator.logger.info('Update Day Error', err);
        return res.send(500);
      }

      if (!day) return res.send(404)

      res.json({ day : day });
    })
  });


};