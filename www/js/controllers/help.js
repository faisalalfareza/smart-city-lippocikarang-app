angular
    .module('livein')
    .controller('callCenter', callCenter)
    .controller('aboutHelp', aboutHelp);

    function callCenter($scope, $ionicLoading, $state, help, $filter) {
        callCenter();

        function callCenter() {
            $ionicLoading.show({ template: $filter('translate')('loading') + "..." });
            help.callCenter(
                function(response) {
                    if (response != false) {
                        $scope.data = response;
                    } else {
                        $scope.data = { name: $filter('translate')('failed_get_data') };
                    }
                    $ionicLoading.hide();
                });
        };
    }

    function aboutHelp($scope, $ionicModal, $sce, $localStorage) {
        $scope.lang = localStorage.getItem('NG_TRANSLATE_LANG_KEY');

        if ($scope.lang == 'ina') {
            tentangLink = "http://innodev.vnetcloud.com/LiveInWeb/assets/file/city/tentang_in.html";
            privacyLink = "http://innodev.vnetcloud.com/LiveInWeb/assets/file/city/kebijakan_privasi_in.html";
            ketentuanLink = "http://innodev.vnetcloud.com/LiveInWeb/assets/file/city/syarat_ketentuan_in.html";
        } else {
            tentangLink = "http://innodev.vnetcloud.com/LiveInWeb/assets/file/city/tentang_en.html";
            privacyLink = "http://innodev.vnetcloud.com/LiveInWeb/assets/file/city/kebijakan_privasi_en.html";
            ketentuanLink = "http://innodev.vnetcloud.com/LiveInWeb/assets/file/city/syarat_ketentuan_en.html";
        }

        $scope.privacyLink = $sce.trustAsResourceUrl(privacyLink);
        $scope.tentangLink = $sce.trustAsResourceUrl(tentangLink);
        $scope.ketentuanLink = $sce.trustAsResourceUrl(ketentuanLink);

        $ionicModal.fromTemplateUrl('partials/sides/modalPrivacy.html', {
            scope: $scope
        }).then(function(modalHelp) {
            $scope.modalHelp = modalHelp;
        });

        $scope.openPrivacy = function() {
            $scope.modalHelp.show();
        };

        $ionicModal.fromTemplateUrl('partials/sides/modalTerms.html', {
            scope: $scope
        }).then(function(modalTerms) {
            $scope.modalTerms = modalTerms;
        });

        $scope.openTerms = function() {
            $scope.modalTerms.show();
        };

        $scope.closeModal = function() {
            $scope.modalHelp.hide();
            $scope.modalTerms.hide();
        };

        // Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modalHelp.remove();
            $scope.modalTerms.remove();
        });
    }