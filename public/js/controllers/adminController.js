'use strict';



function NewListCtrl ($rootScope, $routeParams, $scope, $http, $location, Lists, Items ) {


  $rootScope.list = emptyList()


  var emptyItem = {
    'artist'  : '',
    'name'    : '',
    'artwork' : '',
    'itunes'  : '',
    'spotify' : '',
    'amazon'  : '',
    'rdio'    : '',
  }

  $scope.item = emptyItem



  $scope.showAddItem = function(){
    console.log('add')

  }

  $scope.createList = function(){
    $http.post('/api/lists', $rootScope.list).success(function(list){
      // console.log(''list);
      $rootScope.list = emptyList()
      console.log($rootScope.list);
    })
  }

  $scope.addItem = function(){
    $('#myModal').modal('hide')
    var item = $scope.item
    $http.post('/api/items', item).success(function(item){
      console.log(item);
      $rootScope.list.items.push(item)
      $scope.item = emptyItem
    })

  }
 

  $scope.selectedCountry = null;
  $scope.items = {};
  $scope.mockSearchFlight = function() {
      $scope.countries= {
        'Zurich': 'Switzerland',
        'Canada': 'Vancouver'
      }
  }
  $scope.searchItems = function(term) {
    Items.searchItems(term).then(function(items){
      console.log('items',items);
      $scope.items = items;
    });
  }


}


function emptyList(){
  return {
    title : ''
  , name : ''
  , link : ''
  , description : ''
  , items : []
  }

}