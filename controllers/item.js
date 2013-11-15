var corsMiddleware = require('../lib/cors.js')
  , noCache = require('../lib/no-cache.js')

module.exports.createRoutes = function (serviceLocator, app) {
  serviceLocator.logger.info('Setting up list routes')

  var cors = corsMiddleware(serviceLocator.properties.allowedDomains)

  app.get('/api/items', cors, function (req, res) {
    serviceLocator.itemService.findAll(function(err, days){
      if ( err ){
        serviceLocator.logger.error('Find day findByPermalink Error', err);
        return res.send(500);
      }

      res.json(days);

    })
  });


  app.get('/api/items/:permalink', cors, function (req, res) {
    serviceLocator.itemService.findByPermalink(req.params.permalink, function(err, day){
      if ( err ){
        serviceLocator.logger.info('Find day findByPermalink Error', err);
        return res.send(500);
      }
      if (!day) return res.send(404)

      res.json({ day : day });
    })
  });



  app.post('/api/items', cors, noCache, function (req, res) {
    serviceLocator.logger.info('Adding item', req.body );

    serviceLocator.itemService.create(req.body ,function(err, item){
      if ( err ){
        serviceLocator.logger.info('Post Days Error', err);
        return res.send(500);
      }
      serviceLocator.logger.info('Created Item', item);

      res.json(item);

    })
  });


  app.put('/api/items', cors, noCache, function (req, res) {
    serviceLocator.itemService.update(req.body.content ,function(err, day){
      if ( err ){
        serviceLocator.logger.info('Update Day Error', err);
        return res.send(500);
      }

      if (!day) return res.send(404)

      res.json({ day : day });
    })
  });


};