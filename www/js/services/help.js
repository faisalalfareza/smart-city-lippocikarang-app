angular
    .module('livein')
    .service('help', help);

    function help($http, $filter) {
        var service = {};

        service.callCenter = callCenter;

        return service; 

        function callCenter(callback) {
            var req = {
                    method: 'GET',
                    url: $filter('translate')('apilink') + 'api/Callcenter/?action=retrieve_get&idcallcenter=1&idcity=1'
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