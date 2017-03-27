angular
    .module('livein')
    .service('eComplaintService', eComplaintService)

    function eComplaintService($http, $localStorage, $state, $filter) {
        var service = {};
        
        service.getToken = getToken;
        
        return service;

        function getToken(callback) {
            var req = {
                method: 'POST',
                url: 'https://lkapi.vnetcloud.com/EcomplaintSmartCityAPIDev/token',
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'grant_type=password' + '&username=crmadminsmartcity' + '&password=SmartCity*1!'
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