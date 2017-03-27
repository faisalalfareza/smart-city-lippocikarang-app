angular
    .module('livein')
    .controller('eComplaint', eComplaint)
    .controller('eComplaintList', eComplaintList);

    function eComplaint($ionicPlatform, $window, $ionicSlideBoxDelegate, $localStorage, $scope, $state, eComplaintService, $ionicLoading, $ionicPopup, $timeout, $location, $cordovaFile, $cordovaFileTransfer,$cordovaFileOpener2, $filter) {
        ionic.Platform.ready(function () {
            if (localStorage.getItem('tokken') === null) {
                eComplaintService.getToken(function(response) {
                    if (response != false) {
                        var expires = response;
                        $scope.tokken = response;
                        localStorage.setItem('tokken', JSON.stringify($scope.tokken));
                        alert(localStorage.getItem('tokken'));

                        /*var date = new Date('10/27/2014');
                        var currentDate = new Date();
                        var milisecondsDiff = date-currentDate;
                        var secondsDiff = miliseconds/1000;
                        var minutesDiff = seconds/60;
                        var hoursDiff = minutes/60;
                        var daysDiff = hours/24;
                        //if()
                        */
                    } else {
                        alert('gaisa njumuk');
                    }
                });
            } else {
                eComplaintService.getToken(function(response) {
                    if (response != false) {
                        $scope.tokken = response;
                        localStorage.setItem('tokken', JSON.stringify($scope.tokken));
                        alert(localStorage.getItem('tokken'));

                    } else {
                        alert('gaisa njumuk 2');
                    }
                });
            }
        //$ionicLoading.show({ template: $filter('translate')('loading') + "..." });
        //console.log($state.status);
        });
    };

    function eComplaintList($ionicSlideBoxDelegate, $localStorage, $scope, $state, eComplaintService, $ionicLoading, $ionicPlatform, $ionicPopup, $timeout, $location, $cordovaFile, $cordovaFileTransfer,$cordovaFileOpener2, $filter){
        $scope.generals = 'active';

        // general tab & property tab
        var genTab = angular.element(document.querySelector('#generaltab'));
        var proTab = angular.element(document.querySelector('#propertytab'));
        genTab.addClass("active");

        $scope.general = function() {
            $ionicSlideBoxDelegate.previous();
            $scope.generals = 'active';
            $scope.propertys = '';
        };
        $scope.property = function() {
            $ionicSlideBoxDelegate.next();
            $scope.propertys = 'active';
            $scope.generals = '';
        };
        // Called each time the slide changes
        $scope.slideChanged = function(index) {
            $scope.slideIndex = index;
            if ($scope.slideIndex == 1) {
                $scope.generals = '';
                $scope.propertys = 'active';
            } else {
                $scope.propertys = '';
                $scope.generals = 'active';
            }
        };
    };