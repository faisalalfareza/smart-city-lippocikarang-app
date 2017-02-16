angular
    .module('livein')
    .service('CouponService', CouponService);

    function CouponService($http, $filter) {
        var service = {};

        service.listCoupon = listCoupon;
        
        return service;

        function listCoupon(callback) {
            var req = {
                method: 'GET',
                url: $filter('translate')('apilink') + 'api/Discountcoupon/?action=listdiscountcoupon&pagenumber=1&pagesize=10'
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
