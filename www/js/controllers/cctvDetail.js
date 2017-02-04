angular
    .module('livein')
    .controller('cctvFull', cctvFull)
    .controller('cctvDetail', cctvDetail);

    function cctvDetail($scope, $ionicLoading, $ionicSlideBoxDelegate, $stateParams, $ionicModal, cctv, $filter, $sce) {
        $ionicLoading.show({ template: $filter('translate')('loading') + "..." });
        cctv.cctvList(function(response) {
            if (response != false) {
                $scope.detail = response;
                var gall = $stateParams.index;
                $scope.gall = gall;

                $scope.listDetail = $scope.detail[gall].link;

                var videoUrl = $scope.listDetail;
                var uri = "http://innodev.vnetcloud.com/cctv-client/?port=";

                if(gall == '0'){
                  $scope.bahasa = $sce.trustAsResourceUrl(uri + "9990");
                }else if(gall == '1'){
                  $scope.bahasa = $sce.trustAsResourceUrl(uri + "9991");
                }else if(gall == '2'){
                  $scope.bahasa = $sce.trustAsResourceUrl(uri + "9992");
                }else if(gall == '3'){
                  $scope.bahasa = $sce.trustAsResourceUrl(uri + "9993");
                }else if(gall == '4'){
                  $scope.bahasa = $sce.trustAsResourceUrl(uri + "9994");
                }else if(gall == '5'){
                  $scope.bahasa = $sce.trustAsResourceUrl(uri + "9995");
                }else if(gall == '6'){
                  $scope.bahasa = $sce.trustAsResourceUrl(uri + "9996");
                }else if(gall == '7'){
                  $scope.bahasa = $sce.trustAsResourceUrl(uri + "9997");
                }else if(gall == '8'){
                  $scope.bahasa = $sce.trustAsResourceUrl(uri + "9998");
                }else if(gall == '9'){
                  $scope.bahasa = $sce.trustAsResourceUrl(uri + "9999");
                }

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

              $scope.playFull = function() {
                $scope.showModal('#/app/cctvFull.html');
              }

              $scope.showModal = function(templateUrl) {
                $ionicModal.fromTemplateUrl(templateUrl, {
                  scope: $scope,
                  animation: 'slide-in-up'
                }).then(function(modal) {
                  $scope.modal = modal;
                  $scope.modal.show();
                });
              }

              $scope.closeModal = function() {
                $scope.modal.hide();
                $scope.modal.remove()
              };

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

      function cctvFull($scope, $ionicModal, $ionicSlideBoxDelegate, $stateParams, cctv) {
        cctv.cctvList(function(response) {
          if (response != false) {
            $scope.detail = response;
            var gall = $stateParams.index;
            $scope.gall = gall;

            $scope.listDetail = $scope.detail[gall].link;

            var videoUrl = $scope.listDetail;
          }
        });
        //$ionicHistory.goBack();
        $scope.slideChanged = function() {
          $ionicSlideBoxDelegate.update();
        };

        $scope.closeModal = function() {
          $scope.modal.hide();
          $scope.modal.remove()
        };
    };
