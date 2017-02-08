angular
    .module('livein')
    .controller('forget', forget);

    function forget($scope, $stateParams, $state, $ionicLoading, ForgetPasswordService, $ionicModal, $ionicPopup, $location, $rootScope, $filter) {
        $scope.startApp = function() {
            $state.go('login');
        };

        $scope.forgetPassword = forgetPassword;

        function forgetPassword(detail) {
            $scope.data = {};
            console.log(detail.contact);
            $ionicLoading.show({ template: $filter('translate')('loading') + "..." });
            ForgetPasswordService.forgetPassword(
                detail.contact,
                function(response) {
                    if (response != false) {
                        $scope.detail = response;
                        console.log(response);
                        $rootScope.dataContact = response[0];
                        $rootScope.idaccount = response[0].idaccount;
                        var idaccount = $rootScope.idaccount;
                        $ionicLoading.show({ template: $filter('translate')('loading') + "..." });


                        ForgetPasswordService.genCode(
                            response[0].idaccount,
                            response[0].type,
                            response[0].contact,
                            function(response) {
                                if (response != false) {
                                    $scope.detail = response;
                                    console.log(response);
                                    var myPopup = $ionicPopup.show({
                                            template: '<input type="number" ng-model="data.code"><br>' +
                                                '<a ng-click="resendPassword()" style="text-align:center" class="col">' + $filter('translate')('resend_code') + '</a>',
                                            title: $filter('translate')('send_code'),
                                            scope: $scope,
                                            buttons: [
                                                { text: $filter('translate')('cancel') },
                                                {
                                                    text: $filter('translate')('verify'),
                                                    type: 'button-positive'
                                                }
                                            ]
                                        },
                                        $scope,
                                        function(myPopup) {
                                            ForgetPasswordService.genCode(
                                                $rootScope.dataContact.idaccount,
                                                $rootScope.dataContact.type,
                                                $rootScope.dataContact.contact,
                                                function(response) {
                                                    if (response != false) {
                                                        $scope.detail = response;
                                                        console.log(response);
                                                    } else {
                                                        var alertPopup = $ionicPopup.alert({
                                                            title: $filter('translate')('cannot_send_code'),
                                                            okText: $filter('translate')('okay'),
                                                            cssClass: "alertPopup"
                                                        }); //tetap di halaman register//muncul alert phone or email alredy exist->dari api persis
                                                    }
                                                });
                                        }
                                    );

                                    myPopup.then(function(res) {
                                        console.log($scope.data.code);
                                        console.log(idaccount);

                                        ForgetPasswordService.checkCode(
                                            idaccount,
                                            $scope.data.code,
                                            function(response) {
                                                if (response != false) {
                                                    console.log(response);
                                                    console.log(idaccount);
                                                    $rootScope.idaccount = idaccount;
                                                    $state.go('reset');
                                                } else {
                                                    $ionicLoading.show({
                                                        template: $filter('translate')('number_not_valid'),
                                                        duration: 3000
                                                    });
                                                }
                                            });
                                    });

                                } else {
                                    var alertPopup = $ionicPopup.alert({
                                        title: $filter('translate')('cannot_send_code'),
                                        okText: $filter('translate')('okay'),
                                        cssClass: "alertPopup"
                                    }); //tetap di halaman register//muncul alert phone or email alredy exist->dari api persis
                                }
                            });
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            title: $filter('translate')('email_not_exist'),
                            okText: $filter('translate')('okay'),
                            cssClass: "alertPopup"
                        }); //tetap di halaman register//muncul alert phone or email alredy exist->dari api persis
                    }
                    $ionicLoading.hide();
                });
        };

        $scope.resetPassword = resetPassword;

        function resetPassword(data) {
            console.log($rootScope.idaccount + data.password);
            $ionicLoading.show({ template: $filter('translate')('loading') + "..." });
            var password = data.password;
            if (data.password.length >= 8) {
                if (data.password != data.repassword) {
                    $ionicLoading.show({
                        template: $filter('translate')('not_equal'),
                        duration: 3000
                    });
                } else {
                    ForgetPasswordService.changePassword(
                        $rootScope.idaccount,
                        data.password,
                        function(response) {
                            if (response != false) {
                                var alertPopup = $ionicPopup.alert({
                                    title: $filter('translate')('reset_success'),
                                    okText: $filter('translate')('yes'),
                                    cssClass: "alertPopup"
                                });
                                $state.go('login');
                            } else {
                                var alertPopup = $ionicPopup.alert({
                                    title: $filter('translate')('msg_update_failed'),
                                    okText: $filter('translate')('okay'),
                                    cssClass: "alertPopup"
                                }); //tetap di halaman register//muncul alert phone or email alredy exist->dari api persis
                                $state.go('login');
                            }
                            $ionicLoading.hide();
                        })
                }
            } else {
                $ionicLoading.show({
                    template: $filter('translate')('Minimum_8_character'),
                    duration: 3000
                });
            }

        };

        $scope.resendPassword = resendPassword;

        function resendPassword() {
            console.log($rootScope.dataContact);
            ForgetPasswordService.genCode(
                $rootScope.dataContact.idaccount,
                $rootScope.dataContact.type,
                $rootScope.dataContact.contact,
                function(response) {
                    if (response != false) {
                        $scope.detail = response;
                        console.log(response);
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            title: $filter('translate')('cannot_send_code'),
                            okText: $filter('translate')('okay'),
                            cssClass: "alertPopup"
                        }); //tetap di halaman register//muncul alert phone or email alredy exist->dari api persis
                    }
                });
        }
    }