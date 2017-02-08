angular
    .module('livein')
    .controller('sportDetail', entertaimentSportDetail)
    .controller('tenantMap', tenantMap)
    .controller('sportDetailImage', entertaimentSportDetailImage);

function entertaimentSportDetail($scope, $rootScope, $cordovaGeolocation, $stateParams, $ionicPopup, $location, $ionicLoading, $localStorage, $state, TenantService, TenantServiceA, $filter) {

    $scope.MapClick = gotoMap;
    $scope.Bookmark = setbookmark;

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
        console.log($scope.tenantname);
    });



    var posOptions = { timeout: 10000, enableHighAccuracy: true };
    $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
        $rootScope.lat = position.coords.latitude
        $rootScope.long = position.coords.longitude
        console.log('lat :' + $rootScope.lat + '  long: ' + $rootScope.long);

        //set to service
        $scope.distance = calculatdistance(lat, long);
        console.log($scope.distance);

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

        console.log(d);
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
        $state.go('app.tenantMap');

    };

    //function set bookamark
    function setbookmark() {
        $ionicLoading.show({ template: $filter('translate')('loading') + "..." });
        TenantServiceA.bookmarkTenant(
            $scope.tenantdata.idtenant,
            $scope.fullname = $localStorage.currentUser.data[0].idaccount,
            function(response) {
                if (response != false) {

                    if (response[0].status == true) {
                        $ionicLoading.show({ template: $filter('translate')('bookmarked'), duration: 5000 });
                    } else {
                        $ionicLoading.show({ template: response[0].message, duration: 5000 });
                    }
                    $ionicLoading.hide();

                } else {
                    $ionicLoading.show({
                        template: $filter('translate')('post_rating_success'),
                        duration: 5000
                    });
                }
                $ionicLoading.hide();
            });

    }

    $scope.reviewClick = function(urlview) {
        if (urlview != null) {

            window.open(urlview, '_system', 'location=yes')

        } else {
            var alertPopup = $ionicPopup.alert({
                title: $filter('translate')('action_review') + ' Tenant',
                template: $filter('translate')('no_review_tenant'),
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
                    console.log($scope.img.avatar);
                }
            })

        } else {
            $.data = { name: $filter('translate')('failed_get_data') };
        }

    });

    $scope.$on('$ionicView.beforeLeave', function() {
        console.log($scope.rating);
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
                    console.log('You are not sure');
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
                console.log($localStorage.currentUser.data[0].idaccount)
                if (response != false) {
                    console.log(response);
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

        $scope.rating = rate;

        console.log($scope.rating);

    }

    function texcategory(idcategory) {

        if (angular.equals(idcategory, "16")) {
            parent_category = "entertaiment";
            child_category = "events";
        }
        //sport
        if (angular.equals(idcategory, "17")) {
            parent_category = "entertaiment";
            child_category = "sport";
        }
        //child sport
        if (angular.equals(idcategory, "21")) {
            parent_category = "sport";
            child_category = "gym";
        }
        if (angular.equals(idcategory, "22")) {
            parent_category = "sport";
            child_category = "outdoor sports";
        }
        if (angular.equals(idcategory, "23")) {
            parent_category = "sport";
            child_category = "indoor_sports";
        }
        if (angular.equals(idcategory, "104")) {
            parent_category = "sport";
            child_category = "recreational sites";
        }
        if (angular.equals(idcategory, "105")) {
            parent_category = "sport";
            child_category = "golfing";
        }
        //leisure
        if (angular.equals(idcategory, "18")) {
            parent_category = "entertaiment";
            child_category = "leisure";
        }
        // child leisure
        if (angular.equals(idcategory, "24")) {
            parent_category = "leisure";
            child_category = "cinema";
        }
        if (angular.equals(idcategory, "25")) {
            parent_category = "leisure";
            child_category = "karaoke";
        }
        if (angular.equals(idcategory, "26")) {
            parent_category = "leisure";
            child_category = "games";
        }
        //art
        if (angular.equals(idcategory, "19")) {
            parent_category = "Entertaiment";
            child_category = "art";
        }
        //beauty
        if (angular.equals(idcategory, "20")) {
            parent_category = "Entertaiment";
            child_category = "Beauty";
        }
        //child beauty
        if (angular.equals(idcategory, "27")) {
            parent_category = "Beauty";
            child_category = "Salon";
        }
        if (angular.equals(idcategory, "28")) {
            parent_category = "Beauty";
            child_category = "Skin_care";
        }
        if (angular.equals(idcategory, "29")) {
            parent_category = "Beauty";
            child_category = "cosmetic";
        }
        if (angular.equals(idcategory, "30")) {
            parent_category = "Beauty";
            child_category = "Spa Treatment";
        }
        //dining
        //fast food
        if (angular.equals(idcategory, "31")) {
            parent_category = "Dining";
            child_category = "Fastfood";
        }
        //japanese
        if (angular.equals(idcategory, "32")) {
            parent_category = "Dining";
            child_category = "Japanese";
        }
        //traditional
        if (angular.equals(idcategory, "33")) {
            parent_category = "Dining";
            child_category = "Traditional";
        }
        //chinese
        if (angular.equals(idcategory, "34")) {
            parent_category = "Dining";
            child_category = "Chinese";
        }
        //western
        if (angular.equals(idcategory, "35")) {
            parent_category = "Dining";
            child_category = "Western";
        }
        //bakery
        if (angular.equals(idcategory, "36")) {
            parent_category = "Dining";
            child_category = "Bakery";
        }
        //cafe
        if (angular.equals(idcategory, "37")) {
            parent_category = "Dining";
            child_category = "Bar Cafe Club";
        }
        //korean
        if (angular.equals(idcategory, "90")) {
            parent_category = "Dining";
            child_category = "Korean";
        }
        //oth_dining
        if (angular.equals(idcategory, "38")) {
            parent_category = "Dining";
            child_category = "Others";
        }
        //accomodation
        //hotel
        if (angular.equals(idcategory, "45")) {
            parent_category = "Accomodation";
            child_category = "Hotel";
        }
        //condominiums
        if (angular.equals(idcategory, "46")) {
            parent_category = "Accomodation";
            child_category = "Condomminiums";
        }
        //apartment
        if (angular.equals(idcategory, "47")) {
            parent_category = "Accomodation";
            child_category = "Apartement";
        }
        //shopping
        //department
        if (angular.equals(idcategory, "48")) {
            parent_category = "Shopping";
            child_category = "Departement Store";
        }
        //mart
        if (angular.equals(idcategory, "49")) {
            parent_category = "Shopping";
            child_category = "Mart";
        }
        //child mart
        if (angular.equals(idcategory, "55")) {
            parent_category = "Mart";
            child_category = "Super Market";
        }
        if (angular.equals(idcategory, "56")) {
            parent_category = "Mart";
            child_category = "MiniMaket";
        }
        //fashion
        if (angular.equals(idcategory, "50")) {
            parent_category = "Shopping";
            child_category = "Fashion";
        }
        //child fashion
        if (angular.equals(idcategory, "57")) {
            parent_category = "Fashion";
            child_category = "Batik";
        }
        if (angular.equals(idcategory, "58")) {
            parent_category = "Fashion";
            child_category = "Clothes";
        }
        if (angular.equals(idcategory, "59")) {
            parent_category = "Fashion";
            child_category = "Shoes";
        }
        if (angular.equals(idcategory, "60")) {
            parent_category = "Fashion";
            child_category = "Accesoris Toys";
        }
        if (angular.equals(idcategory, "61")) {
            parent_category = "Fashion";
            child_category = "Sport";
        }
        if (angular.equals(idcategory, "62")) {
            parent_category = "Fashion";
            child_category = "Eyewear";
        }
        if (angular.equals(idcategory, "63")) {
            parent_category = "Fashion";
            child_category = "Jewelry";
        }
        //home
        if (angular.equals(idcategory, "51")) {
            parent_category = "Shopping";
            child_category = "Home Improvment";
        }
        //book
        if (angular.equals(idcategory, "52")) {
            parent_category = "Shopping";
            child_category = "Booke Stationety";
        }
        //electronic
        if (angular.equals(idcategory, "53")) {
            parent_category = "Shopping";
            child_category = "Electronic";
        }
        //automotive
        if (angular.equals(idcategory, "54")) {
            parent_category = "Shopping";
            child_category = "Automotive";
        }
        //other
        if (angular.equals(idcategory, "64")) {
            parent_category = "Shopping";
            child_category = "Others";
        }
        //education
        if (angular.equals(idcategory, "66")) {
            parent_category = "Education";
            child_category = "School";
        }
        if (angular.equals(idcategory, "67")) {
            parent_category = "Education";
            child_category = "Tutor";
        }
        if (angular.equals(idcategory, "68")) {
            parent_category = "Education";
            child_category = "Music";
        }
        //health care
        if (angular.equals(idcategory, "70")) {
            parent_category = "Health Care";
            child_category = "helath";
        }
        if (angular.equals(idcategory, "71")) {
            parent_category = "Health Care";
            child_category = "Hospital";
        }
        //public service
        //property
        if (angular.equals(idcategory, "73")) {
            parent_category = "Public Services";
            child_category = "Property Agent";
        }
        //atm
        if (angular.equals(idcategory, "74")) {
            parent_category = "Public Services";
            child_category = "ATM Gallery";
        }
        //tour
        if (angular.equals(idcategory, "75")) {
            parent_category = "Public Services";
            child_category = "Tour Travel";
        }
        //bank
        if (angular.equals(idcategory, "76")) {
            parent_category = "Public Services";
            child_category = "Bank";
        }
        //insurance
        if (angular.equals(idcategory, "77")) {
            parent_category = "Public Services";
            child_category = "Insurance";
        }
        //gas
        if (angular.equals(idcategory, "78")) {
            parent_category = "Public Services";
            child_category = "SPBU";
        }
        //others
        if (angular.equals(idcategory, "80")) {
            parent_category = "Public Services";
            child_category = "Others";
        }
        //workshop
        if (angular.equals(idcategory, "81")) {
            parent_category = "Public Services";
            child_category = "workshop Services";
        }
        //industry
        //DS1
        if (angular.equals(idcategory, "96")) {
            parent_category = "Industrie";
            child_category = "DS1";
        }
        //DS2
        if (angular.equals(idcategory, "97")) {
            parent_category = "Industrie";
            child_category = "DS2";
        }
        //DS3
        if (angular.equals(idcategory, "98")) {
            parent_category = "Industrie";
            child_category = "DS3";
        }
        //DS5
        if (angular.equals(idcategory, "100")) {
            parent_category = "Industrie";
            child_category = "DS5";
        }
        //DS6
        if (angular.equals(idcategory, "101")) {
            parent_category = "Industrie";
            child_category = "DS6";
        }
        //newton
        if (angular.equals(idcategory, "102")) {
            parent_category = "Industrie";
            child_category = "Newton Techno Park";
        }
        //transportation
        if (angular.equals(idcategory, "106")) {
            parent_category = "Transportation";
            child_category = "Rental Cars";
        }

        return parent_category + ", " + child_category;


    }





}


function entertaimentSportDetailImage($scope, $stateParams, $location, $ionicSlideBoxDelegate, $ionicLoading, TenantService) {
    //$ionicLoading.show({ template: 'Loading ...' });

    TenantService.retriveGetTenantImage($stateParams.idtenant, function(response) {
        if (response != false) {
            $ionicSlideBoxDelegate.update();
            $scope.results = [];

            $scope.gall = $stateParams.index;

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


    //get location




    $scope.myLatlng = new google.maps.LatLng($rootScope.lat, $rootScope.long);
    $scope.tujuan = new google.maps.LatLng($rootScope.lattenant, $rootScope.longtenant);
    getduration();





    //get distance


    //load map

    $scope.$on('$ionicView.loaded', function() {
        console.log("map page loaded - should only see me once???");
    })

    $scope.$on('$ionicView.enter', function() {

        console.log("Is google, google maps and our map set up?")
        if (window.google) {
            console.log("google is");
            if (window.google.maps) {
                console.log("maps is");
                if ($scope.map === undefined) {
                    console.log("loading our map now...");
                    loadMap();
                }
                /*else{
                 goo
                 }*/
            } else {
                console.log("maps isn't...");
                $scope.loadGMapstenant(); //then load the map
            }
        } else {
            console.log("google isn't...");
            $scope.loadGLoadertenant(); //then load maps, then load the map
        }
    });


    function loadMap() {
        var mapOptions = {
            center: new google.maps.LatLng(43.074174, -89.380915),
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControlOptions: { position: google.maps.ControlPosition.TOP_CENTER },
            zoom: 16,
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_BOTTOM,
                style: google.maps.ZoomControlStyle.SMALL
            }

        };

        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        $scope.map.setCenter(new google.maps.LatLng($scope.lat, $scope.lang));
        var myLocation = new google.maps.Marker({
            position: new google.maps.LatLng($scope.lat, $scope.lang),
            map: $scope.map,
            title: $filter('translate')('my_location')
        });

        //  set destinaiton
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var directionsService = new google.maps.DirectionsService;

        directionsDisplay.setMap($scope.map);
        directionsService.route({
            origin: $scope.myLatlng,
            destination: $scope.tujuan,
            travelMode: 'DRIVING',
            unitSystem: google.maps.UnitSystem.IMPERIAL
        }, function(response, status) {
            if (status == 'OK') {
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });

    }

    //get distance and duration

    function getduration() {
        service = new google.maps.DistanceMatrixService;
        service.getDistanceMatrix({
            origins: [$scope.myLatlng],
            destinations: [$scope.tujuan],
            travelMode: 'DRIVING',
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false
        }, function(response, status) {
            console.log(response)
            element = response.rows[0].elements[0];

            $scope.mencret = element.distance.text;
            $scope.telek = element.duration.text;


            console.log('jarak = ' + $scope.mencret + "  duration" + $scope.telek);


        });


    }


    $scope.loadGLoadertenant = function() {
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
                $rootScope.loadGMaps();
            }
        }
    };
    $scope.loadGMapstenant = function() {
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