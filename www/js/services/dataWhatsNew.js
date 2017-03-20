angular
    .module('livein')
    .service('dataWhatsNew', dataWhatsNew);

    function dataWhatsNew($http, $filter) {
        var service = {};

        service.getDataWhatsNew = getDataWhatsNew;

        return service; 

        function getDataWhatsNew(pagesize,callback) {
            var req = {
                    method: 'GET',
                    cache: true,
                    url: $filter('translate')('apilink') + 'api/News/?action=listnews&pagenumber=1&pagesize='+pagesize
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