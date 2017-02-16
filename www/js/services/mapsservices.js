
angular
  .module('livein')
  .service('distanceduration', distanceduration);

  function distanceduration() {
    var service = {};

    service.reqdistance = reqdistance;

    return service

    function  reqdistance(origin,destinate,callback) {
      service = new google.maps.DistanceMatrixService;
      service.getDistanceMatrix({
        origins: [origin],
        destinations: [{placeId :destinate }],
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
      }, function (response) {
        console.log(response)
        callback(response)
      });
    }

  }
