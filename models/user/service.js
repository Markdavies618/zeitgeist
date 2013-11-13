var mongoose = require('mongoose')
  , userSchema = require('./schema')
  , async = require('async')
  , request = require('request')
  , passport =        require('passport')
  , LocalStrategy =   require('passport-local').Strategy
  , FacebookStrategy = require('passport-facebook').Strategy
  , check =           require('validator').check
  , userRoles = require('../../public/js/routingConfig.js').userRoles


module.exports = function (serviceLocator) {
  serviceLocator.logger.info('Setting up User service')

  var service = {}

  service.model = mongoose.model('User', userSchema(serviceLocator.logger).schema)
  var User = service.model

  service.findAll = function(cb) {
      User.find().exec(function (err, users) {
        if (err){
          serviceLocator.logger.error('Find all user error:',err)
          cb(err)
        } else {
          cb(null , users)
        }
      });
  },

  service.findById = function(id, cb) {
      User.findOne({_id : id }).exec(function (err, user) {
        if (err){
          serviceLocator.logger.error('Find by Id user error:',err)
          cb(err)
        }
        else if(!user) {
          cb(null)
        }
        else {
          cb(null, user)
        }
      });
  },

  service.findByUsername = function(username, cb) {

      User.findOne({username : username }).exec(function (err, user) {
        if (err){
          serviceLocator.logger.error('Find one user error:',err)
          cb(err)
        }
        else if(!user) {
          cb(null, false, { message: 'User Not Found' });
        }
        else {
          cb(null, user);
        }
      });
  },
  service.localStrategy = new LocalStrategy(
      function(username, password, done) {
          service.findByUsername(username, function(err, user, msg){
            if(!user) {
                done(null, false, { message: 'Incorrect username.' });
            }
            else if(user.password != password) {
                done(null, false, { message: 'Incorrect username.' });
            }
            else {
                return done(null, user);
            }
          });

      }
  ),

  service.facebookStrategy = function() {
      if(!serviceLocator.properties.facebook.appId)     throw new Error('A Facebook App ID is required if you want to enable login via Facebook.');
      if(!serviceLocator.properties.facebook.appSecret) throw new Error('A Facebook App Secret is required if you want to enable login via Facebook.');

      return new FacebookStrategy({
          clientID: serviceLocator.properties.facebook.appId,
          clientSecret: serviceLocator.properties.facebook.appSecret,
          callbackURL: serviceLocator.properties.facebook.callbackUrl || "http://localhost:8000/auth/facebook/callback"
      },
      function(accessToken, refreshToken, profile, done) {
          service.findOrCreateOauthUser( profile, function(err, user){
            if (!err){
              done(null, user);
            } else {
              serviceLocator.logger.error('Facebook log in error:',err)

            }
          });
      });
  },

  service.findOrCreateOauthUser = function( profile , cb) {
        var user = service.findByFacebookId( profile.id, function(err, user){
          if (err){
            cb(err)
          } else if (user){
            serviceLocator.logger.info('User found, login in ', user._id)


            if (checkAdminUser(user)){
              user.role = userRoles.admin;
            }
            user.save(function (err, user) {
              if(err) {
                serviceLocator.logger.error('Add User error:',err)
                cb(err);
              } else {
                cb(null, user);
              }
            });
          } else {

            var newUser = new User();

            newUser.username = profile._json.email;
            newUser.role = userRoles.user;
            newUser.facebook_id = profile.id;

            if (checkAdminUser(newUser)){
              newUser.role = userRoles.admin;
            }
            newUser.save(function (err, user) {
              if(err) {
                serviceLocator.logger.error('Add User error:',err)
                cb(err);
              } else {
                cb(null, user);
              }
            });
          }

        });

  },
  service.findByFacebookId = function( id, cb) {
      User.findOne({facebook_id : id }).exec(function (err, user) {
        if (err){
          serviceLocator.logger.error('Find one user error:',err)
          cb(err)
        }
        else if(!user) {
          cb(null, false, { message: 'User Not Found' });
        }
        else {
          cb(null, user);
        }
      });
  },

  service.addUser = function(username, password, role, callback) {
      service.findByUsername(username, function(err, user, msg){
        if (err){
          serviceLocator.logger.error('Find by username User error:',err)
          callback(err)
        }
        else if(user){
          callback(null, user)
        }
        else{
          var newUser = new User();

          newUser.username = username;
          newUser.password = password;
          newUser.role = role;
          newUser.save(function (err, user) {
            if(err) {
              serviceLocator.logger.error('Add User error:',err)
              callback(err);
            } else {
              callback(null, user);
            }
          });
        }
      })
  },


  service.validate = function(user) {
      check(user.username, 'Username must be 1-20 characters long').len(1, 20);
      check(user.password, 'Password must be 5-60 characters long').len(5, 60);
      // check(user.username, 'Invalid username').not(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/);

      // TODO: Seems node-validator's isIn function doesn't handle Number arrays very well...
      // Till this is rectified Number arrays must be converted to string arrays
      // https://github.com/chriso/node-validator/issues/185
      // var stringArr = _.map(_.values(userRoles), function(val) { return val.toString() });
      // console.log(stringArr);
      // check(user.role, 'Invalid user role given').isIn(stringArr);
      return;
  },


  service.serializeUser = function(user, done) {
      done(null, user.id);
  },

  service.deserializeUser = function(id, done) {
    service.findById(id, function(err, user){

      if(user)    { done(null, user); }
      else        { done(null, false); }
    });

  }

  service.ensureAuthorized = function(req, res, next) {
    var role;
    if(!req.user) role = userRoles.public;
    else          role = req.user.role;
    // var accessLevel = _.findWhere(routes, { path: req.route.path }).accessLevel || accessLevels.public;
    if(role.bitMask !== 4) return res.send(403);
    return next();
  }


  return service



  function checkAdminUser(user){
    var adminIds = serviceLocator.properties.adminIds
    for (var i in adminIds) {
      if (adminIds[i] == user.facebook_id){
        return true
      }
    }
    return false
  }
}