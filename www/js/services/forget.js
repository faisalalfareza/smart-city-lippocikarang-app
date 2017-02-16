angular
    .module('livein')
    .service('ForgetPasswordService', ForgetPasswordService);

    function ForgetPasswordService($http, $localStorage, $filter) {
        var service = {};

        service.forgetPassword = forgetPassword;
        service.genCode = genCode;
        service.checkCode = checkCode;
        service.changePassword = changePassword;

        return service;

        function changePassword(idaccount, password, callback) {
            var req = {
                method: 'POST',
                url: $filter('translate')('apilink') + 'api/Account/',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'action=' + 'change_password' +
                    '&idaccount=' + idaccount +
                    '&password=' + password
            }

            $http(req)
                .success(function(response) {
                    callback(response);
                })
                .error(function(response) {
                    callback(response);
                });
        }

        function checkCode(idaccount, codeConfirm, callback) {
            var req = {
                method: 'POST',
                url: $filter('translate')('apilink') + 'api/Account/',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'action=' + 'check_code' +
                    '&idaccount=' + idaccount +
                    '&codeConfirm=' + codeConfirm
            }

            $http(req)
                .success(function(response) {
                    callback(response);
                })
                .error(function(response) {
                    callback(response);
                });
        }

        function genCode(idaccount, type, contact, callback) {
            var req = {
                method: 'POST',
                url: $filter('translate')('apilink') + 'api/Account/',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'action=' + 'gen_code' +
                    '&idaccount=' + idaccount +
                    '&type=' + type +
                    '&contact=' + contact
            }

            $http(req)
                .success(function(response) {
                    callback(response);
                })
                .error(function(response) {
                    callback(response);
                });
        }

        function forgetPassword(contact, callback) {
            var req = {
                method: 'POST',
                url: $filter('translate')('apilink') + 'api/Account/',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'action=' + 'forget_password' +
                    '&contact=' + contact
            }

            $http(req)
                .success(function(response) {
                    callback(response);
                })
                .error(function(response) {
                    callback(response);
                });
        }
    }