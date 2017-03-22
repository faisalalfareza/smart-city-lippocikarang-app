angular
    .module('livein')
    .service('AdvertiseService', AdvertiseService);

    function AdvertiseService($http, $timeout, $ionicModal,$window, $rootScope, $localStorage, $filter) {
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

                      id: 1,
                      scope: $rootScope,
                      animation: 'slide-in-up',
                      backdropClickToClose: false

                    }).then(function(loginAds) {

                      $rootScope.adsLogin = loginAds;
                      $rootScope.$broadcast('adsLogin:showModal');

                    }).finally(function() {         

                      $rootScope.closeAds = function() {
                        $rootScope.$broadcast('adsLogin:hideModal');
                      };

                    });

                    $rootScope.$on('adsLogin:showModal', function() {
                      if(!$rootScope.adsLogin) {
                        console.log('adsLogin is not yet defined');
                      } else {
                        console.log('Attempting to show adsLogin');

                        $rootScope.listAds = list;
                        $rootScope.adsLogin.show();
                        $rootScope.size = "fullmodal";
                      }
                    });

                    $rootScope.$on('adsLogin:hideModal', function() {
                      if(!$rootScope.adsLogin) {
                        console.log('Cannot hide adsLogin');
                      } else {
                        console.log('Hiding adsLogin');
                        $rootScope.adsLogin.hide();
                      }
                    });

                    $rootScope.$on('$destroy', function() {
                      console.log('Destroy adsLogin');
                      $rootScope.adsLogin.remove();
                    });  
                })
                .error(function(response) {
                    console.log(response);
                });
        }    

        //advertise when app is open
        function AdsOpen(active) {
          var req = {
            method: "GET",
            url: $filter('translate')('apilink') + "api/Advertise/?action=listadvertise&pagenumber=1&pagesize=100"
          }

          $http(req)
            .success(function(response) {
              smallAds(response,active);
            })
            .error(function(response) {
              console.log(response);
            });
        }       

        //templates for small advertise
        function smallAds(result,active) {
            var indexes = active;
            var list = result;

            $ionicModal.fromTemplateUrl('partials/sides/advertisePopup.html', {

              id: 3,
              scope: $rootScope,
              animation: 'slide-in-up',
              backdropClickToClose: false

            }).then(function(advertise) {

              $rootScope.adsModal = advertise;
              $rootScope.$broadcast('adsModal:showModal');
              $rootScope.activeAds = indexes;

            }).finally(function() {

              $rootScope.getFull = function() {
                  $rootScope.$broadcast('adsModal:hideModal');
                  fullAds(indexes);
              };

              $rootScope.slideChanged = function(index) {
                  $rootScope.slideIndex = index;
                  $rootScope.getFull = function() {
                    // var screen = angular.element(document.querySelector('.itemModal.advertisement'));
                    // screen.css('height', '100%');
                    // console.log('open fullAds : ' + index);
                    $rootScope.$broadcast('adsModal:hideModal'); 
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

        function fullAds(active) {
            
            var indexes = active;
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

                    }).then(function(dynamicFull) {

                      $rootScope.fullDynamic = dynamicFull;
                      $rootScope.$broadcast('fullDynamic:showModal');
                      $rootScope.activeAds = indexes;

                    }).finally(function() {         

                      $rootScope.closeAds = function() {
                          // console.log('close fullAds : ' + indexes);
                          $rootScope.$broadcast('fullDynamic:hideModal');
                          AdsOpen(indexes);
                      };

                      $rootScope.slideChanged = function(index) {
                        $rootScope.slideIndex = index;
                        $rootScope.closeAds = function() {
                          $rootScope.$broadcast('fullDynamic:hideModal');
                          AdsOpen(index);
                        };
                      }

                    });

                    $rootScope.$on('fullDynamic:showModal', function() {
                      if(!$rootScope.fullDynamic) {
                        console.log('fullDynamic is not yet defined');
                      } else {
                        console.log('Attempting to show fullDynamic');

                        $rootScope.listAds = list;
                        $rootScope.fullDynamic.show();
                        $rootScope.size = "dynamicmodal";
                      }
                    });

                    $rootScope.$on('fullDynamic:hideModal', function() {
                      if(!$rootScope.fullDynamic) {
                        console.log('Cannot hide fullDynamic');
                      } else {
                        console.log('Hiding fullDynamic');
                        $rootScope.fullDynamic.hide();
                      }
                    });

                    $rootScope.$on('$destroy', function() {
                      console.log('Destroy fullDynamic');
                      $rootScope.fullDynamic.remove();
                    });  
                })
                .error(function(response) {
                    console.log(response);
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
                    // console.log('Ads response : ' + response.length);
                    // console.log('Ads localstr : ' + $localStorage.adsBefore.sum);
                    var count = response.length - $localStorage.adsBefore.sum;
                    // console.log('Ads count : ' + count);

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
