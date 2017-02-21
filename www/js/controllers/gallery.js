angular
    .module('livein')
    .controller('gallery', gallery)
    .controller('detailGallery', detailGallery);

    function gallery($scope, $ionicLoading, $ionicModal, $ionicSlideBoxDelegate, listGallery, $filter) {
        $ionicLoading.show({ template: $filter('translate')('loading') + "..." });

        listGallery.getlistGallery(function(response) {
            if (response != false) {
                $scope.images = response;
            } else {
                $scope.images = [{ name: $filter('translate')('there_no_gallery') }];
            }
            $ionicLoading.hide();
        });
    }
    
    function detailGallery($scope, $timeout, $ionicLoading, $ionicSlideBoxDelegate, $stateParams, listGallery, $filter) {

        $scope.next = next;
        $scope.previous = previous;

        $ionicLoading.show({ template: $filter('translate')('loading') + "..." });
        listGallery.getlistGallery(function(response) {
            $timeout(function(){           
                var gall = $stateParams.index;
                if (response != false) {
                    $scope.image = response;
                    
                    $scope.gall = gall;
                    console.log($scope.gall);
                    $ionicSlideBoxDelegate.update();
                } else {
                    $scope.image = [{ name: $filter('translate')('there_no_gallery') }];
                }
            }, 1000);
        $ionicLoading.hide();
        });

        function next() {
            $ionicSlideBoxDelegate.next();
        };

        function previous() {
            $ionicSlideBoxDelegate.previous();
        };

        $scope.slideChanged = function() {
            $ionicSlideBoxDelegate.update();
        };

    }