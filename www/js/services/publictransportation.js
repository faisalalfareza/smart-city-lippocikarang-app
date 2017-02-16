angular
    .module('livein')
    .service('publictransportationService', publictransportationService);

    function publictransportationService($http, $filter) {
        var service = {};

        service.listpublictransport = listpublictransport;

        return service;

        function listpublictransport(callback) {
            var req = {
                method: 'GET',
                url: $filter('translate')('apilink') + 'api/Publictransportation/?action=list&idcity=1&pagenumber=1&pagesize=1000'
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