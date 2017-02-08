angular
    .module('livein')
    .controller('publictransportation', publictransportation)

    function publictransportation($scope, $state, $stateParams, $window, publictransportationService, $ionicLoading, $ionicPopup, $filter) {

        listpublictransportation();

        function listpublictransportation() {
            $ionicLoading.show({ template: $filter('translate')('loading') + "...", duration: 1000 });
            publictransportationService.listpublictransport(function(response) {
                if (response != false) {
                    $scope.data = response;
                } else {
                    $scope.data = [{ name: $filter('translate')('no_data') }];
                }
                $ionicLoading.hide();
            });
        };

    }