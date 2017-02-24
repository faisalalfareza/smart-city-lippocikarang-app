angular
    .module('livein')
    .service('AdvertiseService', AdvertiseService);

    function AdvertiseService($http, $ionicModal,$window, $rootScope, $localStorage, $filter) {
        var service = {};

        service.AdsLogin = AdsLogin;
        service.AdsOpen = AdsOpen;
        service.AdsWhenNew = AdsWhenNew;

        return service;

        //advertise when user success login
        function AdsLogin() {
            var req = {
                    method: "GET",
                    url: $filter('translate')('apilink') + "api/Advertise/?action=listadvertise&pagenumber=1&pagesize=100"
                }

            $http(req)
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

        function fullAds(index) {

            var indexes = index;
            var req = {
                    method: "GET",
                    url: $filter('translate')('apilink') + "api/Advertise/?action=listadvertise&pagenumber=1&pagesize=100"
                }

            $http(req)
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

                      $rootScope.getFull = function() {
                        $rootScope.size = "dynamicmodal";
                        console.log('index : ' + indexes);
                      };

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

        //advertise when app is open
        function AdsOpen(callback) {
          var req = {
            method: "GET",
            url: $filter('translate')('apilink') + "api/Advertise/?action=listadvertise&pagenumber=1&pagesize=100"
          }

          $http(req)
            .success(function(response) {
              smallAds(response);
            })
            .error(function(response) {
              console.log(response);
            });
        }       

        //templates for small advertise
        function smallAds(result) {
            var list = result;

            $ionicModal.fromTemplateUrl('partials/sides/advertisePopup.html', {

              id: 2,
              scope: $rootScope,
              animation: 'slide-in-up',
              backdropClickToClose: false

            }).then(function(advertise) {

              $rootScope.adsModal = advertise;
              $rootScope.$broadcast('adsModal:showModal');

            }).finally(function() {

              $rootScope.slideChanged = function(index) {
                  $rootScope.slideIndex = index;
                  $rootScope.getFull = function() {
                    // var screen = angular.element(document.querySelector('.itemModal.advertisement'));
                    // screen.css('height', '100%');
                    fullAds(index);
                  };
              };

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
        }

        //advertise display when has the new advertise
        function AdsWhenNew(callback) {
          var req = {
            method: "GET",
            url: $filter('translate')('apilink') + "api/Advertise/?action=listadvertise&pagenumber=1&pagesize=100"
          }

          $http(req)
            .success(function(response) {
                if ($localStorage.adsBefore != null) {
                    console.log('Ads response : ' + response.length);
                    console.log('Ads localstr : ' + $localStorage.adsBefore.sum);
                    var count = response.length - $localStorage.adsBefore.sum;
                    console.log('Ads count : ' + count);

                    $localStorage.adsBefore = { sum : response.length };
                    callback(count);
                }
                else {
                    $localStorage.adsBefore = { sum : response.length };
                }
            })
            .error(function(response) {
              callback(response);
            });
        }         

    }
