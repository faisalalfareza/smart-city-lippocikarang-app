angular
    .module('livein')
    .service('PropertyService', PropertyService)

    function PropertyService($http, $localStorage, $stateParams, $filter) {
        var service = {};

        service.listproperty = listproperty;
        service.retriveGetProperty = retriveGetProperty;
        service.emailProperty = emailProperty;
        service.propertycategory = propertycategory;
        service.insertBookmarkProperty = insertBookmarkProperty;
        service.deleteBookmarkProperty = deleteBookmarkProperty;

        return service;

        function listproperty(status, pagenumber, callback) {
            var req = {
                method: 'GET',
                url: $filter('translate')('apilink') + 'api/Property/?action=listbycategory&idcategory=39&pagenumber='+pagenumber+'&pagesize=10&status='+status+'&idaccount='+$localStorage.currentUser.data[0].idaccount
            }
            $http(req)
                .success(function (response) {
                    callback(response);
                })
                .error(function () {
                    callback(false);
                });
        }

        function propertycategory(callback) {
            var req = {
                method: 'GET',
                url: $filter('translate')('apilink') + 'api/Category?action=listallchild&idcategory=39'
            }
            $http(req)
                .success(function (response) {
                    callback(response);
                })
                .error(function () {
                    callback(false);
                });
        }

        function retriveGetProperty(lang, idproperty, callback) {
            var req = {
                method: 'GET',
                url: $filter('translate')('apilink') + 'api/Property/?action=retrieve_get&idproperty='+idproperty+'&lang='+lang
            }
            $http(req)
                .success(function (response) {
                    callback(response);                    
                })
                .error(function () {
                    callback(false);
                });
        }

        function emailProperty(bodyemail,callback) {
           var req = {
               method: 'POST',
               url: $filter('translate')('apilinkpayment') + 'sendemail',
               headers: {
                   'Content-Type': 'application/json'
               },
               data: {
                    "to": $stateParams.agentemail,
                    "cc": $localStorage.currentUser.data[0].email,
                    "subjectemail": $localStorage.currentUser.data[0].email,
                    "bodyemail": bodyemail 
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

        function insertBookmarkProperty(idproperty, callback) {
            var req = {
                method: 'POST',
                url: $filter('translate')('apilink') + 'api/Bookmark/',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'action=' + 'insert_bookmark' +
                '&idaccount=' + $localStorage.currentUser.data[0].idaccount +
                '&idproperty=' + idproperty
            }
            $http(req)
                .success(function (response) {
                    callback(response);
                })
                .error(function () {
                    callback(false);
                });
        }

        function deleteBookmarkProperty(idbookmark, callback) {
            var req = {
                method: 'POST',
                url: $filter('translate')('apilink') + 'api/Bookmark/',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'action=' + 'delete_bookmark' +
                '&idbookmark=' + idbookmark +
                '&idaccount=' + $localStorage.currentUser.data[0].idaccount
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
