'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
  .directive('usersLink', function() {
    return {
      restrict: 'A',
      replace: true,
      template: '<a class="btn btn-white" ng-show="isAdmin" href="users"> Users </a>',
      controller: ['$scope', '$http','Auth', function($scope, $http, Auth) {
        $scope.isAdmin = Auth.isAdminUser()
      }]
    }
  })
