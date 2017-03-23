angular
    .module('livein')
    .service('dataWhatsNew', dataWhatsNew);

    function dataWhatsNew($http, $filter) {
        var service = {};

        service.getDataWhatsNew = getDataWhatsNew;
        service.getDataWhatsNewSide = getDataWhatsNewSide;

        return service; 

        function getDataWhatsNew(lang,pagesize,callback) {
            var req = {
                    method: 'GET',
                    cache: true,
                    url: $filter('translate')('apilink') + 'api/News/?action=listnews&pagenumber=1&pagesize='+pagesize+'&lang='+lang
                }

            $http(req)
                .success(function(response) {
                    callback(response);
                })
                .error(function() {
                    callback(false);
                });
        }

        function getDataWhatsNewSide(pagenumber,lang,callback) {
            var req = {
                    method: 'GET',
                    cache: true,
                    url: $filter('translate')('apilink') + 'api/News/?action=listnews&pagenumber='+pagenumber+'&pagesize=2&lang='+lang
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