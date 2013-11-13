'use strict';

/* Directives */


// angular.module('myApp.directives', [])
app.directive('navigation', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: '/templates/navigation',
      controller: ['$scope', '$http','Auth', '$location', function($scope, $http, Auth, $location) {
        $scope.adminUser = Auth.isAdminUser()
      }]
    }
  })