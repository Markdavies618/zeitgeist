'use strict';


function HomeCtrl($scope, $rootScope, $http, Auth, $location, Lists, $cookieStore) {


    // Lists.getLists(function(lists){
    //   $scope.lists = lists
    //   console.log(days);
    // })

}



function DayCtrl($rootScope, $routeParams, $scope, $http, Auth, $location, Lists,$cookieStore) {
  Lists.getDayByPermalink($routeParams.day,function(day){
    $scope.day = day.day
    $scope.video = day.day.body
    console.log($scope.day);
    // console.log($scope.video);
  },function(err){

    if( Auth.adminUser ) {
      $location.path('/cms/'+$routeParams.day)
    } else {
      $location.path('/')
    }
  });

  $cookieStore.put('path', "/");
  $rootScope.admin = Auth.adminUser

}


function CMSCtrl($rootScope, $routeParams,$scope, $http, Auth, $location, Days, $cookieStore) {
  // $scope.$watch('foo', function(newVal, oldVal) {
  //     console.log(newVal, oldVal);
  // });


  $scope.addItem = function(){
    console.log('add')
  }
  // Days.getDayByPermalink($routeParams.day,function(day){
  //   $scope.editorOptions = {
  //       extraPlugins : 'youtube'
  //      // uiColor: '#000000'
  //   };
  //   $scope.day = day.day
  //   $scope.save = function() {
  //     $http.put('/api/days', {
  //         content: $scope.day
  //       }).success(function(data) {
  //         $location.path('/'+data.day.permalink)
  //       });
  //   }

  // },function(err){

  // });

};

