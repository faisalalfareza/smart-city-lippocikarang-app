angular
    .module('livein')
    .service('LoginService', LoginService);

function LoginService($http, $localStorage, $filter) {
    var service = {};

    service.loginUser = loginUser;
    service.logoutUser = logoutUser;

    return service;

    function loginUser(email, password, callback) {
        var req = {
            method: 'POST',
            url: $filter('translate')('apilink') + 'api/Account/',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: 'action=login' + '&email=' + email + '&password=' + password
        }

        $http(req)
            .success(function(response) {
                if (response[0].status != false) {
                    $localStorage.currentUser = { data: response };
                }
                callback(response);
            })
            .error(function(response) {
                callback(response);
            });
    }

    function logoutUser() {
        // remove user from local storage and clear http auth header
        delete $localStorage.currentUser;
        delete $localStorage.notifBefore;
    }

}