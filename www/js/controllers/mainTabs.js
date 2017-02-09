angular
    .module('livein')
    .controller('mainTabs', mainTabs);

    function mainTabs($scope, $localStorage, $ionicLoading, $ionicModal, $ionicSlideBoxDelegate, dataWhatsNew, talktoUs, $filter) {
        $scope.fullname = $localStorage.currentUser.data[0].fullname;
        dataWhatsNew.getDataWhatsNew(function(response) {
            setTimeout(function() {
                if (response != false) {
                    $scope.news = response;
                    $ionicSlideBoxDelegate.update();
                } else {
                    $scope.news = [{ name: $filter('translate')('no_news') }];
                }
            }, 1);
        });
        talktoUs.getTalktoUs(function(response) {
            if (response != false) {
                $scope.data = response;
            } else {
                $scope.data = [{ name: $filter('translate')('no_data') }];
            }
            $ionicLoading.hide();
        });

        //modal talkToUs 
        $ionicModal.fromTemplateUrl('partials/sides/talktoUs.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });
        
        $scope.openTalkto = function(index) {
            $scope.modal.show();
        };

        $scope.closeModal = function() {
            $scope.modal.hide();
            $scope.modalSlider.hide();
        };
        
        //modal slider on main
        $ionicModal.fromTemplateUrl('partials/sides/whatsNewModal.html', {
            scope: $scope
        }).then(function(modalSlider) {
            $scope.modalSlider = modalSlider;
        });

        $scope.openModal = function(list) {
            $scope.list = list;
            $scope.modalSlider.show();
        };

        $scope.closeModalSlider = function() {
            $scope.modalSlider.hide();
        };

        // Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hide', function() {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
            // Execute action
        });
        $scope.$on('modal.shown', function() {
            console.log('Modal is shown!');
        });

        // Called each time the slide changes
        $scope.slideChanged = function(index) {
            $scope.slideIndex = index;
        };

        $scope.next = function() {
            $ionicSlideBoxDelegate.next();
        };

        $scope.previous = function() {
            $ionicSlideBoxDelegate.previous();
        };
    }
