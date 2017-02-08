angular
    .module('livein')
    .controller('aboutUs', aboutUs);

    function aboutUs($scope, $ionicLoading, $state, AboutUsService, $filter) {
        aboutService();

        function aboutService() {
            $ionicLoading.show({ template: $filter('translate')('loading') + "..." });
            AboutUsService.aboutus(
                function(response) {
                    if (response != false) {
                        $scope.data = response;
                        $scope.openBrowser = function(d) {
                          var url = "http://www.lippo-cikarang.com/";
                          window.open(url, '_blank', 'location=no');
                        }
                    } else {
                        $scope.data = { name: $filter('translate')('failed_get_data') };
                    }
                    $ionicLoading.hide();
                });
        };
    }
