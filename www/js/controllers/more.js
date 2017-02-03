angular
    .module('livein')
    .controller('more', more);

    function more($translate, $stateParams, $ionicPopup, $ionicLoading, $scope, $window, $localStorage, $cordovaToast, $filter) {
        //translate
        var data = localStorage.getItem('NG_TRANSLATE_LANG_KEY');
        $scope.Tr = data;
        $scope.statLang = false;

        $scope.klikLang = function() {
            if ($scope.statLang == false) {
                $scope.statLang = true;
            } else {
                $scope.statLang = false;
            }
        }

        $scope.switchLanguage = function(langKey) {
            if ($scope.en) {
                langKey = $scope.en;
            } else if ($scope.ina) {
                langKey = $scope.ina;
            }
                
            if($translate.use(langKey)){
                langKey == 'en' ? langKey = 'english' : langKey = 'indonesia';
                var alertPopup = $ionicPopup.alert({
                    template: $filter('translate')('success_language') + langKey,
                    okText: $filter('translate')('okay'),
                    okType: "button-stable",
                    cssClass: "alertPopup"
                });            

                alertPopup.then(function(res) {
                    $window.location.reload();
                });
            }
        };

         $scope.showToast = function(message, duration, location) {
            $cordovaToast.show(message, duration, location).then(function(success) {
                console.log("The toast was shown");
            }, function (error) {
                console.log("The toast was not shown due to " + error);
            });
        }

        notificationsPush();

        function notificationsPush() {
            $scope.status = {};
            $scope.sound = {};

            $scope.status.checked = true;
            $scope.sound.checked = true;

            $scope.pushNotificationChange = function(item) {
                if ($scope.status.checked == true) {
                    $localStorage.notifPush = { 'status': true, 'sound': $localStorage.notifPush.sound };
                } else if ($scope.status.checked == false) {
                    $localStorage.notifPush = { 'status': false, 'sound': $localStorage.notifPush.sound };
                }

                if ($scope.sound.checked == true) {
                    $localStorage.notifPush = { 'status': $localStorage.notifPush.status, 'sound': true };
                } else if ($scope.sound.checked == false) {
                    $localStorage.notifPush = { 'status': $localStorage.notifPush.status, 'sound': false };
                }
            };

        }

    }