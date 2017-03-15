/**
 * Created by Lenovo on 06/12/2016.
 */
angular
  .module('livein')
  .controller('mainmap', mainmap);

  function mainmap($scope, $location, $ionicLoading,distanceduration) {
    $scope.showdistance = false;
    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;

    $scope.loadGLoader = function () {
      if (!window.google || !window.google.loader) {
        console.log("loading gloader");
        $http.get("http://maps.googleapis.com/maps/api/js?key=AIzaSyAZ4939bfDLme2qmuIsfwg-ilYmsG3CeBw&libraries=places")
          .success(function (json) {
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
    $scope.loadGMaps = function () {
      if (window.google && window.google.loader && window.google.maps === undefined) {
        console.log("loading gmaps");
        try {
          google.load("maps", "3.21", {
            callback: mappingCallback,
            other_params: "libraries=geometry&sensor=true&language=en"
          });
        } catch (e) {
        }
      }
    };


    $scope.labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $scope.labelIndex = 0;
    $scope.arrMarker = [];
    var loadMap = function () {

      var mapOptions = {
        center: new google.maps.LatLng(-6.21462, 106.84513),
        styles: [{featureType: "all", stylers: [{saturation: -75}]}],
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControlOptions: {position: google.maps.ControlPosition.TOP_CENTER},
        zoom: 0,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_BOTTOM,
          style: google.maps.ZoomControlStyle.SMALL
        }
      };
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);
      navigator.geolocation.getCurrentPosition(function (pos) {
        map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));

        var myLocation = new google.maps.Marker({
          position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
          map: map,
          title: "My Location"
        });
        $scope.curentloc= new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      });
      $scope.map = map;


      $scope.getPlacePredictions = function ($q) {
        var dfd = $q,
          service = new google.maps.places.AutocompleteService();
        console.log($q.length);
        if ($q.length == 0) {
          $scope.listhide = true;
        } else {
          $scope.listhide = false;
        }


        service.getPlacePredictions({input: $q}, function (predictions, status) {
          if (status != google.maps.places.PlacesServiceStatus.OK) {
            $scope.predictions = [];
            console.log(status)

          }
          else {
            $scope.predictions = predictions;
            console.log(predictions);
          }
        });
      };
    }

    $scope.$on('$ionicView.loaded', function () {
      console.log("map page loaded - should only see me once???");
    })

    $scope.$on('$ionicView.enter', function () {

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
          $scope.loadGMaps(); //then load the map
        }
      } else {
        console.log("google isn't...");
        $scope.loadGLoader(); //then load maps, then load the map
      }
    });


    $scope.selectSearchResult = function (result) {


      if ($scope.arrMarker.size > 0 ){
        infowindow.close();
        $scope.arrMarker = [];
        
      }    

      $scope.placeid = result.place_id;
      $scope.getduration()
      $scope.balala = result.description;
      $scope.predictions = [];
      console.log(result.place_id);
      geocoder.geocode({'placeId': result.place_id}, function (results, status) {
        if (status === 'OK') {
          if (results[0]) {
            $scope.map.setZoom(15);
            $scope.map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: $scope.map,
              label: $scope.labels[$scope.labelIndex++ % $scope.labelIndex.length],
              position: results[0].geometry.location
            });
              $scope.arrMarker.push(marker)
              infowindow.setContent(results[0].formatted_address);
              infowindow.open($scope.map, marker);
           
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });
    }

    $scope.getdirection = function () {
      var directionsDisplay = new google.maps.DirectionsRenderer;
      var directionsService = new google.maps.DirectionsService;
      directionsDisplay.setMap($scope.map);
      directionsService.route({
        origin: $scope.curentloc,  // Haight.
        destination:{'placeId': $scope.placeid} ,  // Ocean Beach.
        // Note that Javascript allows us to access the constant
        // using square brackets and a string value as its
        // "property."
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.IMPERIAL
      }, function (response, status) {
        if (status == 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
      $scope.showdistance = true;



    }
    $scope.checkdesitenate = function () {

      if($scope.placeid == null){
        return true;
      }else {
        return false
      }

    }
    //get distance and duration

     $scope.getduration = function() {

      console.log($scope.curentloc)
      console.log($scope.placeid)
      distanceduration.reqdistance($scope.curentloc,$scope.placeid,function (response) {

        element = response.rows[0].elements[0];
        $scope.distance = element.distance.text;
        $scope.duration = element.duration.text;


        console.log('jarak = ' + $scope.distance + "  duration" + $scope.duration);



      })

      $scope.setMapOnAll = function(map) {
        for (var i = 0; i < $scope.arrMarker.length; i++) {
        $scope.arrMarker[i].setMap(map);
      }
    }



    }

  }
