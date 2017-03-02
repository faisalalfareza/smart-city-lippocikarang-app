angular
    .module('livein')
    .service('registerService', registerService);

function registerService($http, $filter) {
    var service = {};

    service.registerManualService = registerManualService;
    service.setUserGoogle = setUserGoogle;
    service.getUserGoogle = getUserGoogle;

    return service;

    function registerManualService(fullname, gender, phone, email, password, callback) {
        var req = {
            method: 'POST',
            url: $filter('translate')('apilink') + 'api/Account/',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: 'action=' + 'register' +
                '&privilege=' + 'visitor' +
                '&fullname=' + fullname +
                '&gender=' + gender +
                '&phone=' + phone +
                '&email=' + email +
                '&password=' + password
        }
        alert(JSON.stringify(req));

        $http(req)
            .success(function(response) {
                callback(response);
                alert(JSON.stringify(response));
            })
            .error(function() {
                callback(false);
            });
    }

    function setUserGoogle(user_data) {
        window.localStorage.starter_google_user = JSON.stringify(user_data);
    }

    function getUserGoogle(user_data) {
        return JSON.parse(window.localStorage.starter_google_user || '{}');
    }
}