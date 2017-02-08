angular
    .module('livein')
    .service('TenantService', TenantService);

    function TenantService($http, $localStorage) {
        var service = {};

        service.listAllChild = listAllChild;
        service.listTenant = listTenant;
        service.retriveGetTenant = retriveGetTenant;
        service.retriveGetTenantImage = retriveGetTenantImage;
        service.listRecomendedTenant = listRecomendedTenant;
        service.filterByCategory = filterByCategory;

        return service;

        function listAllChild(idcategory, callback) {
            var req = {
                    method: 'GET',
                    url: 'http://innodev.vnetcloud.com/LiveIn/api/Category?action=listallchild&idcategory='+idcategory
                }

            $http(req)
                .success(function(response) {
                    callback(response);
                })
                .error(function() {
                    callback(false);
                });
        }        

        function listTenant(idcategory, callback) {
            var req = {
                    method: 'GET',
                    url: 'http://innodev.vnetcloud.com/LiveIn/api/Tenant/?action=listbycategory&idcategory='+idcategory+'&pagenumber=1&pagesize=1000'
                }

            $http(req)
                .success(function(response) {
                    callback(response);
                })
                .error(function() {
                    callback(false);
                });
        }

        function listRecomendedTenant(idcategory, callback) {
            var req = {
                    method: 'GET',
                    url: 'http://innodev.vnetcloud.com/LiveIn/api/Tenant/?action=listcategoryfilterbyrecommended&idcategory='+idcategory+'&idaccount='+$localStorage.currentUser.data[0].idaccount+'&pagenumber=1&pagesize=1000&keyword=%%'
                }

            $http(req)
                .success(function(response) {
                    callback(response);
                })
                .error(function() {
                    callback(false);
                });
        }

        function retriveGetTenant(idtenant, callback) {
            var req = {
                    method: 'GET',
                    url: 'http://innodev.vnetcloud.com/LiveIn/api/Tenant/?action=retrieve_get&idtenant='+idtenant
                }

            $http(req)
                .success(function(response) {
                    callback(response);
                })
                .error(function() {
                    callback(false);
                });
        }

        function retriveGetTenantImage(idtenant, callback) {
            var req = {
                method: 'GET',
                url: 'http://innodev.vnetcloud.com/LiveIn/api/Gallerytenant/?action=listgallery&pagenumber=1&pagesize=1000'+idtenant
            }

            $http(req)
                .success(function(response) {
                    callback(response);
                })
                .error(function() {
                    callback(false);
                });
        }

        function filterByCategory(idcategory, callback) {
            var req = {
                method: 'GET',
                url: 'http://innodev.vnetcloud.com/LiveIn/api/Category?action=listallchild&idcategory='+idcategory
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
