angular
    .module('livein')
    .controller('cctvDetail', cctvDetail);

    function cctvDetail($scope, $ionicLoading, $ionicSlideBoxDelegate, $stateParams, $state, cctv, $filter) {

        $ionicLoading.show({ template: $filter('translate')('loading') + "..." });
        cctv.cctvList(function(response) {
            if (response != false) {
                $scope.detail = response;
                var gall = $stateParams.index;
                $scope.gall = gall;

                $scope.listDetail = $scope.detail[gall].link;

                var videoUrl = $scope.listDetail;

                /*// Just play a video 
                window.plugins.streamingMedia.playVideo(videoUrl);
                // Play a video with callbacks
                var options = {
                    bgColor: "#000",
                    //bgImage: "<SWEET_BACKGROUND_IMAGE>",
                    bgImageScale: "fit", // other valid values: "stretch"
                    initFullscreen: false, // true(default)/false iOS only
                    successCallback: function() {
                        console.log("Video was closed without error.");
                    },
                    errorCallback: function(errMsg) {
                        console.log("Error! " + errMsg);
                    },
                    orientation: 'landscape'
                //};*/
                //window.plugins.streamingMedia.playVideo(videoUrl, options);
                //$scope.video = StreamingMedia.(videoUrl, options);
            } else {
                $scope.data = { name: $filter('translate')('failed_get_data') };
            }
            $ionicLoading.hide();
        });
        //$ionicHistory.goBack();
        $scope.slideChanged = function() {
            $ionicSlideBoxDelegate.update();
        };
    };