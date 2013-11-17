'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
// angular.module('myApp.services', []).
//   value('version', '0.1');


'use strict';

angular.module('myApp.services', [])
.factory('Auth', function($http, $cookieStore){

    var accessLevels = routingConfig.accessLevels
        , userRoles = routingConfig.userRoles
        , currentUser = $cookieStore.get('user') || { username: '', role: userRoles.public }
        , adminUser = false;

    if (currentUser.role.bitMask === 4){
        adminUser = true;
    }
    $cookieStore.remove('user');
    function changeUser(user) {
        $cookieStore.put('user', user);
        _.extend(currentUser, user);

    };

    return {
        authorize: function(accessLevel, role) {
            if(role === undefined)
                role = currentUser.role;
            return accessLevel.bitMask & role.bitMask;
        },
        isLoggedIn: function(user) {
            if(user === undefined)
                user = currentUser;
                $cookieStore.put('user', user);
            return user.role.title == userRoles.user.title || user.role.title == userRoles.admin.title;
        },
        register: function(user, success, error) {
            $http.post('/register', user).success(function(res) {
                changeUser(res);
                success();
            }).error(error);
        },
        login: function(user, success, error) {
            $http.post('/login', user).success(function(user){
                changeUser(user);
                success(user);
            }).error(error);
        },
        logout: function(success, error) {
            $http.post('/logout').success(function(){
                changeUser({
                    username: '',
                    role: userRoles.public
                });
                success();
            }).error(error);
        },
        isAdminUser: function(user) {
            // if(user === undefined)
            //     user = currentUser;
            if(currentUser !== undefined && currentUser.role.bitMask === 4) {
                return true
            }else {
               return false
            }
            // return user.role.title == userRoles.user.title || user.role.title == userRoles.admin.title;
        },
        accessLevels: accessLevels,
        userRoles: userRoles,
        user: currentUser,
        adminUser : adminUser
    };
})

.factory('Users', function($http) {
    return {
        getAll: function(success, error) {
            $http.get('/api/users').success(success).error(error);
        },
        getFromId: function(userId, success, error) {
            $http.get('/api/users/'+userId).success(success).error(error);
        },
        getUsersFeeds: function(userId, success, error) {
            $http.get('/api/users/'+userId+'/feeds').success(success).error(error);
        }
    };
})

.factory('Lists', function($http) {
    return {
        getDays: function(success, error) {
            $http.get('/api/lists').success(success).error(error);
        },
        getDayByPermalink: function(permalink, success, error) {
            $http.get('/api/lists/'+permalink).success(success).error(error);
        }
    };
})


.service('Items', function($q, $http){
  this.searchItems = function(term) {
    var deferred = $q.defer();
    $http.get('/api/items').then(function(items){
        var _items = {};
        var items = items.data;
        for(var i = 0, len = items.length; i < len; i++) {
         _items[items[i].artist] = items[i]._id;
        }

          deferred.resolve(_items);
        }, function() {
          deferred.reject(arguments);
        });

        return deferred.promise;
    }
})


