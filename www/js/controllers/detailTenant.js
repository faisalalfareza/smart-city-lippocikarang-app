angular
    .module('livein')
    .controller('sportDetail', entertaimentSportDetail)
    .controller('tenantMap', tenantMap)
    .controller('sportDetailImage', entertaimentSportDetailImage);

    function entertaimentSportDetail($scope, $timeout, $ionicHistory, $rootScope, $cordovaGeolocation, $stateParams, $ionicPopup, $location, $ionicLoading, $localStorage, $state, TenantService, TenantServiceA, $filter) {
        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            viewData.enableBack = true;
        });

        $scope.MapClick = gotoMap;
        $scope.Bookmark = setbookmark;
        $scope.myGoBack = function() {
            $ionicHistory.goBack();
        };

        TenantService.retriveGetTenant($stateParams.idtenant, function(response) {
            if (response != false) {
                
                angular.forEach(response.detail, function(value, key) {
                    $scope.tenantdata = value;
                });

            } else {
                $scope.data = { name: $filter('translate')('failed_get_data') };
            }

            //rate tenant
            $scope.rateValue = $scope.tenantdata.rating;
            
            $scope.categorytenant = texcategory($scope.tenantdata.idcategory);
            $scope.tenantname = $scope.tenantdata.name;
            //console.log($scope.categorytenant);
        });

        var posOptions = { timeout: 10000, enableHighAccuracy: true };
        $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
            $rootScope.lat = position.coords.latitude
            $rootScope.long = position.coords.longitude
            //console.log('lat :' + $rootScope.lat + '  long: ' + $rootScope.long);

            //set to service
            $scope.distance = calculatdistance(lat, long);
            //console.log($scope.distance);
        });

        function calculatdistance(lat, long) {

            datalonglat1 = $scope.tenantdata.longlat.replace('(', '');
            datalonglat2 = datalonglat1.replace(')', '');
            lattenant = (datalonglat2.split(',')[0]);
            longtenant = (datalonglat2.split(',')[1]);


            var R = 6371; // Radius of the earth in km
            var dLat = deg2rad($rootScope.lat - lattenant); // deg2rad below
            var dLon = deg2rad($rootScope.long - longtenant);
            var a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(deg2rad(lat)) * Math.cos(deg2rad(lattenant)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c; // Distance in km

            //console.log(d);
            return d;

        }

        function deg2rad(deg) {
            return deg * (Math.PI / 180)
        }

        //goto map
        function gotoMap(longlat) {

            datalonglat1 = longlat.replace('(', '');
            datalonglat2 = datalonglat1.replace(')', '');

            $rootScope.lattenant = (datalonglat2.split(',')[0]);
            $rootScope.longtenant = (datalonglat2.split(',')[1]);
            $rootScope.nametenant = $scope.tenantname;
            $state.go('app.tenantMap');

        };

        //function set bookamark
        function setbookmark() {
            $ionicLoading.show({ template: $filter('translate')('loading') + "..." });
            TenantServiceA.bookmarkTenant(
                $scope.tenantdata.idtenant,
                $scope.fullname = $localStorage.currentUser.data[0].idaccount,
                function(response) {
                    $timeout(function(){
                    if (response != false) {

                        if (response[0].status == true) {
                            //$ionicLoading.show({ template: $filter('translate')('bookmarked'), duration: 10000 });
                            //alert( $filter('translate')('bookmarked'));
                            var alertPopup = $ionicPopup.alert({
                                //title: 'Don\'t eat that!',
                                template: $filter('translate')('bookmarked'), 
                                okType: "button-stable",
                                cssClass: "alertPopup",
                                duration: 10000
                            });

                        } else {
                            var alertPopup = $ionicPopup.alert({
                                //title: 'Don\'t eat that!',
                                template: $filter('translate')('all_bookmarked'), 
                                okType: "button-stable",
                                cssClass: "alertPopup",
                                duration: 10000
                            });
                        }
                        $ionicLoading.hide();

                    } else {
                        $ionicLoading.show({
                            template: $filter('translate')('post_rating_success'),
                            duration: 10000
                        });
                    }
                    $ionicLoading.hide();
                    
                },1000);
                });

        }

        $scope.reviewClick = function(urlview) {
            if (urlview != null) {

                window.open(urlview, '_system', 'location=yes')

            } else {
                var alertPopup = $ionicPopup.alert({
                    title: $filter('translate')('action_review') + ' Tenant',
                    template: $filter('translate')('no_review_tenant'),
                    okType: "button-stable",
                    cssClass: "alertPopup"
                });

            }

        }

        TenantService.retriveGetTenantImage($stateParams.idtenant, function(response) {
            if (response != false) {
                $scope.results = [];

                $scope.img = [];
                $scope.img1 = [];
                $scope.img2 = [];

                $scope.gallery = response;

                var a = 0;
                angular.forEach($scope.gallery, function(obj) {
                    var b = a++;
                    var images = $scope.gallery;
                    var img = images[b];
                    var ll = img.idtenant;

                    if (ll == $stateParams.idtenant) {
                        $scope.results.push(images[b]);
                        $scope.img = $scope.results[0];
                        $scope.img1 = $scope.results[1];
                        $scope.img2 = $scope.results[2];
                        //console.log($scope.img.avatar);
                    }
                })

            } else {
                $.data = { name: $filter('translate')('failed_get_data') };
            }

        });

        $scope.$on('$ionicView.beforeLeave', function() {
            if ($scope.rating != null || $scope.rating != undefined) {
                var confirmPopup = $ionicPopup.confirm({
                    title: $filter('translate')('rate_title'),
                    template: $filter('translate')('rate_dialog'),
                    okText: $filter('translate')('yes'),
                    cancelText: $filter('translate')('no'),
                    okType: "button-stable"
                });
                confirmPopup.then(function(res) {
                    if (res) {
                        rateTenantService();
                    } else {
                        //console.log('You are not sure');
                    }
                });
            }
        });

        function rateTenantService() {

            $ionicLoading.show({ template: $filter('translate')('loading') + "..." });
            TenantServiceA.rateTenant(
                $stateParams.idtenant,
                $localStorage.currentUser.data[0].idaccount,
                $scope.rating,
                function(response) {
                    if (response != false) {
                        $ionicLoading.show({
                            template: $filter('translate')('post_rating_success'),
                            duration: 3000
                        });
                    } else {
                        $ionicLoading.show({
                            template: $filter('translate')('post_rating_success'),
                            duration: 3000
                        });
                        $location.path('/rate');
                    }
                    $ionicLoading.hide();
                });
        };

        $scope.inputrate = function(rate) {

            if ($localStorage.currentUser != null) {
                $scope.rating = rate;
            } else {
                var getStatus = $ionicPopup.alert({
                    template: 'Sorry, you are not logged in. Please login from Profile to use this feature.',
                    okText: $filter('translate')('okay'),
                    okType: "button-stable",
                    cssClass: "alertPopup"
                });
            }

        }

        function texcategory(idcategory) {

            if (angular.equals(idcategory, "16")) {
                parent_category = $filter('translate')('entertaiment');
                child_category = $filter('translate')('events');
            }
            //sport
            if (angular.equals(idcategory, "17")) {
                parent_category = $filter('translate')('entertaiment');
                child_category = $filter('translate')('sport');
            }
            //child sport
            if (angular.equals(idcategory, "21")) {
                parent_category = $filter('translate')('sport');
                child_category = $filter('translate')('gym');
            }
            if (angular.equals(idcategory, "22")) {
                parent_category = $filter('translate')('sport');
                child_category = $filter('translate')('outdoor_sports');
            }
            if (angular.equals(idcategory, "23")) {
                parent_category = $filter('translate')('sport');
                child_category = $filter('translate')('indoor_sports');
            }
            if (angular.equals(idcategory, "104")) {
                parent_category = $filter('translate')('sport');
                child_category = $filter('translate')('recreational_sites');
            }
            if (angular.equals(idcategory, "105")) {
                parent_category = $filter('translate')('sport');
                child_category = $filter('translate')('golfing');
            }
            //leisure
            if (angular.equals(idcategory, "18")) {
                parent_category = $filter('translate')('entertaiment');
                child_category = $filter('translate')('leisure');
            }
            // child leisure
            if (angular.equals(idcategory, "24")) {
                parent_category = $filter('translate')('leisure');
                child_category = $filter('translate')('cinema');
            }
            if (angular.equals(idcategory, "25")) {
                parent_category = $filter('translate')('leisure');
                child_category = $filter('translate')('karaoke');
            }
            if (angular.equals(idcategory, "26")) {
                parent_category = $filter('translate')('leisure');
                child_category = $filter('translate')('games');
            }
            //art
            if (angular.equals(idcategory, "19")) {
                parent_category = $filter('translate')('entertaiment');
                child_category = $filter('translate')('art');
            }
            //beauty
            if (angular.equals(idcategory, "20")) {
                parent_category = $filter('translate')('entertaiment');
                child_category = $filter('translate')('beauty');
            }
            //child beauty
            if (angular.equals(idcategory, "27")) {
                parent_category = $filter('translate')('beauty');
                child_category = $filter('translate')('salon');
            }
            if (angular.equals(idcategory, "28")) {
                parent_category = $filter('translate')('beauty');
                child_category = $filter('translate')('skin_care');
            }
            if (angular.equals(idcategory, "29")) {
                parent_category = $filter('translate')('beauty');
                child_category = $filter('translate')('cosmetic');
            }
            if (angular.equals(idcategory, "30")) {
                parent_category = $filter('translate')('beauty');
                child_category = $filter('translate')('spa___treatment');
            }
            //dining
            //fast food
            if (angular.equals(idcategory, "31")) {
                parent_category = $filter('translate')('dining');
                child_category = $filter('translate')('fastfood');
            }
            //japanese
            if (angular.equals(idcategory, "32")) {
                parent_category = $filter('translate')('dining');
                child_category = $filter('translate')('japanese');
            }
            //traditional
            if (angular.equals(idcategory, "33")) {
                parent_category = $filter('translate')('dining');
                child_category = $filter('translate')('traditional');
            }
            //chinese
            if (angular.equals(idcategory, "34")) {
                parent_category = $filter('translate')('dining');
                child_category = $filter('translate')('chinese');
            }
            //western
            if (angular.equals(idcategory, "35")) {
                parent_category = $filter('translate')('dining');
                child_category = $filter('translate')('westren_food');
            }
            //bakery
            if (angular.equals(idcategory, "36")) {
                parent_category = $filter('translate')('dining');
                child_category = $filter('translate')('bakery');
            }
            //cafe
            if (angular.equals(idcategory, "37")) {
                parent_category = $filter('translate')('dining');
                child_category = $filter('translate')('bar_cafe_club');
            }
            //korean
            if (angular.equals(idcategory, "90")) {
                parent_category = $filter('translate')('dining');
                child_category = $filter('translate')('korean');
            }
            //oth_dining
            if (angular.equals(idcategory, "38")) {
                parent_category = $filter('translate')('dining');
                child_category = $filter('translate')('others');
            }
            //accomodation
            //hotel
            if (angular.equals(idcategory, "45")) {
                parent_category = $filter('translate')('accomodation');
                child_category = $filter('translate')('hotel');
            }
            //condominiums
            if (angular.equals(idcategory, "46")) {
                parent_category = $filter('translate')('accomodation');
                child_category = $filter('translate')('condominiums');
            }
            //apartment
            if (angular.equals(idcategory, "47")) {
                parent_category = $filter('translate')('accomodation');
                child_category = $filter('translate')('apartment_property');
            }
            //shopping
            //department
            if (angular.equals(idcategory, "48")) {
                parent_category = $filter('translate')('shopping');
                child_category = $filter('translate')('deparment_store');
            }
            //mart
            if (angular.equals(idcategory, "49")) {
                parent_category = $filter('translate')('shopping');
                child_category = $filter('translate')('mart');
            }
            //child mart
            if (angular.equals(idcategory, "55")) {
                parent_category = $filter('translate')('mart');
                child_category = $filter('translate')('supermarket');
            }
            if (angular.equals(idcategory, "56")) {
                parent_category = $filter('translate')('mart');
                child_category = $filter('translate')('minimarket');
            }
            //fashion
            if (angular.equals(idcategory, "50")) {
                parent_category = $filter('translate')('shopping');
                child_category = $filter('translate')('fashion');
            }
            //child fashion
            if (angular.equals(idcategory, "57")) {
                parent_category = $filter('translate')('fashion');
                child_category = $filter('translate')('Batik');
            }
            if (angular.equals(idcategory, "58")) {
                parent_category = $filter('translate')('fashion');
                child_category = $filter('translate')('clothes');
            }
            if (angular.equals(idcategory, "59")) {
                parent_category = $filter('translate')('fashion');
                child_category = $filter('translate')('shoes');
            }
            if (angular.equals(idcategory, "60")) {
                parent_category = $filter('translate')('fashion');
                child_category = $filter('translate')('accessories___toys');
            }
            if (angular.equals(idcategory, "61")) {
                parent_category = $filter('translate')('fashion');
                child_category = $filter('translate')('sport');
            }
            if (angular.equals(idcategory, "62")) {
                parent_category = $filter('translate')('fashion');
                child_category = $filter('translate')('eyewear');
            }
            if (angular.equals(idcategory, "63")) {
                parent_category = $filter('translate')('fashion');
                child_category = $filter('translate')('jewelry');
            }
            //home
            if (angular.equals(idcategory, "51")) {
                parent_category = $filter('translate')('shopping');
                child_category = $filter('translate')('home_improvement');
            }
            //book
            if (angular.equals(idcategory, "52")) {
                parent_category = $filter('translate')('shopping');
                child_category = $filter('translate')('book_stationety');
            }
            //electronic
            if (angular.equals(idcategory, "53")) {
                parent_category = $filter('translate')('shopping');
                child_category = $filter('translate')('electronic');
            }
            //automotive
            if (angular.equals(idcategory, "54")) {
                parent_category = $filter('translate')('shopping');
                child_category = $filter('translate')('automotive');
            }
            //other
            if (angular.equals(idcategory, "64")) {
                parent_category = $filter('translate')('shopping');
                child_category = $filter('translate')('others');
            }
            //education
            if (angular.equals(idcategory, "66")) {
                parent_category = $filter('translate')('education');
                child_category = $filter('translate')('school');
            }
            if (angular.equals(idcategory, "67")) {
                parent_category = $filter('translate')('education');
                child_category = $filter('translate')('tutor');
            }
            if (angular.equals(idcategory, "68")) {
                parent_category = $filter('translate')('education');
                child_category = $filter('translate')('music');
            }
            //health care
            if (angular.equals(idcategory, "70")) {
                parent_category = $filter('translate')('health_care');
                child_category = $filter('translate')('health');
            }
            if (angular.equals(idcategory, "71")) {
                parent_category = $filter('translate')('health_care');
                child_category = $filter('translate')('hospital');
            }
            //public service
            //property
            if (angular.equals(idcategory, "73")) {
                parent_category = $filter('translate')('public_services');
                child_category = $filter('translate')('property_agents');
            }
            //atm
            if (angular.equals(idcategory, "74")) {
                parent_category = $filter('translate')('public_services');
                child_category = $filter('translate')('atm_gallery');
            }
            //tour
            if (angular.equals(idcategory, "75")) {
                parent_category = $filter('translate')('public_services');
                child_category = $filter('translate')('tour_travel');
            }
            //bank
            if (angular.equals(idcategory, "76")) {
                parent_category = $filter('translate')('public_services');
                child_category = $filter('translate')('bank');
            }
            //insurance
            if (angular.equals(idcategory, "77")) {
                parent_category = $filter('translate')('public_services');
                child_category = $filter('translate')('insurance');
            }
            //gas
            if (angular.equals(idcategory, "78")) {
                parent_category = $filter('translate')('public_services');
                child_category = $filter('translate')('spbu');
            }
            //others
            if (angular.equals(idcategory, "80")) {
                parent_category = $filter('translate')('public_services');
                child_category = $filter('translate')('others');
            }
            //workshop
            if (angular.equals(idcategory, "81")) {
                parent_category = $filter('translate')('public_services');
                child_category = $filter('translate')('workshop_services');
            }
            //industry
            //DS1
            if (angular.equals(idcategory, "96")) {
                parent_category = $filter('translate')('industries');
                child_category = "DS1";
            }
            //DS2
            if (angular.equals(idcategory, "97")) {
                parent_category = $filter('translate')('industries');
                child_category = "DS2";
            }
            //DS3
            if (angular.equals(idcategory, "98")) {
                parent_category = $filter('translate')('industries');
                child_category = "DS3";
            }
            //DS5
            if (angular.equals(idcategory, "100")) {
                parent_category = $filter('translate')('industries');
                child_category = "DS5";
            }
            //DS6
            if (angular.equals(idcategory, "101")) {
                parent_category = $filter('translate')('industries');
                child_category = "DS6";
            }
            //newton
            if (angular.equals(idcategory, "102")) {
                parent_category = $filter('translate')('industries');
                child_category = $filter('translate')('newton_techno_park');
            }
            //transportation
            if (angular.equals(idcategory, "106")) {
                parent_category = $filter('translate')('transportation');
                child_category = $filter('translate')('rental_cars');
            }

            return parent_category + ", " + child_category;


        }
    }

    function entertaimentSportDetailImage($timeout,$scope, $stateParams, $location, $ionicSlideBoxDelegate, $ionicLoading, TenantService) {
        //$ionicLoading.show({ template: 'Loading ...' });

        TenantService.retriveGetTenantImage($stateParams.idtenant, function(response) {
            if (response != false) {
                $ionicSlideBoxDelegate.update();
                $scope.results = [];

                $scope.gall = $stateParams.index;
                $scope.dari = $scope.results;

                $scope.gallery = response;
                var a = 0;
                angular.forEach($scope.gallery, function(obj) {
                    var b = a++;
                    var images = $scope.gallery;
                    var img = images[b];
                    var ll = img.idtenant;

                    if (ll == $stateParams.idtenant) {
                        $scope.results.push(images[b]);
                    }
                })

                var keys = Object.keys($scope.results);
                $scope.len = keys.length;

                var i = 1;
                $scope.results.forEach(function(itemfile, indexfile, arrfile) {
                    $scope.results[indexfile].number = i++;
                });
                
            } else {
                $.data = { name: $filter('translate')('failed_get_data') };
            }
            //$ionicLoading.hide();
        });

        $scope.next = function() {
            $ionicSlideBoxDelegate.next();
        };

        $scope.previous = function() {
            $ionicSlideBoxDelegate.previous();
        };

        $scope.slideChanged = function() {
            $ionicSlideBoxDelegate.update();
        };
    }

