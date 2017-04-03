angular
    .module('livein')
    .controller('cctv', cctv);

    function cctv($scope, $ionicLoading, $state, cctv, $filter) {
        
        cctvList();

        function cctvList() {
            $ionicLoading.show({ template: $filter('translate')('loading') + "..." });
            cctv.cctvList(
                function(response) {
                    if (response != false) {
                        $scope.data = response;
                    } else {
                        $scope.data = { name: $filter('translate')('failed_get_data') };
                    }
                    $ionicLoading.hide();
                });
        };
    }