angular
  .module('livein')
  .controller('splashScreen', splashScreen);

  function splashScreen($scope, $timeout, $rootScope, $state, $filter, $localStorage, $location, ionicToast, $ionicPlatform, $ionicPopup, AdvertiseService) {

    // Called to navigate to the main app
    $ionicPlatform.ready(function () {

      //screen.lockOrientation('portrait');
      if (ionic.Platform.isIOS() || ionic.Platform.isAndroid()) {
          cordova.plugins.diagnostic.isLocationEnabled(function (enabled) {
          if(enabled == true){
            ionicToast.show( $filter('translate')('gps_on') , 'bottom', false, 5000);
            cordova.plugins.notification.local.schedule({
                id: 2,
                title: $filter('translate')('gps_set')
            });
          }
          if (enabled == false) {
            var confirmPopup = $ionicPopup.confirm({
              title : $filter('translate')('dialog_title_gps'),
              template : $filter('translate')('dialog_content_gps')
            });
            confirmPopup.then(function (res) {
              if (res) {
                cordova.plugins.diagnostic.switchToLocationSettings();
              } else {
                console.log('You are not sure');
              }
            });

          }
        }, function (error) {
          alert("The following error occurred: " + error);
        });
      }
    });

    $ionicPlatform.ready(function (){
      navigator.geolocation.getCurrentPosition(function (pos) { });
    });

    $scope.startApp = function () {

        $state.go('app.main');

        if($location.path("/app/main")) {
          if ($localStorage.firstOpen != null) {
            AdvertiseService.AdsOpen(); 
          }
        }
        
        return $timeout(() => angular.noop, 3000);
        
    };

    // Called each time the slide changes
    $scope.slideChanged = function (index) {
      $scope.slideIndex = index;
    };

  }