function tenantMap($window, $rootScope, $scope, $ionicLoading, $cordovaGeolocation, distanceduration, $filter) {

   $scope.tujuan = new google.maps.LatLng($rootScope.lattenant, $rootScope.longtenant);
   $scope.myLatlng = $rootScope.backgroundmyLatlng;
   getduration($scope.myLatlng,$scope.tujuan);
   
    //load map
    $scope.$on('$ionicView.loaded', function() {
        //console.log("map page loaded - should only see me once???");
    })

    $scope.$on('$ionicView.enter', function() {

        //console.log("Is google, google maps and our map set up?")
        if (window.google) {
            //console.log("google is");
            if (window.google.maps) {
                //console.log("maps is");
                if ($scope.map === undefined) {
                    //console.log("loading our map now...");
                    loadMap();
                }
                /*else{
                 goo
                 }*/
            } else {
                //console.log("maps isn't...");
                $scope.loadGMapstenant(); //then load the map
            }
        } else {
            //console.log("google isn't...");
            $scope.loadGLoadertenant(); //then load maps, then load the map
        }
    });

    function loadMap() {
        var mapOptions = {
            center: new google.maps.LatLng(-6.21462, 106.84513),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControlOptions: { position: google.maps.ControlPosition.TOP_CENTER },
            zoom: 16,
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_TOP,
                style: google.maps.ZoomControlStyle.SMALL
            }

        };

        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
      
        getdirection($scope.myLatlng,$scope.tujuan);
    }

    // get current location
    // get direction 
    function getdirection (mylatlang,tujuan) {
            if(mylatlang != undefined){

            $scope.map.setCenter(mylatlang);
            var myLocation = new google.maps.Marker({
                position: mylatlang,
                map: $scope.map,
                title: $filter('translate')('my_location')
             });

        //  set destinaiton
            var directionsDisplay = new google.maps.DirectionsRenderer;
            var directionsService = new google.maps.DirectionsService;

            directionsDisplay.setMap($scope.map);
            directionsService.route({
                origin: mylatlang,
                destination: tujuan,
                travelMode: 'DRIVING',
                unitSystem: google.maps.UnitSystem.IMPERIAL
            }, function(response, status) {
                if (status == 'OK') {
                directionsDisplay.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
        }else
            {
                var geocoder = new google.maps.Geocoder;
                var infowindow = new google.maps.InfoWindow;
                var myLocation = new google.maps.Marker({
                position: tujuan,
                map: $scope.map,
                title: $filter('translate')('my_location')
                
             });
              infowindow.setContent( $rootScope.nametenant);
              infowindow.open($scope.map, myLocation);
              $scope.map.setCenter($scope.tujuan);
        }

    }

    //get distance and duration
    function getduration(mylatlang,tujuan) {
        service = new google.maps.DistanceMatrixService;
        service.getDistanceMatrix({
            origins: [mylatlang],
            destinations: [tujuan],
            travelMode: 'DRIVING',
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false
        }, function(response, status) {
            element = response.rows[0].elements[0];

            $scope.distance = element.distance.text;
            $scope.duration = element.duration.text;
    
        });
    }

    $scope.loadGLoadertenant = function() {
        if (!window.google || !window.google.loader) {
            //console.log("loading gloader");
            $http.get("http://maps.googleapis.com/maps/api/js?key=AIzaSyAZ4939bfDLme2qmuIsfwg-ilYmsG3CeBw&libraries=places")
                .success(function(json) {
                    var scriptElem = document.createElement('script');
                    document.getElementsByTagName('head')[0].appendChild(scriptElem);
                    scriptElem.text = json;
                    locations.loadGMaps();
                });
        } else {
            if (!window.google.maps || !window.google.maps) {
                //console.log("no gmaps");
                $rootScope.loadGMaps();
            }
        }
    };
    
    $scope.loadGMapstenant = function() {
        if (window.google && window.google.loader && window.google.maps === undefined) {
            //console.log("loading gmaps");
            try {
                google.load("maps", "3.21", {
                    callback: mappingCallback,
                    other_params: "libraries=geometry&sensor=true&language=en"
                });
            } catch (e) {}
        }
    };
}


