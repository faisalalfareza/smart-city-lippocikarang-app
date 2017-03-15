'use strict';

angular.module('clickAndWait', []).directive('clickAndWait', function () {
  return {
    restrict: 'A',
    scope: {
      startApp: '&clickAndWait'
    },
    link: function link(scope, element) {
      element.bind('click', function () {
        element.prop('disabled', true);
        scope.$apply(function () {

          // GetStarted on SplashScreen
          scope.startApp().finally(function () {
            element.prop('disabled', false);
          });
          
        });
      });
    }
  };
});