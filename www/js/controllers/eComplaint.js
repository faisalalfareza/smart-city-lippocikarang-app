angular
    .module('livein')
    .controller('eComplaint', eComplaint)
    .controller('eComplaintList', eComplaintList);

    function eComplaint($ionicPlatform, $window, $ionicSlideBoxDelegate, $localStorage, $scope, $state, eComplaintService, $ionicLoading, $ionicPopup, $timeout, $location, $cordovaFile, $cordovaFileTransfer,$cordovaFileOpener2, $filter) {
        ionic.Platform.ready(function () {
        $ionicLoading.show({ template: $filter('translate')('loading') + "..." });
        //console.log($state.status);
        eComplaintService.getToken(function(response) {
            if (response != false) {
                console.log('response : ' , response);
            }
        });

        });
    };

    function eComplaintList($ionicSlideBoxDelegate, $localStorage, $scope, $state, eComplaintService, $ionicLoading, $ionicPlatform, $ionicPopup, $timeout, $location, $cordovaFile, $cordovaFileTransfer,$cordovaFileOpener2, $filter){
        $scope.track = 'active';
        console.log('hallo',$scope.track);
        // general tab & property tab
        var genTab = angular.element(document.querySelector('#tracktab'));
        var proTab = angular.element(document.querySelector('#addtab'));
        genTab.addClass("active");

        $scope.track = function() {
            $ionicSlideBoxDelegate.previous();
            $scope.track = 'active';
            $scope.add = '';
        };
        $scope.add = function() {
            $ionicSlideBoxDelegate.next();
            $scope.add = 'active';
            $scope.track = '';
        };
        // Called each time the slide changes
        $scope.slideChanged = function(index) {
            $scope.slideIndex = index;
            if ($scope.slideIndex == 1) {
                $scope.track = '';
                $scope.add = 'active';
            } else {
                $scope.add = '';
                $scope.track = 'active';
            }
        };
        
        console.log('hallo track',$scope.add);
    };