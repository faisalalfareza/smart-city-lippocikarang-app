angular
    .module('livein')
    .service('talktoUs', talktoUs);

    function talktoUs($http, $filter) {
        var service = {};

        service.getTalktoUs = getTalktoUs;

        return service; 

        function getTalktoUs(callback) {
            var req = {
                    method: 'GET',
                    url: $filter('translate')('apilink') + 'api/Talktous/?action=retrieve_get&idtalktous=1&idcity=1'
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