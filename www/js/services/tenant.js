angular
    .module('livein')
    .service('TenantServiceA', TenantServiceA)
    .service('NewsService', NewsService)

    function TenantServiceA($http) {
        var service = {};

        service.rateTenant = rateTenant;
        service.bookmarkTenant = bookmarkTenant;
        service.listbookmarkTenant = listbookmarkTenant;

        return service;

        function rateTenant(idtenant, idaccount, rating, callback) {
            var req = {
                method: 'POST',
                url: 'http://innodev.vnetcloud.com/LiveIn/api/Rating/',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'action=' + 'insert_rating' +
                '&idtenant=' + idtenant +
                '&idaccount=' + idaccount +
                '&rating=' + rating
            }
            $http(req)
                .success(function (response) {
                    callback(response);
                })
                .error(function () {
                    callback(false);
                });
        }
        
        function bookmarkTenant(idtenant, idaccount, callback) {
            var req = {
                method: 'POST',
                url: 'http://innodev.vnetcloud.com/LiveIn/api/Bookmark/',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'action=' + 'insert_bookmark' +
                '&idtenant=' + idtenant +
                '&idaccount=' + idaccount
            }
            $http(req)
                .success(function (response) {
                    callback(response);
                })
                .error(function () {
                    callback(false);
                });
        }

        function listbookmarkTenant(callback) {
            var req = {
                method: 'GET',
                url: 'http://innodev.vnetcloud.com/LiveIn/api/Bookmark/?action=listbookmark&pagenumber=1&pagesize=100&idaccount=' + '144'
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

    function NewsService($http) {
        var service = {};
        service.listnews = listnews;
        return service;

        function listnews(callback) {
            var req = {
                method: 'GET',
                url: 'http://innodev.vnetcloud.com/LiveIn/api/News/?action=listnews&pagenumber=1&pagesize=1000'
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
