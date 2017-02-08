angular
    .module('livein')
    .service('CouponService', CouponService);

    function CouponService($http) {
        var service = {};
        service.listCoupon = listCoupon;
        return service;

        function listCoupon(callback) {
            var req = {
                method: 'GET',
                url: 'http://innodev.vnetcloud.com/LiveIn/api/Discountcoupon/?action=listdiscountcoupon&pagenumber=1&pagesize=10'
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
