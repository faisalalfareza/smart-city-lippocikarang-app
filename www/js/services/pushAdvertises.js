angular
    .module('livein')
    .service('AdvertiseService', AdvertiseService)

    function AdvertiseService($http, $ionicModal, $rootScope) {
        var service = {};

        service.AdsLogin = AdsLogin;
        service.AdsOpen = AdsOpen;

        return service;

        function AdsLogin(callback) {
            var req = {
                    method: "GET",
                    cache: false,
                    url: "http://innodev.vnetcloud.com/LiveIn/api/Advertise/?action=listadvertise&pagenumber=1&pagesize=100"
                }

            var promise = $http(req)
                .success(function(response) {

                    var list = response;

                    $ionicModal.fromTemplateUrl('partials/sides/advertisePopup.html', {

                      id: 2,
                      scope: $rootScope,
                      animation: 'slide-in-up',
                      backdropClickToClose: false

                    }).then(function(advertise) {

                      $rootScope.adsModal = advertise;
                      $rootScope.$broadcast('adsModal:showModal');

                    }).finally(function() {

                      $rootScope.closeAds = function() {
                        $rootScope.$broadcast('adsModal:hideModal');
                      };

                    });

                    $rootScope.$on('adsModal:showModal', function() {
                      if(!$rootScope.adsModal) {
                        console.log('adsOpen is not yet defined');
                      } else {
                        console.log('Attempting to show adsOpen');

                        $rootScope.listAds = list;
                        $rootScope.adsModal.show();
                        $rootScope.size = "fullmodal";
                      }
                    });

                    $rootScope.$on('adsModal:hideModal', function() {
                      if(!$rootScope.adsModal) {
                        console.log('Cannot hide adsOpen');
                      } else {
                        console.log('Hiding adsOpen');
                        $rootScope.adsModal.hide();
                      }
                    });

                    $rootScope.$on('$destroy', function() {
                      console.log('Destroy adsOpen');
                      $rootScope.adsModal.remove();
                    });

                })
                .error(function(response) {
                    console.log(response);
                });
        }

        function AdsOpen(callback) {
          var req = {
            method: "GET",
            cache: false,
            url: "http://innodev.vnetcloud.com/LiveIn/api/Advertise/?action=listadvertise&pagenumber=1&pagesize=100"
          }

          var promise = $http(req)
            .success(function(response) {

              var list = response;

              $ionicModal.fromTemplateUrl('partials/sides/advertisePopup.html', {

                id: 2,
                scope: $rootScope,
                animation: 'slide-in-up',
                backdropClickToClose: false

              }).then(function(advertise) {

                $rootScope.adsModal = advertise;
                $rootScope.$broadcast('adsModal:showModal');

              }).finally(function() {

                $rootScope.closeAds = function() {
                  $rootScope.$broadcast('adsModal:hideModal');
                };

              });

              $rootScope.$on('adsModal:showModal', function() {
                if(!$rootScope.adsModal) {
                  console.log('adsOpen is not yet defined');
                } else {
                  console.log('Attempting to show adsOpen');

                  $rootScope.listAds = list;
                  $rootScope.adsModal.show();
                  $rootScope.size = "smallmodal";
                }
              });

              $rootScope.$on('adsModal:hideModal', function() {
                if(!$rootScope.adsModal) {
                  console.log('Cannot hide adsOpen');
                } else {
                  console.log('Hiding adsOpen');
                  $rootScope.adsModal.hide();
                }
              });

              $rootScope.$on('$destroy', function() {
                console.log('Destroy adsOpen');
                $rootScope.adsModal.remove();
              });

            })
            .error(function(response) {
              console.log(response);
            });
        }

    }
