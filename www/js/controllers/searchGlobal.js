angular
    .module('livein')
    .controller('searchGlobal', searchGlobal);

    function searchGlobal($scope, $timeout, $rootScope, $window, $ionicLoading, $ionicModal, $ionicSlideBoxDelegate, $ionicPopup, $location, $state, $stateParams, searchService, $filter) {
        $rootScope.searchKeyword = $stateParams.name;
        $scope.cari = searchService;
        //gallery

        $scope.next = function() {
            $ionicSlideBoxDelegate.next();
        };

        $scope.previous = function() {
            $ionicSlideBoxDelegate.previous();
        };

        $ionicLoading.show({ template: $filter('translate')('loading') + "..." });
        searchService.searchingGallery($stateParams.name, function(response) {
            $ionicSlideBoxDelegate.update();
            $scope.gallPict = $stateParams.index;

            setTimeout(function() {
                $scope.gallPict = $stateParams.index;
            }, 1);

            if (response != false) {
                $ionicSlideBoxDelegate.update();
                $scope.listCount = Object.keys(response).length;
                $scope.detailGallery = response;
                $scope.name = $stateParams.name;
                //var gall = $stateParams.index;      
            } else {
                //$window.location.reload();
                console.log('error');
            }
            $ionicLoading.hide();

        });

        $ionicLoading.show({ template: $filter('translate')('loading') + "..." });
        searchService.searching($stateParams.name, function(response) {
            if (response != false) {
                $scope.data = response;
                $scope.name = $stateParams.name;

                    $scope.citygallery = response.citygallery;
                    $scope.listCgCount = response.citygallery[0].count;

                    $scope.disc = response.discountcoupon;
                    $scope.listDcCount = response.discountcoupon[0].count;

                    $scope.news = response.news;
                    $scope.listNewsCount = response.news[0].count;

                    $scope.property = response.property;
                    $scope.listProCount = response.property[0].count;

                    $scope.tenants = response.tenants;
                    $scope.listTenCount = response.tenants[0].count;

            } else {
                console.log('error');
            }
            $ionicLoading.hide();

        });

        //tenants
        searchService.searchingTenants($stateParams.name, function(response) {
            if (response != false) {
                $timeout(function(){ 
                    $scope.detailTenants = response;
                    $scope.lengthTenants = $scope.detailTenants.length;
                    $scope.name = $stateParams.name;
                    $scope.page = 1;
                },1000);
                
            } else {
                console.log('error');
            }
            $ionicLoading.hide();

        });


        //property
        searchService.searchingProperty($stateParams.name, function(response) {
            if (response != false) {
                $scope.detailProperty = response;
                $scope.name = $stateParams.name;
                $scope.lengthProperty = $scope.detailProperty.length;
            } else {
                console.log('error');
            }
            $ionicLoading.hide();

        });
        //discountcoupon
        searchService.searchingDiscount($stateParams.name, function(response) {
            if (response != false) {
                $scope.detailDiscount = response;
                $scope.name = $stateParams.name;
                $scope.lengthDiscount = $scope.detailDiscount.length;
            } else {
                console.log('error');
            }
            $ionicLoading.hide();

        });
        //news      
        searchService.searchingNews($stateParams.name, function(response) {
            if (response != false) {
                $scope.detailNews = response;
                $scope.name = $stateParams.name;
                $scope.lengthNews = $scope.detailNews.length;
            } else {
                console.log('error');
            }
            $ionicLoading.hide();

        });

        $ionicModal.fromTemplateUrl('partials/sides/modalSlider.html', {
            scope: $scope
        }).then(function(modalSlider) {
            $scope.modalSlider = modalSlider;
        });

        $ionicModal.fromTemplateUrl('partials/sides/whatsNewModal.html', {
            scope: $scope
        }).then(function(modalNews) {
            $scope.modalNews = modalNews;
        });

        $scope.openModal = function(list) {
            $scope.list = list;
            $scope.modalSlider.show();
        };

        $scope.openModalNews = function(list) {
            $scope.list = list;
            $scope.modalNews.show();
        };

        $scope.closeModal = function() {
            $scope.modalNews.hide();
        };

        $scope.closeModalSlider = function() {
            $scope.modalSlider.hide();
        };

        // Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modalSlider.remove();
        });
        // Execute action on hide modal
        $scope.$on('modalSlider.hide', function() {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modalSlider.removed', function() {
            // Execute action
        });
        $scope.$on('modalSlider.shown', function() {
            console.log('Modal is shown!');
        });

        // Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modalNews.remove();
        });
        // Execute action on hide modal
        $scope.$on('modalNews.hide', function() {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modalNews.removed', function() {
            // Execute action
        });
        $scope.$on('modalNews.shown', function() {
            console.log('Modal is shown!');
        });

        $scope.slideChanged = function() {
            $ionicSlideBoxDelegate.update();
        };
        $ionicSlideBoxDelegate.update();
    }