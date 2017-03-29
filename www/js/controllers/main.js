angular
    .module('livein')
    .controller('app', app)
    .controller('main', main)
    .controller('currencymain', currencymain)
    .controller('weather', weather);

    function app($scope, $filter, $cordovaGeolocation, mainService, PushNotificationService, $location, $rootScope, $state, LoginService, $localStorage, $ionicPopup, $ionicLoading, $cordovaAppAvailability) {

        $scope.afliates_sos = isSOS;

        //drawer - side menu
        $scope.showPrivillage, $scope.subEntertaiment, $scope.subDining, $scope.subAccomodation, $scope.subShopping, $scope.subTransportation, $scope.subPublicServ, $scope.subHelp, $scope.subResident, $scope.subInformation = false;

        $scope.fullname = $localStorage.currentUser.data[0].fullname;
        $localStorage.currentUser.data[0].privilege == 'resident' ? $scope.showPrivillage = true : $scope.showPrivillage = false;

        $scope.showEntertaiment = function() {
            $scope.subEntertaiment == true ? $scope.subEntertaiment = false : $scope.subEntertaiment = true;
            $scope.subDining = false;
            $scope.subAccomodation = false;
            $scope.subShopping = false;
            $scope.subTransportation = false;
            $scope.subPublicServ = false;
            $scope.subHelp = false;
            $scope.subResident = false;
            $scope.subInformation = false;
        };
        $scope.showDining = function() {
            $scope.subDining == true ? $scope.subDining = false : $scope.subDining = true;
            $scope.subEntertaiment = false;
            $scope.subAccomodation = false;
            $scope.subShopping = false;
            $scope.subTransportation = false;
            $scope.subPublicServ = false;
            $scope.subHelp = false;
            $scope.subResident = false;
            $scope.subInformation = false;
        };
        $scope.showAccomodation = function() {
            $scope.subAccomodation == true ? $scope.subAccomodation = false : $scope.subAccomodation = true;
            $scope.subEntertaiment = false;
            $scope.subDining = false;
            $scope.subShopping = false;
            $scope.subTransportation = false;
            $scope.subPublicServ = false;
            $scope.subHelp = false;
            $scope.subResident = false;
            $scope.subInformation = false;
        };
        $scope.showShopping = function() {
            $scope.subShopping == true ? $scope.subShopping = false : $scope.subShopping = true;
            $scope.subEntertaiment = false;
            $scope.subDining = false;
            $scope.subAccomodation = false;
            $scope.subTransportation = false;
            $scope.subPublicServ = false;
            $scope.subHelp = false;
            $scope.subResident = false;
            $scope.subInformation = false;
        };
        $scope.showTransportation = function() {
            $scope.subTransportation == true ? $scope.subTransportation = false : $scope.subTransportation = true;
            $scope.subEntertaiment = false;
            $scope.subDining = false;
            $scope.subAccomodation = false;
            $scope.subShopping = false;
            $scope.subPublicServ = false;
            $scope.subHelp = false;
            $scope.subResident = false;
            $scope.subInformation = false;
        };
        $scope.showPublicServ = function() {
            $scope.subPublicServ == true ? $scope.subPublicServ = false : $scope.subPublicServ = true;
            $scope.subEntertaiment = false;
            $scope.subDining = false;
            $scope.subAccomodation = false;
            $scope.subShopping = false;
            $scope.subTransportation = false;
            $scope.subHelp = false;
            $scope.subResident = false;
            $scope.subInformation = false;
        };
        $scope.showHelp = function() {
            $scope.subHelp == true ? $scope.subHelp = false : $scope.subHelp = true;
            $scope.subEntertaiment = false;
            $scope.subDining = false;
            $scope.subAccomodation = false;
            $scope.subShopping = false;
            $scope.subTransportation = false;
            $scope.subPublicServ = false;
            $scope.subResident = false;
            $scope.subInformation = false;
        };
        $scope.showInformation = function() {
            $scope.subInformation == true ? $scope.subInformation = false : $scope.subInformation = true;
            $scope.subEntertaiment = false;
            $scope.subDining = false;
            $scope.subAccomodation = false;
            $scope.subShopping = false;
            $scope.subTransportation = false;
            $scope.subPublicServ = false;
            $scope.subHelp = false;
            $scope.subResident = false;
        };
        $scope.showResident = function() {
            $scope.subResident == true ? $scope.subResident = false : $scope.subResident = true;
            $scope.subEntertaiment = false;
            $scope.subDining = false;
            $scope.subAccomodation = false;
            $scope.subShopping = false;
            $scope.subTransportation = false;
            $scope.subPublicServ = false;
            $scope.subHelp = false;
            $scope.subInformation = false;
        };
        $scope.showTrain = function() {
            $ionicLoading.show({
                template: $filter('translate')('train'),
                duration: 2000
            });
        }

        //search
        $scope.navbar = true;
        $scope.searchbar = false;

        $scope.searchbarAct = function() {
            $scope.navbar = false;
            $scope.searchbar = true;
        };

        $scope.navbarAct = function() {
            $scope.navbar = true;
            $scope.searchbar = false;
            $rootScope.search_page = "";
        };

        $scope.$on("$ionicView.beforeEnter", function() {
            if ($location.path().substr(0, 11) == "/app/search" || $location.path().substr(0, 19) == "/app/propertysearch" ||
                $location.path() == "/app/history" ||
                $location.path().substr(0, 14) == "/app/myhistory" ||
                $location.path() == "/app/profile" ||
                $location.path() == "/app/map" ||
                $location.path() == "/app/more" ||
                $location.path() == "/app/editprofile" ||
                $location.path() == "/app/listbookmark" ||
                $location.path() == "/app/iniviteFriend" ||
                $location.path() == "/app/aboutUs" ||
                $location.path() == "/app/aboutHelp" ||
                $location.path() == "/app/callCenter" ||
                $location.path() == "/app/worldclock" ||
                $location.path() == "/app/helpfulNumber" ||
                $location.path() == "/app/loginbilling") {
                $scope.navbar = false;
                $scope.searchbar = false;
            } else {
                $scope.navbar = true;
                $scope.searchbar = false;
                $rootScope.search_page = "";
            }
        });

        //goto currency
        $scope.gotocurrency = function() {
            $location.path('app/currency')
        }

        $scope.gotoyoutbe = function() {
            window.open("https://www.youtube.com/watch?v=h-DvHNnlFrs", '_system', 'location=yes')
        }

        function isSOS() {

            // convenience method for determining the platform:
            function isIOS() {
                return device.platform === "iOS";
            }  

            // this function invokes the plugin:
            function checkAppAvailability(identifier) {
                appAvailability.check(
                    'sos1health://',
                    function() { gotoApps(); }, // succes handler
                    function() { gotoAppStore(); } // error handler
                )
            }

            // examples of a few well known apps  (wait for 'deviceready' to fire as usual):
            checkAppAvailability(isIOS() ? "sos1health://"  : "com.app.onehealth");

            function gotoApps() {
                window.open('sos1health://', '_system', 'location=no');
                console.log('Ambulance Siloam 1health Installed');               
            }

            function gotoAppStore() {
                console.log('Ambulance Siloam 1health Not Installed');
                
                // Error callback
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Ambulance Siloam 1health not installed',
                    template: 'Do You want to download Ambulance Siloam 1health mobile apps',
                    okText: $filter('translate')('yes'),
                    cancelText: $filter('translate')('no'),
                    okType: "button-stable"
                });

                confirmPopup.then(function(res) {
                    if(res) {
                        window.open('https://itunes.apple.com/id/app/ambulance-siloam-1health/id1126512880?mt=8', '_system', 'location=no');
                    } else {
                        console.log('You are not sure');
                    }
                });
            }            

        }   

    }

    function weather($scope, $cordovaGeolocation, $filter, $localStorage, mainService) {
        navigator.geolocation.getCurrentPosition(function(pos) {
            lat = pos.coords.latitude
            long = pos.coords.longitude
            weatherservice($scope, $filter, lat, long)
        },function(error){
            navigator.geolocation.watchPosition
                (function onSucces(position){

                },function onMapError(error){

                }, 
                { enableHighAccuracy: false });
        });

        function weatherservice($scope, $filter, lat, long) {
            mainService.reqweather(lat, long, function(weatherresponse) {

                if (weatherresponse != false) {
                    $scope.data_weather = {
                        temp: parseInt(weatherresponse.main.temp - 273.15),
                        icon: parseInt($filter('filter')(weatherresponse.weather, function(d) {
                            return d.id
                        })[0].id / 100)
                    }
                } else {
                    console.log(error.message);
                }

            });

            function geticonweather(dt, id, sunrise, sunset) {
                if (id == 800) {
                    if (dt >= sunrise && dt < sunset) {
                        icon = '&#xf00d;'
                    } else {
                        icon = '&#xf02e;'
                    }
                } else {
                    switch (id) {
                        case 200:
                            icon = '&#xf01e;';
                            break;
                        case 300:
                            icon = '&#xf01c;';
                            break;
                        case 500:
                            icon = '&#xf019;';
                            break;
                        case 600:
                            icon = '&#xf01b;';
                            break;
                        case 700:
                            icon = '&#xf0b6;';
                            break;
                        case 800:
                            icon = '&#xf013;';
                            break;
                    }
                }

                return icon;
            }

        }

    }

    function currencymain($scope, $localStorage) {
        try {
            $scope.currate = $localStorage.currency.currency;
        } catch (e) {
            $scope.currate = null;

        }
    }

    function main($scope, $filter) {
        $scope.title = $filter('translate')('app_name');
    }

