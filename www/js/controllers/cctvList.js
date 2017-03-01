angular
    .module('livein')
    .controller('cctv', cctv);

    function cctv($scope , $window,$location,$route,$timeout, $ionicLoading, $state, cctv, $filter) {
                 //$ionicLoading.show({ template: $filter('translate')('loading') + "..." });
      $timeout(function () {
            cctv.cctvList(
                function(response) {
                    if (response != false) {
                        $scope.data = response;
                    } else {
                        $scope.data = { name: $filter('translate')('failed_get_data') };
                    }
                    //$ionicLoading.hide();
                });
      },100);
    }
