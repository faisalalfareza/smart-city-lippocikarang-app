angular
    .module('livein')
    .controller('gallery', gallery)
    .controller('detailGallery', detailGallery)
    .controller('searchGalleryDetail', searchGalleryDetail)
    .controller('searchGalleryDetailImage',searchGalleryDetailImage);

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
        $scope.updateSlider = function () {
            $ionicSlideBoxDelegate.update(); //or just return the function
        }

        $ionicLoading.show({ template: $filter('translate')('loading') + "..." });
        listGallery.getlistGallery(function(response) {
            $timeout(function(){           
                var gall = $stateParams.index;
                console.log(gall);
                if (response != false) {
                    $scope.image = response;
                    
                    var keys = Object.keys($scope.image);
                    $scope.len = keys.length;
                    
                    $scope.gall = gall;
                    $ionicSlideBoxDelegate.update();

                    var i = 1;
                    $scope.image.forEach(function(itemfile, indexfile, arrfile) {
                        $scope.image[indexfile].number = i++;
                    });
                    
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

    function searchGalleryDetail($scope, $timeout, $ionicLoading, $ionicSlideBoxDelegate, $stateParams, listGallery, $filter) {

        $scope.next = next;
            $scope.previous = previous;
            $scope.updateSlider = function () {
                $ionicSlideBoxDelegate.update(); //or just return the function
            }
            $scope.searchval = $stateParams.searchval;
            $ionicLoading.show({ template: $filter('translate')('loading') + "..." });
            listGallery.getSearchGallery($stateParams.name,function(response) {
                $timeout(function(){           
                    var gall = $stateParams.name;
                    console.log(gall);
                    if (response != false) {
                        $scope.image = response;
                        console.log($scope.image);
                        var keys = Object.keys($scope.image);
                        $scope.len = keys.length;
                        
                        $scope.gall = gall;
                        $ionicSlideBoxDelegate.update();

                        var i = 1;
                        $scope.image.forEach(function(itemfile, indexfile, arrfile) {
                            $scope.image[indexfile].number = i++;
                        });
                        
                    } else {
                        $scope.image = [{ name: $filter('translate')('there_no_gallery') }];
                        console.log('error');
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

    function searchGalleryDetailImage($scope, $timeout, $ionicLoading, $ionicSlideBoxDelegate, $stateParams, listGallery, $filter) {

            $scope.next = next;
            $scope.previous = previous;
            $scope.updateSlider = function () {
                $ionicSlideBoxDelegate.update(); //or just return the function
            }
            $scope.searchval = $stateParams.searchval;
            $ionicLoading.show({ template: $filter('translate')('loading') + "..." });
            listGallery.getSearchGallery($stateParams.gall,function(response) {
                $timeout(function(){           
                    var gall = $stateParams.index;
                    console.log(gall);
                    if (response != false) {
                        $scope.image = response;
                        console.log('133 : ',$scope.image);
                        var keys = Object.keys($scope.image);
                        $scope.len = keys.length;
                        
                        $scope.gall = gall;
                        $ionicSlideBoxDelegate.update();

                        var i = 1;
                        $scope.image.forEach(function(itemfile, indexfile, arrfile) {
                            $scope.image[indexfile].number = i++;
                        });
                        
                    } else {
                        $scope.image = [{ name: $filter('translate')('there_no_gallery') }];
                        console.log('error');
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
    