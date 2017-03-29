angular
    .module('livein')
    .service('listGallery', listGallery);

    function listGallery($http, $filter) {
        var service = {};

        service.getlistGallery = getlistGallery;
        service.getSearchGallery = getSearchGallery;

        return service;

        function getlistGallery(callback) {
            var req = {
                method: 'GET',
                url: $filter('translate')('apilink') + 'api/City/?action=listgallery&pagesize=1000&pagenumber=1&idcity=1'
            }

            $http(req)
                .success(function(response) {
                    callback(response);
                })
                .error(function() {
                    callback(false);
                });
        }

        function getSearchGallery(name,callback) {
            var req = {
                method: 'GET',
                url: $filter('translate')('apilink') + 'api/City/?action=listgalleryfilterbyname&pagesize=1000&pagenumber=1&idcity=1&keyword=%25' + name + '%25'
            }
            console.log(req);
            $http(req)
                .success(function(response) {
                    callback(response);
                })
                .error(function() {
                    callback(false);
                });
        }
    }