angular
    .module('livein')
    .service('AboutUsService', AboutUsService);

function AboutUsService($http, $filter) {
    var service = {};
    service.aboutus = aboutus;
    return service;

    function aboutus(callback) {
        var req = {
            method: 'GET',
            url: $filter('translate')('apilink') + 'api/City/?action=select_datacity&idcity=1'
        }
        $http(req)
            .success(function(response) {
                callback(response);
            })
            .error(function() {
                callback(false);
            });
    }
}