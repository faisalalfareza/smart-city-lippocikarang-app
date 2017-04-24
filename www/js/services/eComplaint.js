angular
    .module('livein')
    .service('eComplaintService', eComplaintService)

    function eComplaintService($http, $localStorage, $state, $filter) {
        var service = {};
        
        service.getToken = getToken;
        service.getUnit = getUnit;
        service.getListCase = getListCase;
        service.getHelpname = getHelpname;
        service.insertCase = insertCase;
        
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
            //console.log(req);
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
                url: 'https://lkapi.vnetcloud.com/EcomplaintSmartCityAPIDev/v1/case/gethelpname',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + at
                },
                data: {
                    'IdDropDownUnit': id
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

        function insertCase(at,pp,email,fullname,phone,unit,concern,description,linkImg,callback) {
            console.log('insertCase : ',at,pp,email,fullname,phone,unit,concern,description,linkImg);
            var req = {
                method: 'POST',
                url: 'https://lkapi.vnetcloud.com/EcomplaintSmartCityAPIDev/v1/case/Insertcase',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + at
            },
                data: {
                    "SiteSmartCity": 1,
                    "PsCode": pp,
                    "Email": email,
                    "Name": fullname,
                    "NumberPhone": phone,
                    "IdDropDownUnit": unit,
                    "IdDropDownHelpName": concern,
                    "Description": description,
                    "ListAttach": linkImg
                }
            }
            console.log('insert : ', JSON.stringify(req));
            $http(req)
                .success(function (response) {
                    callback(response);
                    console.log('response : ' , response);

                })
                .error(function () {
                    callback(false);
                    console.log('response : false');
                });
        }

    }