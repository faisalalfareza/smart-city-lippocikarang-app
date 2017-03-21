angular
    .module('livein')
    .controller('searchGlobal', searchGlobal);

    function searchGlobal($scope, $timeout, $rootScope, $window, $ionicLoading, $ionicModal, $ionicSlideBoxDelegate, $ionicPopup, $location, $state, $stateParams, searchService, $filter) {
        $rootScope.searchKeyword = $stateParams.name;
        $scope.cari = searchService;
        //gallery

        $scope.next = next;
        $scope.previous = previous;
        $scope.updateSlider = function () {
            $ionicSlideBoxDelegate.update(); //or just return the function
        }

        $ionicLoading.show({ template: $filter('translate')('loading') + "..." });
        searchService.searchingGallery($stateParams.name, function(response) {        
            $timeout(function(){           
                var gall = $stateParams.index;
                if (response != false) {
                    $scope.name = $stateParams.name;
                    $scope.listCount = Object.keys(response).length;
                    $scope.detailGallery = response;
                    
                    var keys = Object.keys($scope.detailGallery);
                    $scope.len = keys.length;
                    
                    $scope.gall = gall;
                    console.log($scope.gall);
                    $ionicSlideBoxDelegate.update();
                    //
                    var i = 1;
                    $scope.detailGallery.forEach(function(itemfile, indexfile, arrfile) {
                        $scope.detailGallery[indexfile].number = i++;
                    });
                    console.log('image e bor :', $scope.image);
                    
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

        $ionicLoading.show({ template: $filter('translate')('loading') + "..." });
        searchService.searching($stateParams.name, function(response) {
            if (response != false) {
                $scope.data = response;
                $scope.name = $stateParams.name;

                    if (response.citygallery != null) {
                        $scope.citygallery = response.citygallery;
                        $scope.listCgCount = response.citygallery[0].count;
                    }

                    if (response.discountcoupon != null) {
                        $scope.disc = response.discountcoupon;
                        $scope.listDcCount = response.discountcoupon[0].count;
                    }

                    if (response.news != null) {
                        $scope.news = response.news;
                        $scope.listNewsCount = response.news[0].count;
                    }

                    if (response.property != null) {
                        $scope.property = response.property;
                        $scope.listProCount = response.property[0].count;
                    }

                    if (response.tenants != null) {
                        $scope.tenants = response.tenants;
                        $scope.listTenCount = response.tenants[0].count;
                    }

            } else {
                console.log('error');
            }
            $ionicLoading.hide();

        });

        $scope.detailTenants = [];

        var pagenumber = 1;
        //tenants
        searchService.searchingTenants($stateParams.name, pagenumber, function(response) {
            searchService.tenantTotal($stateParams.name, function(total) {
                $scope.dt = total;
                $scope.lengthTenants = $scope.dt.length;
                console.log($scope.lengthTenants);
            })
            if (response != false) {
                //$timeout(function(){ 
                    $scope.detailTenants = response;
                    //$scope.lengthTenants = $scope.detailTenants.length;
                    $scope.name = $stateParams.name;
                    $scope.page = 1;
                //},1000);

                var i = 2;
                    $scope.loadTenant = function () {
                        //for(var i = 2; i < $scope.data.length;i++){
                        //a = $scope.data.length / 10;
                        //console.log(a);
                            pagenumber = i;
                            
                            searchService.searchingTenants($stateParams.name, pagenumber, function(response){
                                if(response){
                                    $scope.detailTenants = $scope.detailTenants.concat(response);
                                } else {
                                    console.log('no more data loaded');
                                }
                            });

                            $scope.$broadcast('scroll.infiniteScrollComplete');
                            i++;
                    };
                
            } else {
                console.log('error');
            }
            $ionicLoading.hide();

        });


        $scope.detailProperty = [];

        var pagenumberpro = 1;
        //property
        searchService.searchingProperty($stateParams.name, pagenumberpro, function(response) {

            searchService.propertyTotal($stateParams.name, function(total) {
                $scope.dp = total;
                $scope.lengthProperty = $scope.dp.length;
                console.log($scope.lengthTenants);
            })
            
            if (response != false) {
                $scope.detailProperty = response;
                $scope.name = $stateParams.name;      

                var i = 2;
                    $scope.loadPro = function () {
                            pagenumberpro = i;
                            
                            searchService.searchingProperty($stateParams.name, pagenumberpro, function(response){
                                if(response){
                                    $scope.detailProperty = $scope.detailProperty.concat(response);
                                } else {
                                    console.log('no more data loaded');
                                }
                            });

                            $scope.$broadcast('scroll.infiniteScrollComplete');
                            i++;
                    };

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
            $scope.modalNews.hide();
        };

        // Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modalNews.remove();
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