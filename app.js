// find a more complete pushState server here https://gist.github.com/1359650/516c8cceca852d4f2ed380960a67a6bee7b23773
var fs = require('fs')
  , express = require('express')
  , stylus = require('stylus')
  , mongoose = require('mongoose')
  , properties = require('./properties.js')
  , async = require('async')
  , clusterMaster = require('clustered')
  , domain = require('domain')
  , http = require('http')
  , _ = require('lodash')
  , serviceLocator = require('service-locator').createServiceLocator()
  , bunyan = require('bunyan')
  , auth = express.basicAuth('testUser', 'testPass')
  , passport =    require('passport')
  , cache = require('./lib/cache')

var app = express()
  , logger = bunyan.createLogger({name: 'hashtap'})

serviceLocator.register('logger', logger)
              .register('properties', properties())

function compile(str, path) {
  return stylus(str)
    .define('url', stylus.url(
      { paths: [__dirname + '/public']
      , limit : 10000
      }))
    .set('filename', path)
    .set('compress', true)
    // .use(nib())
}

require('./models')(serviceLocator, function () {

  // app.configure(function(){
  app.set('port', process.env.PORT || 4004)
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', { pretty: true })
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.methodOverride());
  app.use(cache(300));
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(express.static(__dirname + '/public'));
  app.use(express.cookieSession(
    {
        secret: process.env.COOKIE_SECRET || "Superdupersecret"
        , cookie: { maxAge: 60 * 60 * 1000 }
    }));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(serviceLocator.userService.localStrategy);
  passport.use(serviceLocator.userService.facebookStrategy()); // Comment out this line if you don't want to enable login via Facebook

  passport.serializeUser(serviceLocator.userService.serializeUser);
  passport.deserializeUser(serviceLocator.userService.deserializeUser);
  app.use(app.router);



  app.get('/templates/:name', function (req, res) {
    var name = req.params.name;
    res.render('templates/' + name);
  });



  clusterMaster(function () {
    var serverDomain = domain.create()

    serverDomain.run(function () {

      var server = http.createServer(function (req, res) {

        var resd = domain.create()
        resd.add(req)
        resd.add(res)

        resd.on('error', function (error) {
          serviceLocator.logger.error('Error', error, req.url)
          resd.dispose()
        })

        return app(req, res)
      }).listen(app.get('port'), function () {
        serviceLocator.logger.info('Server running on address: '
          + server.address().address + ' port: ' + server.address().port)
      })
    })

  })

  require('./controllers/item').createRoutes(serviceLocator, app);
  require('./controllers/list').createRoutes(serviceLocator, app);

  app.use(function errorHandler(error, req, res, next) {
    serviceLocator.logger.error('Error occurred while handling request:\n',
      _.pick(req, 'method', 'url', 'query', 'headers', 'ip', 'ips'))
    serviceLocator.logger.error(error.message)
    serviceLocator.logger.error(error.stack)
    var status = error.status || 500
    res.status(status)
    res.render('errors/' + status)
  })
})


