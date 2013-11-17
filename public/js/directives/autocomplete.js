
app.directive('autocomplete', function($parse, $timeout, $rootScope, $http){
  var DELAY_TIME_BEFORE_POSTING = 0;
  return function(scope, elem, attrs) {
    
    var element = angular.element(elem)[0];
    var currentTimeout = null;
   
    element.oninput = function() {
      var model = $parse(attrs.postFunction);
      var poster = model(scope);
      if(currentTimeout) {
        $timeout.cancel(currentTimeout)
      }
      currentTimeout = $timeout(function(){
        poster(angular.element(element).val());
      }, DELAY_TIME_BEFORE_POSTING)
    }

    element.onblur = function() {
      // console.log(angular.element(element).val());
      var name = angular.element(element).val()
      $http.get('/api/items/artist?artist='+ name).success(function(item){
        console.log(item);
        $rootScope.list.items.push(item)
        angular.element(element).val('')
        // $scope.item = emptyItem
      })
      // var model = $parse(attrs.postFunction);
      // var poster = model(scope);
      // // console.log(model);
      // if(currentTimeout) {
      //   $timeout.cancel(currentTimeout)
      // }
      // currentTimeout = $timeout(function(){
      //   poster(angular.element(element).val());
      // }, DELAY_TIME_BEFORE_POSTING)
    }

      // var model = $parse(attrs.postFunction);
      // scope.$watch(model, function(value) {
      //   console.log('value=',value);
      //   if(value === true) { 
      //     $timeout(function() {
      //       element[0].focus(); 
      //     });
      //   }
      // });
      // to address @blesh's comment, set attribute value to 'false'
      // on blur event:
      // element.bind('blur', function() {
      //    console.log('blur');
      //    scope.$apply(model.assign(scope, false));
      // });
  }
})
