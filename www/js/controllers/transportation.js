angular
    .module('livein')
    .controller('busSchedule', busSchedule);

    function busSchedule($scope, $state, $compile, $ionDrawerVerticalDelegate, $ionicSlideBoxDelegate, $ionicLoading, $ionicPopup, $filter, $ionicPlatform, trackingVehicles) {

        $ionicPlatform.ready(function() {

            trackingBus();

            function trackingBus() {

                console.log('GetIn!');

                var username = 'XLQQ00001';
                var password = 'AOlc@01-07';
                var sr = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><ns:return xmlns:ns="http://localhost/"><ns:</soap:Body></soap:Envelope>';

                $.soap({
                    url: 'http://fleettestlive.cartrack.id/api/index.php?wsdl',
                    namespaceQualifier: 'busService',
                    namespaceURL: 'http://fleettestlive.cartrack.id/api/',  
                    noPrefix: false,                  
                    method: 'endpoint.get_vehicle_last_positions',
                    appendMethodToURL: false,				
                    SOAPAction: 'http://fleettestlive.cartrack.id/api/#get_vehicle_last_positions',		
                    soap12: false,

                    HTTPHeaders: {
                        type: 'POST',
                        Authorization: 'Basic ' + btoa(username + ':' + password),
                        Origin: '*'
                        // Authorization: 'Basic WExRUTAwMDAxOkFPbGNAMDEtMDc='
                    },

                    beforeSend: function(SOAPEnvelope) {
                        console.log(SOAPEnvelope.toString());
                    },
                    success: function (soapResponse) {
                        var result = soapResponse.toJSON();
                        console.log('Success!');
                        console.log(result);
                        // do stuff with soapResponse
                        // if you want to have the response as JSON use soapResponse.toJSON();
                        // or soapResponse.toString() to get XML string
                        // or soapResponse.toXML() to get XML DOM
                    },
                    error: function (SOAPResponse) {
                        // show error
                        console.log('Failed!');
                    },
                    statusCode: {									
                        404: function() {
                            console.log('404 Not Found')
                        },
                        200: function() {
                            console.log('200 OK')
                        }
                    },

                    enableLogging: true

                });

            }
            
        });

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

        $scope.loadMap = function() {

            var mapOptions = {
                center: new google.maps.LatLng(43.074174, -89.380915),
                styles: [{ featureType: "all", stylers: [{ saturation: -75 }] }],
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControlOptions: { position: google.maps.ControlPosition.TOP_CENTER },
                zoom: 18,
                zoomControl: true,
                mapTypeControl: false,
                streetViewControl: false,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_BOTTOM,
                    style: google.maps.ZoomControlStyle.SMALL
                }
            };

            var map = new google.maps.Map(document.getElementById("map"), mapOptions);

            navigator.geolocation.getCurrentPosition(function(pos) {
                map.setCenter(new google.maps.LatLng(-6.3075372, 107.1695603));
                var myLocation = new google.maps.Marker({
                    position: new google.maps.LatLng(-6.3075372, 107.1695603),
                    map: map,
                    title: $filter('translate')('my_location')
                });
                infowindow.setContent('Lippocikarang');
                infowindow.open(map, myLocation);
                $scope.curentloc = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            });
            $scope.map = map;
        }

        $scope.$on('$ionicView.enter', function() {

            if (window.google) {
                if (window.google.maps) {
                    if ($scope.map === undefined) {
                        $scope.loadMap();
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