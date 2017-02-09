angular
    .module('livein')
    .service('AdvertiseService', AdvertiseService)

    function AdvertiseService($http) {
        var service = {};

        service.listAds = listAds;

        return service;

        function listAds(callback) {
            var rqs = "http://innodev.vnetcloud.com/LiveIn/api/Advertise/?action=listadvertise&pagenumber=1&pagesize=100";
            var req = {
                    method: "GET",
                    url: rqs
                }

            $http(req)
                .success(function(response) {
                    callback(response);
                })
                .error(function(response) {
                    console.log(response);
                    callback(false);
                });
        }

    }
