angular
    .module('livein')
    .service('AboutUsService', AboutUsService);

    function AboutUsService($http) {
        var service = {};
        service.aboutus = aboutus;
        return service;

        function aboutus(callback) {
            var req = {
                method: 'GET',
                url: 'http://innodev.vnetcloud.com/LiveIn/api/City/?action=select_datacity&idcity=1'
            }
            $http(req)
                .success(function (response) {
                    callback(response);
                })
                .error(function () {
                    callback(false);
                });
        }
    }