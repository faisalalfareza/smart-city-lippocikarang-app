angular
    .module('livein')
    .service('eComplaintService', eComplaintService)

    function eComplaintService($http, $localStorage, $state, $filter) {
        var service = {};
        
        service.getToken = getToken;
        service.getUnit = getUnit;
        service.getListCase = getListCase;
        service.getHelpname = getHelpname;
        
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

        function getUnit(at,callback) {
            var req = {
                method: 'POST',
                url: 'https://lkapi.vnetcloud.com/EcomplaintSmartCityAPIDev/v1/case/getunit',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + at
                },
                data: {
                    'Email': $localStorage.currentUser.data[0].email,
                    'SiteSmartCity': '1'
                }
            }
            $http(req)
                .success(function (response) {
                    callback(response);

                })
                .error(function () {
                    callback(false);
                });
        }

        function getListCase(at,callback) {

            //console.log($localStorage.tokken.token_type + ' dan ' + $localStorage.tokken.access_token);
            var req = {
                method: 'POST',
                url: 'https://lkapi.vnetcloud.com/EcomplaintSmartCityAPIDev/v1/case/getlistcase',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + at
                },
                data: {
                    'Email': $localStorage.currentUser.data[0].email,
                    'SiteSmartCity': '1'
                }
            }
            $http(req)
                .success(function (response) {
                    callback(response);

                })
                .error(function () {
                    callback(false);
                });
        }

        function getHelpname(at,id,callback) {

            //console.log($localStorage.tokken.token_type + ' dan ' + $localStorage.tokken.access_token);
            var req = {
                method: 'POST',
                url: 'https://lkapi.vnetcloud.com/EcomplaintSmartCityAPIDev/v1/case/helpname',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + at
                },
                data: {
                    'IdDropDownUnit': id
                }
            }
            console.log('getHelpname : ', JSON.stringify(req));
            $http(req)
                .success(function (response) {
                    callback(response);

                })
                .error(function () {
                    callback(false);
                });
        }

    }