app.directive("embedvideo", function ($compile) {
  return {

      restrict: "E",
      scope: {              // set up directive's isolated scope
        value: "@",          // name var passed by value (string, one-way)
      },
      link: function (scope, element, attrs) {
        // console.log('scope', scope.value);
          attrs.$observe("value", function (newValue) {
            console.log(newValue);
              // element.text(newValue);
              var el = angular.element(newValue),
              compiled = $compile(el);
              element.append(el);
              compiled(scope)
          });
      }
  };
})