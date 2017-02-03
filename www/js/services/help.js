angular
    .module('livein')
    .service('help', help);

    function help($http) {
        var service = {};

        service.callCenter = callCenter;

        return service; 
        //-------------------------------------------------------------
        function callCenter(callback) {
            var req = {
                    method: 'GET',
                    url: 'http://innodev.vnetcloud.com/LiveIn/api/Callcenter/?action=retrieve_get&idcallcenter=1&idcity=1'
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