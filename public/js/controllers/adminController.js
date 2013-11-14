'use strict';


function NewListCtrl ($rootScope, $routeParams, $scope, $http, Auth, $location, Lists ) {
  Lists.getDayByPermalink($routeParams.day,function(day){
    
    $scope.day = day.day
    $scope.save = function() {
      $http.put('/api/days', {
          content: $scope.day
        }).success(function(data) {
          $location.path('/'+data.day.permalink)
        });
    }

  },function(err){

  });

};