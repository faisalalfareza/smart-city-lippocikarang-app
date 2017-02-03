angular
    .module('livein')
    .service('serv1', serv1);

    function serv1($http) {
        var service = {};

        service.getUsers = getUsers;
        service.getUser = getUser;

        return service; 
        //-------------------------------------------------------------
        function getUsers(callback) {
            var req = {
                    method: 'GET',
                    url: 'http://jsonplaceholder.typicode.com/users'
                }

            $http(req)
                .success(function(response) {
                    callback(response);
                })
                .error(function() {
                    callback(false);
                });
        }

        function getUser(userId, callback) {
            var req = {
                    method: 'GET',
                    url: 'http://jsonplaceholder.typicode.com/users/'+userId
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