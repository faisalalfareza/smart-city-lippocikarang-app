angular
    .module('livein')
    .controller('mainTabs', mainTabs);

    function mainTabs($scope, $rootScope, $timeout, $window, $ionicPopup, $localStorage, $ionicLoading, $ionicModal, $ionicSlideBoxDelegate, dataWhatsNew, talktoUs, $filter) {
        $scope.asyncAction = function() {
            // The following code simulates an async action
            return $timeout(() => angular.noop, 3000);
        }      
        
        $scope.fullname = $localStorage.currentUser.data[0].fullname;
        var lang = localStorage.getItem('NG_TRANSLATE_LANG_KEY');
        var pagesize = 5000;

        dataWhatsNew.getDataWhatsNew(lang,pagesize, function(response) {
            $timeout(function() {
                if (response != false) {
                    $scope.data = response;
                    $scope.news = [];
                    var a = 0;
                    angular.forEach($scope.data, function(obj) {
                        var b = a++;
                        var list = $scope.data;
                        var data = list[b];
                        
                        var status = data.status;
                        var idnews = data.idnews;
                        var description = data.description;
                        var gallery = data.gallery;
                        
                        dateString = data.createdate;
                        var d = new Date(dateString.replace(' ', 'T'));

                        var title = data.title;
                        var createdate = new Date(d); 
                        var avatar = data.avatar;

                        $scope.news.push({
                            'status': status,
                            'idnews': idnews,
                            'description': description,
                            'gallery': gallery,

                            'title': title,
                            'createdate': createdate,
                            'avatar': avatar
                        });
                    }); 

                    $ionicSlideBoxDelegate.update();
                } else {
                    $scope.news = [{ name: $filter('translate')('no_news') }];
                }
            }, 500);
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

        $ionicModal.fromTemplateUrl('partials/sides/whatsNewModal.html', {
            scope: $scope
        }).then(function(modalSlider) {
            $scope.modalSlider = modalSlider;
        });

        $scope.openModal = function(list) { 
            $scope.list = list; 

            if(list.gallery == '') {
                $scope.showGallery = false;
            } else {
                $scope.showGallery = true;
                $scope.gallery = list.gallery;
            }
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
