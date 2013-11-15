'use strict';


function NewListCtrl ($rootScope, $routeParams, $scope, $http, $location, Lists, Items ) {

  $scope.list = {
    title : ''
  , name : ''
  , link : ''
  , description : ''
  , items : []
  }



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
    console.log('blah blah')
    console.log($scope.item);
  }

  $scope.addItem = function(){
    console.log('submit')
    $('#myModal').modal('hide')
    // var item = $scope.item
    // $http.post('/api/items', item).success(function(item){
    //   console.log(item);
    //   $scope.list.items.push(item)
    //   $scope.item = emptyItem
    // })

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
      $scope.items = items;
    });
  }


}