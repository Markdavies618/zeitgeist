var passport =  require('passport')
    , userRoles = require('../public/js/routingConfig').userRoles
    , _ = require('lodash')
    , corsMiddleware = require('../lib/cors.js')
    , sanitise = require('../models/user/lib/sanitise')

module.exports.createRoutes = function (serviceLocator, app) {

  var cors = corsMiddleware(serviceLocator.properties.allowedDomains)

  //========================================================
  //  @todo admin auth needed
  //========================================================


  app.get('/api/users',cors , serviceLocator.userService.ensureAuthorized, function (req, res) {

    serviceLocator.userService.findAll(function(err, users){
      if ( err ){
        serviceLocator.logger.error('Find day findByPermalink Error', err)
        return res.send(500)
      }
      if (!users) return res.send(404)

      var sanitiseUsers = sanitise(users)
      res.json(sanitiseUsers)

    })
  });


  app.get('/api/users/:id', cors, serviceLocator.userService.ensureAuthorized,function (req, res) {
    serviceLocator.userService.findById(req.params.id, function(err, user){
      if ( err ){
        serviceLocator.logger.info('Find user Error', err)
        return res.send(500)
      }
      if (!user) return res.send(404)

      var sanitiseUser = sanitise(user)
      res.json(sanitiseUser[0])

    })
  });






  // Email user login


  app.post('/register',cors , function(req, res, next) {
      try {
          serviceLocator.userService.validate(req.body);
      }
      catch(err) {
          return res.send(400, err.message);
      }
      serviceLocator.userService.addUser(req.body.username, req.body.password, req.body.role, function(err, user) {
          if(err === 'UserAlreadyExists') return res.send(403, "User already exists");
          else if(err)                    return res.send(500);
          req.logIn(user, function(err) {
              if(err)     { next(err); }
              else        { res.json(200, { "role": user.role, "username": user.username , "_id": user._id}); }
          });
      });
  });

  app.post('/login', cors, function(req, res, next) {

    passport.authenticate('local', function(err, user) {
        if(err)     { return next(err); }
        if(!user)   { return res.send(400); }

        req.logIn(user, function(err) {
            if(err) {
                return next(err);
            }

            // TODO add back in remember me
            if(req.body.rememberme) {
              // req.session.cookie= {};
              // req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7;
            }
            res.json(200, { "role": user.role, "username": user.username , "_id": user._id });
        });
    })(req, res, next);
  });








  // FACEBOOK USER LOGIN
  app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email'}),function (req, res) {

  })


  app.get('/auth/facebook/callback', passport.authenticate('facebook', { scope: 'email'}),function (req, res) {
    if ( req.user ){
      role = req.user.role;
      username = req.user.username;
      _id = req.user._id;
      res.cookie('user', JSON.stringify({
          'username': username,
          'role': role,
          '_id': _id
      }));
      // console.log(req.cookies.path);
      res.redirect('/')
    } else {
      res.redirect('/login')

    }
  })




  app.post('/logout', function(req, res, next) {
      req.logout();
      res.send(200);
  });






  app.get('/*',cors, function (req, res) {
    var role = userRoles.public, username = '', _id = '';
    if(req.user) {
        role = req.user.role;
        username = req.user.username;
        _id = req.user._id;
    }
    res.cookie('user', JSON.stringify({
        'username': username,
        'role': role,
        '_id': _id
    }));
    res.render('index', {
      "title" : "Index"
    });
  });


 
};