angular
    .module('livein')
    .controller('useful', useful);

    function useful($scope, $ionicLoading, $state, useful, $filter) {
        listNumber();

        function listNumber() {
            $ionicLoading.show({ template: $filter('translate')('loading') + "..." });
            useful.phoneNumber(
                function(response) {
                    if (response != false) {
                        $scope.data = response;
                        console.log($scope.data);
                    } else {
                        $scope.data = { name: $filter('translate')('failed_get_data') };
                    }
                    $ionicLoading.hide();
                });
        };
    }