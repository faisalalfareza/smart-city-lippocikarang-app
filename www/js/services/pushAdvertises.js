angular
    .module('livein')
    .service('AdvertiseService', AdvertiseService)

    function AdvertiseService($http) {
        var service = {};
        service.listAds = listAds;
        return service;

        function listAds(callback) {
            var headers = {
                'Access-Control-Allow-Origin' : '*'
            };

            var req = {
                    method: 'GET',
                    url: 'http://innodev.vnetcloud.com/LiveIn/api/Advertise/?action=listadvertise&pagenumber=1&pagesize=100'
                }

            $http(req)
                .success(function(response) {
                    callback(true);
                    console.log(true);
                })
                .error(function() {
                    callback(false);
                    console.log(false);
                });
        }        

    }
