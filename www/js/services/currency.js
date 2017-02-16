angular
  .module('livein')
  .service('currencyService', CurrencyService);

  function CurrencyService($http) {
    var service = {};
    service.currencylist = currencylist;
    return service;

    function currencylist(callback) {
      var req = {
        method: 'GET',
          url: 'http://api.fixer.io/latest?base=IDR'
      }
      console.log(req);
      $http(req)
        .success(function (response) {
          callback(response);
        })
        .error(function () {
          callback(false);
        });
    }
  }
