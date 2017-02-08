angular
    .module('livein')
    .service('useful', useful);

    function useful($http) {
        var service = {};

        service.phoneNumber = phoneNumber;

        return service; 
        //-------------------------------------------------------------
        function phoneNumber(callback) {
            var req = {
                    method: 'GET',
                    url: 'http://innodev.vnetcloud.com/LiveIn/api/Phonenumber/phonenumber?action=phonenumber_get&idcity=1'
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