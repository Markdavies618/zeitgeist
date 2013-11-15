// app.directive('autocomplete', ['$http', function($http) {
//     return function (scope, element, attrs) {


//         // element.autocomplete({
//         //     minLength:3,
//         //     source:function (request, response) {
//         //         var url = "http://localhost/words.php?keyword=" + request.term;
//         //         $http.get(url).success( function(data) {
//         //             response(data.results);
//         //         });
//         //     },
//         //     focus:function (event, ui) {
//         //         element.val(ui.item.label);
//         //         return false;
//         //     },
//         //     select:function (event, ui) {
//         //         scope.myModelId.selected = ui.item.value;
//         //         scope.$apply;
//         //         return false;
//         //     },
//         //     change:function (event, ui) {
//         //         if (ui.item === null) {
//         //             scope.myModelId.selected = null;
//         //         }
//         //     }
//         // }).data("autocomplete")._renderItem = function (ul, item) {
//         //     return $("<li></li>")
//         //         .data("item.autocomplete", item)
//         //         .append("<a>" + item.label + "</a>")
//         //         .appendTo(ul);
//         // };
//     }
// }]);
app.directive('autocomplete', function($parse, $timeout){
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
  }
})
