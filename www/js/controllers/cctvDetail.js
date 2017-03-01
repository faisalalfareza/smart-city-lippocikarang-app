angular
    .module('livein')
    .controller('cctvFull', cctvFull)
    .controller('cctvDetail', cctvDetail);

    function cctvDetail($scope,$timeout,$window, $state, $ionicLoading, $ionicNavBarDelegate, $ionicSlideBoxDelegate, $stateParams, $ionicHistory, $ionicModal, cctv, $filter, $sce) {
      //alert('Orientation is ' + JSON.stringify(screen.orientation));
      screen.lockOrientation('portrait');
      $ionicNavBarDelegate.showBackButton(false);
      $scope.myGoBack = function() {
        $state.go('app.cctvList');
      };
      $ionicLoading.show({ template: $filter('translate')('loading') + "..." });

        cctv.cctvList(function(response) {
            if (response != false) {
                $scope.detail = response;

                if(gall != $stateParams.index){
                  var gall = $stateParams.index;
                } else if(gall != $stateParams.gall){
                  var gall = $stateParams.gall;
                }

                $scope.gall = gall;
                $scope.max = 9;
                $scope.min = 0;

                //$scope.listDetail = $scope.detail[gall].link;

                //var videoUrl = $scope.listDetail;
                var uri = "http://innodev.vnetcloud.com/cctv-client/?port=";

                if(gall == '0'){
                  $scope.bahasa = $sce.trustAsResourceUrl(uri + "9990");
                  $scope.port = "9990";
                  $scope.name = 'Cibatu (Helipad)';
                }else if(gall == '1'){
                  $scope.bahasa = $sce.trustAsResourceUrl(uri + "9991");
                  $scope.port = "9991";
                  $scope.name = 'Cibatu (Arah Pintu Tol)';
                }else if(gall == '2'){
                  $scope.bahasa = $sce.trustAsResourceUrl(uri + "9992");
                  $scope.port = "9992";
                  $scope.name = 'Cibatu (Arah Maxxbox)';
                }else if(gall == '3'){
                  $scope.bahasa = $sce.trustAsResourceUrl(uri + "9993");
                  $scope.port = "9993";
                  $scope.name = 'Maxxbox , Orange Country';
                }else if(gall == '4'){
                  $scope.bahasa = $sce.trustAsResourceUrl(uri + "9994");
                  $scope.port = "9994";
                  $scope.name = 'Maxxbox , Orange Country';
                }else if(gall == '5'){
                  $scope.bahasa = $sce.trustAsResourceUrl(uri + "9995");
                  $scope.port = "9995";
                  $scope.name = 'Bunderan Cibodas (Arah Masuk Cluster)';
                }else if(gall == '6'){
                  $scope.bahasa = $sce.trustAsResourceUrl(uri + "9996");
                  $scope.port = "9996";
                  $scope.name = 'MG Mataram (Arah Deltamas)';
                }else if(gall == '7'){
                  $scope.bahasa = $sce.trustAsResourceUrl(uri + "9997");
                  $scope.port = "9997";
                  $scope.name = 'Bunderan Cibodas (Arah Jl. Mataram)';
                }else if(gall == '8'){
                  $scope.bahasa = $sce.trustAsResourceUrl(uri + "9998");
                  $scope.port = "9998";
                  $scope.name = 'MG Mataram (Arah Residential)';
                }else if(gall == '9'){
                  $scope.bahasa = $sce.trustAsResourceUrl(uri + "9999");
                  $scope.port = "9999";
                  $scope.name = 'MG Mataram (Arah OC)';
                }

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

      function cctvFull($scope, $state, $timeout, $ionicLoading, $ionicSlideBoxDelegate, $stateParams, $ionicHistory, $ionicModal, cctv, $filter, $sce) {
        //$timeout(function () {
       // $timeout(function () {

        $ionicLoading.show({ template: $filter('translate')('loading') + "..." });
        var gall = $stateParams.gall;
        $scope.gall = gall;
          if(gall != null){
            StatusBar.hide();

            var uri = "http://innodev.vnetcloud.com/cctv-client/?port=";

            if(gall == '0'){
              $scope.bahasa = $sce.trustAsResourceUrl(uri + "9990");
              $scope.port = "9990";
              $scope.name = 'Cibatu (Helipad)';
            }else if(gall == '1'){
              $scope.bahasa = $sce.trustAsResourceUrl(uri + "9991");
              $scope.port = "9991";
              $scope.name = 'Cibatu (Arah Pintu Tol)';
            }else if(gall == '2'){
              $scope.bahasa = $sce.trustAsResourceUrl(uri + "9992");
              $scope.port = "9992";
              $scope.name = 'Cibatu (Arah Maxxbox)';
            }else if(gall == '3'){
              $scope.bahasa = $sce.trustAsResourceUrl(uri + "9993");
              $scope.port = "9993";
              $scope.name = 'Maxxbox , Orange Country';
            }else if(gall == '4'){
              $scope.bahasa = $sce.trustAsResourceUrl(uri + "9994");
              $scope.port = "9994";
              $scope.name = 'Maxxbox , Orange Country';
            }else if(gall == '5'){
              $scope.bahasa = $sce.trustAsResourceUrl(uri + "9995");
              $scope.port = "9995";
              $scope.name = 'Bunderan Cibodas (Arah Masuk Cluster)';
            }else if(gall == '6'){
              $scope.bahasa = $sce.trustAsResourceUrl(uri + "9996");
              $scope.port = "9996";
              $scope.name = 'MG Mataram (Arah Deltamas)';
            }else if(gall == '7'){
              $scope.bahasa = $sce.trustAsResourceUrl(uri + "9997");
              $scope.port = "9997";
              $scope.name = 'Bunderan Cibodas (Arah Jl. Mataram)';
            }else if(gall == '8'){
              $scope.bahasa = $sce.trustAsResourceUrl(uri + "9998");
              $scope.port = "9998";
              $scope.name = 'MG Mataram (Arah Residential)';
            }else if(gall == '9'){
              $scope.bahasa = $sce.trustAsResourceUrl(uri + "9999");
              $scope.port = "9999";
              $scope.name = 'MG Mataram (Arah OC)';
            }

              //if($scope.bahasa){
                screen.lockOrientation('landscape');
                //$scope.diputar = $scope.bahasa;
                //alert($scope.bahasa);
              //}

            $scope.listPindah = function () {
              screen.lockOrientation('portrait');
              $state.go('app.cctvList');
            }
          }
        $ionicLoading.hide();
        //},100);
      };
