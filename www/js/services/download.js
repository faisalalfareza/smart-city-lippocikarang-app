angular
    .module('livein')
    .service('DownloadService', DownloadService)


    function DownloadService($http, $localStorage, $state, $filter) {
        var service = {};
        
        service.listdownloadgeneral = listdownloadgeneral;
        service.listdownloadproperty = listdownloadproperty;
        service.detdownload = detdownload;
        service.generalcategory = generalcategory;
        service.propertycategory = propertycategory;
        
        return service;

        function listdownloadgeneral(callback) {
            var req = {
                method: 'GET',
                url: $filter('translate')('apilink') + 'api/Download/?action=listdownload&pagesize=1000&pagenumber=1&idcategory=92'
            }
            $http(req)
                .success(function (response) {
                    callback(response);

                })
                .error(function () {
                    callback(false);

                });
        }

        function listdownloadproperty(callback) {
            var req = {
                method: 'GET',
                url: $filter('translate')('apilink') + 'api/Download/?action=listdownload&pagesize=1000&pagenumber=1&idcategory=93'
            }
            $http(req)
                .success(function (response) {
                    callback(response);

                })
                .error(function () {
                    callback(false);

                });
        }

        function detdownload(iddownload, callback) {
            var req = {
                method: 'GET',
                url: $filter('translate')('apilink') + 'api/Download/?action=retrieve_get&iddownload=' + iddownload
            }
            $http(req)
                .success(function (response) {
                    callback(response);

                })
                .error(function () {
                    callback(false);

                });
        }

        function generalcategory(callback) {
            var req = {
                method: 'GET',
                url: $filter('translate')('apilink') + 'api/Category?action=listallchild&idcategory=92'
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
                url: $filter('translate')('apilink') + 'api/Category?action=listallchild&idcategory=93'
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