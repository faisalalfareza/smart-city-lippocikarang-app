angular
    .module('livein')
    .service('useful', useful);

    function useful($http, $filter) {
        var service = {};

        service.phoneNumber = phoneNumber;

        return service; 

        function phoneNumber(callback) {
            var req = {
                    method: 'GET',
                    url: $filter('translate')('apilink') + 'api/Phonenumber/phonenumber?action=phonenumber_get&idcity=1'
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