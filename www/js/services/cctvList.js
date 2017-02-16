angular
    .module('livein')
    .service('cctv', cctv);

    function cctv($http, $filter) {
        var service = {};

        service.cctvList = cctvList;
        
        return service;

        function cctvList(callback) {
            var req = {
                method: 'GET',
                url: $filter('translate')('apilink') + 'api/Cctv/?action=list&idcity=1&pagenumber=1&pagesize=1000'
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