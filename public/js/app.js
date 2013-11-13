'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'ngCookies']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    var access = routingConfig.accessLevels;
    $routeProvider.
      when('/', {
        templateUrl  : '/templates/index',
        controller   : 'HomeCtrl',
        access       : access.anon
      })

      .when('/:list', {
        templateUrl  : '/templates/day',
        controller   : 'BlogCtrl',
        access       : access.user
      })

      .when('/cms', {
        templateUrl  : '/templates/day-control',
        controller   : 'CMSCtrl',
        access       : access.admin
      })

      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }])


.run(['$rootScope', '$location', 'Auth', '$cookieStore',function ($rootScope, $location, Auth, $cookieStore) {

  $rootScope.$on("$routeChangeStart", function (event, next, current) {

  });

}]);