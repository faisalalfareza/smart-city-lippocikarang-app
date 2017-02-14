angular
    .module('livein')
    .service('dataWhatsNew', dataWhatsNew);

    function dataWhatsNew($http) {
        var service = {};

        service.getDataWhatsNew = getDataWhatsNew;

        return service; 

        function getDataWhatsNew(callback) {
            var req = {
                    method: 'GET',
                    cache: true,
                    url: 'http://innodev.vnetcloud.com/LiveIn/api/News/?action=listnews&pagenumber=1&pagesize=1000'
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