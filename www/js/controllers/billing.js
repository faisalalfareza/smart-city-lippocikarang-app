/**
 * Created by Lenovo on 08/12/2016.
 */
angular
    .module('livein')
    .controller('loginBilling', LoginBilling)
    .controller('getbillingCtrl', getbillingCtrl)
    .controller('transactionBilling', transactionBilling)
    .controller('paymentovo', paymentovo)
    .controller('payment', payment);

    function LoginBilling($rootScope, $scope, $state, billingServices, $ionicLoading, $ionicPopup, $filter,$cordovaNetwork) {

        $scope.loginbilling = function(email) {


          // /if($cordovaNetwork.isOnline()) {


            $ionicLoading.show({template: $filter('translate')('loading') + "..."});
            $rootScope.emailres = email;

            billingServices.loginBillingServices(email, function (response) {
              if (response != false) {
                $scope.data = response.data;
                console.log(response)
                if ($scope.data != undefined) {
                  $ionicLoading.show({
                    template: $filter('translate')('pscode_correct'),
                    duration: 2000
                  });
                  getdata(response);
                  $state.go('app.billing');
                } else {
                  $ionicLoading.hide();
                  var alertPopup = $ionicPopup.alert({
                    title: $filter('translate')('login_failed'),
                    template: $filter('translate')('check_email'),
                    okText: $filter('translate')('try_again'),
                    cssClass: "alertPopup"
                  });

                }
                $scope.data = response;
              } else {
                $ionicLoading.hide;
                console.log(response)
              }

            });



        }

        function getdata(data) {


            $rootScope.datasite = [];
            $scope.datares = data.data['@attributes'];


            angular.forEach(data.data.Site, function(value, key) {
                $scope.datasite.push(value);

            });

            console.log($rootScope.datasite);
        }

    }

    function getbillingCtrl($scope,$filter, $rootScope, billingServices, $ionicLoading, $ionicPopup, $ionicSlideBoxDelegate, $state) {

        console.log($rootScope.datasite);

        $scope.siteidop = $rootScope.datasite;
        $scope.selected = $scope.siteidop[0];
        $scope.siteid = $scope.siteidop[0].SiteID;

        console.log($scope.siteidop);
        console.log($scope.selected);
        console.log($rootScope.emailres);

        getdatabilling();

        $scope.next = function() {
            $ionicSlideBoxDelegate.next();
        };

        $scope.previous = function() {
            $ionicSlideBoxDelegate.previous();
        };

        $scope.slidechange = function(index) {

            $scope.periodname = $scope.periodes[index]['@attributes'].Name;
            console.log(index);

        }

        $scope.selectedsiteid = function(elected) {
            $scope.selected = elected.SiteID;
            getdatabilling();

        }


        $scope.paynow = function() {
            $rootScope.unitno = [];
            $rootScope.datares = $scope.atributeres;

            angular.forEach($scope.periodes, function(value, key) {
                angular.forEach(value.Unit, function(valueunit, keyunit) {
                    $scope.unitno.push(valueunit['@attributes'].UnitNo)
                })

            })

            console.log($scope.unitno);
            $rootScope.unitnofilter = [];
            $rootScope.attributpayment = $scope.atributeres;
            $scope.unitno.filter(function(item, index, inputArray) {
                var taek = inputArray.indexOf(item) == index;
                if (taek == true) {
                    $rootScope.unitnofilter = $rootScope.unitnofilter + item + ',';
                }
            });

            $state.go('app.payment');
        }

        function getdatabilling() {
            billingServices.getbilling($rootScope.emailres, $scope.siteid, function(response) {
                $ionicLoading.show({ template: $filter('translate')('loading') + "..." });
                if (response != false) {
                    $ionicLoading.hide();
                    console.log(response);

                    $scope.atributeres = response.data['@attributes'];
                    $scope.periodes = response.data.Periode;
                    $ionicSlideBoxDelegate.update();

                    console.log($scope.periodes);


                } else {
                    $ionicLoading.hide()
                    console.log(response);

                    // $scope.atributeres = response.data['@attributes'];
                    // $scope.periode = response.data.periode;
                    // console.log($scope.atributeres);


                }


                $scope.periodname = $scope.periodes[0]['@attributes'].Name;
            });


        }


    }

    function payment($scope, $rootScope, $state, $ionicPopup, $filter) {

        $scope.unitno = $rootScope.unitnofilter;
        $scope.atribute = $rootScope.attributpayment;


        $scope.select_type = function(type_payment) {
            console.log($scope.type_payment);
            console.log($scope.checkterm);

            if (type_payment == undefined ) {
                var alertPopup = $ionicPopup.alert({
                    title: $filter('translate')('failed'),
                    template: $filter('translate')('must_choose_1'),
                    okText: $filter('translate')('okay'),
                    cssClass: "alertPopup"
                });

            } else {

                console.log(type_payment);
                $rootScope.type_payment = type_payment;
                if (type_payment.match('ovo payment')) {
                  $state.go('app.ovo_payment');
                }

            }

        }

    }

    function transactionBilling($rootScope, $scope) {
        nameres = $rootScope.attributpayment.Name;
        $scope.totalamount = $rootScope.attributpayment.BillingOutstandingBalance;
        $scope.siteid = $rootScope.attributpayment.SiteID;

        $scope.nameurl = nameres.replace(' ', '%20');

        if ($rootScope.type_payment.match('Cimb Clicks')) {
            $scope.selectpayment = 2

        } else if ('Credit Card') {
            $scope.selectpayment = 1

        }

        $scope.url = "http://innodev.vnetcloud.com/liveinpayment/payment?name=" + $scope.nameurl +
            "&email=" + $rootScope.emailres +
            "&siteid=" + $scope.siteid +
            "&orgid=1" +
            "&amount=" + $scope.totalamount +
            "&paymenttype=" + $scope.selectpayment;

        console.log($scope.url);


    }

    function paymentovo() {

    }
