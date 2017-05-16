angular
    .module('livein')
    .controller('busSchedule', busSchedule);

    function busSchedule($scope, $state, $compile, $ionDrawerVerticalDelegate, $ionicSlideBoxDelegate, $ionicLoading, $ionicPopup, $filter, $ionicPlatform, trackingVehiclesFactory) {

        $scope.daily = 'active';

        //  marker
        var infowindow = new google.maps.InfoWindow;

        //ion Drawer Vertical Delegate
        $scope.toggleDrawer = function(handle) {
            $ionDrawerVerticalDelegate.$getByHandle(handle).toggleDrawer();
        }
        $scope.drawerIs = function(state) {
            return $ionDrawerVerticalDelegate.getState() == state;
        }

        //ionic SlideBox Delegate
        $scope.next = function() {
            $ionicSlideBoxDelegate.next();
            $scope.weekend = 'active';
            $scope.daily = '';
        };
        $scope.previous = function() {
            $ionicSlideBoxDelegate.previous();
            $scope.daily = 'active';
            $scope.weekend = '';
        };
        // Called each time the slide changes
        $scope.slideChanged = function(index) {
            $scope.slideIndex = index;
            if ($scope.slideIndex == 1) {
                $scope.weekend = 'active';
                $scope.daily = '';
            } else {
                $scope.daily = 'active';
                $scope.weekend = '';
            }
        };        
        
        function loadMap() {

            trackingVehiclesFactory.busRoute(function(response) {

                console.log("Controlla");
                console.log(response);

                // var getStatus = $ionicPopup.alert({
                //     template: response,
                //     okText: $filter('translate')('okay'),
                //     okType: "button-stable",
                //     cssClass: "alertPopup"
                // });

                // getStatus.then(function(res) {
                //     if (res) {
                //         console.log('Successfully!');
                //         console.log(response);
                //     }
                // });   

                var locations = [
                    ['<center><strong>AOLC01</strong> <br> Jalan Mohammad Husni Thamrin, Serang, Bekasi, Jawa Barat, Indonesia</center>', -6.3387851, 107.1285249, 4],
                    ['<center><strong>AOLC02</strong> <br> Jalan Tol Jakarta - Cikampek, Jakarta Timur, DKI Jakarta, Indonesia</center>', -6.3395528, 107.1109656, 5],
                    ['<center><strong>AOLC03</strong> <br> Jalan Jenderal Sudirman, Tanah Abang, Jakarta Pusat, DKI Jakarta, Indonesia</center>', -6.3359905, 107.1380942, 3],
                    ['<center><strong>AOLC04</strong> <br> Kebayoran Baru, Jakarta Selatan, DKI Jakarta, Indonesia</center>', -6.3356287, 107.12469867, 2],
                    ['<center><strong>AOLC05</strong> <br> Jalan Tol Jakarta - Cikampek, Cibitung, Bekasi, Jawa Barat, Indonesia</center>', -6.3339542, 107.1328349, 1]
                ];
        
                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 13,
                    center: new google.maps.LatLng(locations[3][1], locations[3][2]), //-6.3356287, 107.12469867
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });

                var infowindow = new google.maps.InfoWindow();

                var marker, i;

                var icon = {
                    url: "img/ic_destination.png", // url
                    scaledSize: new google.maps.Size(40, 40), // scaled size
                    origin: new google.maps.Point(0,0), // origin
                    anchor: new google.maps.Point(0, 0) // anchor
                };

                for (i = 0; i < locations.length; i++) { 
                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                        animation: google.maps.Animation.DROP,
                        align: 'center',
                        icon: icon,
                        map: map
                    });

                    google.maps.event.addListener(marker, 'click', (function(marker, i) {
                        return function() {
                            infowindow.setContent(locations[i][0]);
                            infowindow.open(map, marker);
                        }
                    })(marker, i));
                }

            }); // End Get List Bus
        } // End Load Map Function        

        $scope.$on('$ionicView.enter', function() {

            if (window.google) {
                if (window.google.maps) {
                    if ($scope.map === undefined) {
                        loadMap();
                    }
                } else {
                    $scope.loadGMapsbus(); //then load the map
                }
            } else {
                console.log("google isn't...");
                $scope.loadGLoaderbus(); //then load maps, then load the map
            }
        });

        $scope.loadGLoaderbus = function() {
            if (!window.google || !window.google.loader) {
                console.log("loading gloader");
                $http.get("http://maps.googleapis.com/maps/api/js?key=AIzaSyAZ4939bfDLme2qmuIsfwg-ilYmsG3CeBw&libraries=places")
                    .success(function(json) {
                        var scriptElem = document.createElement('script');
                        document.getElementsByTagName('head')[0].appendChild(scriptElem);
                        scriptElem.text = json;
                        locations.loadGMaps();
                    });
            } else {
                if (!window.google.maps || !window.google.maps) {
                    console.log("no gmaps");
                    $rootScope.loadGMapsbus();
                }
            }
        };
        $scope.loadGMapsbus = function() {
            if (window.google && window.google.loader && window.google.maps === undefined) {
                console.log("loading gmaps");
                try {
                    google.load("maps", "3.21", {
                        callback: mappingCallback,
                        other_params: "libraries=geometry&sensor=true&language=en"
                    });
                } catch (e) {}
            }
        };

    }