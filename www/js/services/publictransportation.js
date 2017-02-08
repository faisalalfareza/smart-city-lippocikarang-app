angular
    .module('livein')
    .service('publictransportationService', publictransportationService);

    function publictransportationService($http) {
        var service = {};
        service.listpublictransport = listpublictransport;
        return service;

        function listpublictransport(callback) {
            var req = {
                method: 'GET',
                url: 'http://innodev.vnetcloud.com/LiveIn/api/Publictransportation/?action=list&idcity=1&pagenumber=1&pagesize=1000'
            }
            $http(req)
                .success(function (response) {
                    callback(response);
                })
                .error(function () {
                    callback(false);
                });

            console.log("masuk yaa");
        }
    }