angular
    .module('livein')
    .controller('coupon', coupon)
    .controller('worldclock', worldclock)

    function coupon($scope, CouponService, $ionicLoading, $filter) {

        $ionicLoading.show({ template: $filter('translate')('loading') + "...", duration: 1000 });

        CouponService.listCoupon(function(response) {
            if (response != false) {
                $scope.data = response;
            } else {
                $scope.data = [{ name: $filter('translate')('no_user') }];
            }
            $ionicLoading.hide();
        });
    }

    function worldclock($scope, $ionicLoading, $filter) {

        $ionicLoading.show({ template: $filter('translate')('loading') + "...", duration: 1000 });
        $ionicLoading.hide();
        $scope.gmtValue = 7;

        $scope.data = [{
            "city": "Lippo Cikarang",
            "timezone": "Asia/Jakarta",
            "gmtvalue": "7"
        }, {
            "city": "Tokyo",
            "timezone": "Asia/Tokyo",
            "gmtvalue": "9"
        }, {
            "city": "Seoul",
            "timezone": "Asia/Seoul",
            "gmtvalue": "9"
        }, {
            "city": "Sydney",
            "timezone": "Australia/Sydney",
            "gmtvalue": "10"
        }, {
            "city": "Amsterdam",
            "timezone": "Europe/Amsterdam",
            "gmtvalue": "1"
        }, {
            "city": "Prague",
            "timezone": "Europe/Prague",
            "gmtvalue": "1"
        }]
    }