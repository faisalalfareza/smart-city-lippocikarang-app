angular
    .module('livein')
    .controller('busSchedule', busSchedule);

    function busSchedule($scope, $state, $compile, $ionDrawerVerticalDelegate, $ionicSlideBoxDelegate, $ionicLoading, $ionicPopup, $filter, $ionicPlatform, trackingVehiclesService) {

        $ionicPlatform.ready(function() {

            trackingBus();

            function trackingBus() {
       
                trackingVehiclesService.busRoute(function(response) {

                    $scope.route = response;
                    console.log($scope.route);

                    // var getStatus = $ionicPopup.alert({
                    //     title: 'Tracking in Controller',
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

                });
            }

            /*
            function trackingBus() {

                trackingVehicles.busRoute()
                    .then(function(response) {

                        var getStatus = $ionicPopup.alert({
                            title: 'Tracking in Controller',
                            template: response,
                            okText: $filter('translate')('okay'),
                            okType: "button-stable",
                            cssClass: "alertPopup"
                        });

                        getStatus.then(function(res) {
                            if (res) {
                                console.log('Successfully!');
                                console.log(response);
                            }
                        });     

                });

            }
            */

            /*
            function trackingBus() {

                console.log('GetIn!');

                var username = 'XLQQ00001';
                var password = 'AOlc@01-07';
                var soapRequest ='<x:Envelope xmlns:x="http://schemas.xmlsoap.org/soap/envelope/" xmlns:api="fleettestlive.cartrack.id/api/"><x:Header> <wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd"> <wsse:UsernameToken> <wsse:Username/> <wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText"/> </wsse:UsernameToken> </wsse:Security> </x:Header> <x:Body> <api:endpoint.get_vehicle_last_positions> <api:username>?</api:username> </api:endpoint.get_vehicle_last_positions> </x:Body> </x:Envelope>';

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
                    data: {	// JSON structure used to build request XML - SHOULD be coupled with ('namespaceQualifier' AND 'namespaceURL') AND ('method' OR 'elementName')
                        method: 'endpoint.get_vehicle_last_positions',
                        SOAPAction: 'http://fleettestlive.cartrack.id/api/#get_vehicle_last_positions'
                    },
                    data: function(SOAPObject) { // function returning an instance of the SOAPObject class
                        return new SOAPObject(soapRequest);
                    },

                    beforeSend: function(SOAPEnvelope) {
                        console.log('beforeSend!');
                        console.log(SOAPEnvelope.toString());
                    },
                    success: function (soapResponse) {
                        var result = soapResponse.toJSON();
                        alert('Success!');
                        console.log(result);
                        // do stuff with soapResponse
                        // if you want to have the response as JSON use soapResponse.toJSON();
                        // or soapResponse.toString() to get XML string
                        // or soapResponse.toXML() to get XML DOM
                    },
                    error: function (SOAPResponse) {
                        // show error
                        alert('Failed!');
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
            */
            
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
  

        loadMap();

        function loadMap() {

            trackingVehiclesFactory.busRoute()
                .then(function(response) {

                var getStatus = $ionicPopup.alert({
                    template: response,
                    okText: $filter('translate')('okay'),
                    okType: "button-stable",
                    cssClass: "alertPopup"
                });

                getStatus.then(function(res) {
                    if (res) {
                        console.log('Successfully!');
                        console.log(response);
                    }
                });     

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

                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                        infowindow.setContent(locations[i][0]);
                        infowindow.open(map, marker);
                    }
                })(marker, i));
            }

        }        

        // $scope.loadMap = function() {

        //     var mapOptions = {
        //         center: new google.maps.LatLng(43.074174, -89.380915),
        //         styles: [{ featureType: "all", stylers: [{ saturation: -75 }] }],
        //         mapTypeId: google.maps.MapTypeId.ROADMAP,
        //         mapTypeControlOptions: { position: google.maps.ControlPosition.TOP_CENTER },
        //         zoom: 18,
        //         zoomControl: true,
        //         mapTypeControl: false,
        //         streetViewControl: false,
        //         zoomControlOptions: {
        //             position: google.maps.ControlPosition.RIGHT_BOTTOM,
        //             style: google.maps.ZoomControlStyle.SMALL
        //         }
        //     };

        //     var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        //     navigator.geolocation.getCurrentPosition(function(pos) {
        //         map.setCenter(new google.maps.LatLng(-6.3075372, 107.1695603));
        //         var myLocation = new google.maps.Marker({
        //             position: new google.maps.LatLng(-6.3075372, 107.1695603),
        //             map: map,
        //             title: $filter('translate')('my_location')
        //         });
        //         infowindow.setContent('Lippocikarang');
        //         infowindow.open(map, myLocation);
        //         $scope.curentloc = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        //     });
        //     $scope.map = map;
        // }

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