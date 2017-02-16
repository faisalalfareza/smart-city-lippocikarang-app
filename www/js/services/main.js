angular
  .module('livein')
  .service('mainService', mainService);

  function mainService($http) {
    var service = {};
    service.reqweather = reqweather;

    return service;

    function reqweather(lat,long,callback) {
      var req = {
        method: 'GET',
        url: 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=90dba2f984a69780385c6de9c4b717cb'
      }

      $http(req)
        .success(function(response) {
          callback(response);
        })
        .error(function(error) {
          callback(error);
        });
    }

  }
