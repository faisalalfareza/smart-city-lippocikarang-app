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

    function getbillingCtrl($scope,$cordovaNetwork,$filter, $rootScope, billingServices, $ionicLoading, $ionicPopup, $ionicSlideBoxDelegate, $state) {

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

          if($cordovaNetwork.getNetwork() != Connection.NONE) {
            $rootScope.unitno = [];
            $rootScope.datares = $scope.atributeres;

            angular.forEach($scope.periodes, function (value, key) {
              angular.forEach(value.Unit, function (valueunit, keyunit) {
                $scope.unitno.push(valueunit['@attributes'].UnitNo)
              })

            })

            console.log($scope.unitno);
            $rootScope.unitnofilter = [];
            $rootScope.attributpayment = $scope.atributeres;
            $scope.unitno.filter(function (item, index, inputArray) {
              var taek = inputArray.indexOf(item) == index;
              if (taek == true) {
                $rootScope.unitnofilter = $rootScope.unitnofilter + item + ',';
              }
            });

            $state.go('app.payment');
          }else {

            var alertPopup = $ionicPopup.alert({
              title: $filter('translate')('failed'),
              template: "check your connection",
              okText: $filter('translate')('okay'),
              cssClass: "alertPopup"
            });

          }
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

    function payment($scope,$cordovaNetwork,$rootScope, $state, $ionicPopup, $filter) {

        $scope.unitno = $rootScope.unitnofilter;
        $scope.atribute = $rootScope.attributpayment;
        // alert(JSON.stringify($rootScope.attributpayment));


        $scope.select_type = function(type_payment,checkterm) {
            console.log(type_payment);
            console.log(checkterm);

            if (type_payment == undefined ) {
                var alertPopup = $ionicPopup.alert({
                    title: $filter('translate')('failed'),
                    template: $filter('translate')('must_choose_1'),
                    okText: $filter('translate')('okay'),
                    cssClass: "alertPopup"
                });

            } else if (checkterm == false || checkterm == undefined){
              var alertPopup = $ionicPopup.alert({
                title: $filter('translate')('failed'),
                template: "you must check term of services",
                okText: $filter('translate')('okay'),
                cssClass: "alertPopup"
              });

            }else {

              if($cordovaNetwork.getNetwork() != Connection.NONE) {

                console.log(type_payment);
                $rootScope.type_payment = type_payment;
                if (type_payment.match('ovo payment')) {
                  $state.go('app.ovo_payment');
                }
              }else {

                var alertPopup = $ionicPopup.alert({
                  title: $filter('translate')('failed'),
                  template: "check your connection",
                  okText: $filter('translate')('okay'),
                  cssClass: "alertPopup"
                });

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

    function paymentovo( $ionicPopup,$scope,$rootScope,$cordovaNetwork,billingServices,$state, $ionicLoading) {


      $scope.submtpayment = function (phone) {


        if($cordovaNetwork.getNetwork() != Connection.NONE) {

           $ionicLoading.show({
                 template: 'Loading...',
               })

          billingServices.ovopaymet_service(
            $rootScope.attributpayment.Name,
            $rootScope.emailres,
            $rootScope.attributpayment.SiteID,
            $rootScope.attributpayment.BillingOutstandingBalance,
            phone,getdataresponse
          )

        }   else {


          var alertPopup = $ionicPopup.alert({
            title: $filter('translate')('failed'),
            template: "check your connection",
            okText: $filter('translate')('okay'),
            cssClass: "alertPopup"
          });
        }
        function getdataresponse (response) {

          if(response != false){
            status = response.status;
            // alert(JSON.stringify(response))

            if(status == '200' || status == 200){

              message = "Status : "+status +  '</br>' +
                        "transcation id : " + response.transaction_id + '</br>' +
                        "message : "+ response.message + '</br>'+
                        "Check your notification ovo";
              showalertpopup(message,200);

            } else if(status == '103' || status == 103) {

              message = "Status : " + status + '</br>'  +
                        "message : " + response.message;
              showalertpopup(message,103);

            }else if (status == 500 || status == '500'){


              message = "Status : " + status + '</br>' +
                        "Error Id : " + response.ErrorID + '</br>' +
                        "Error Code : " + response.ErrorCode + '</br>' +
                        "Error Message : "+response.ErrorMessage + '</br>' +
                        "Message : "+ response.message;

              showalertpopup(message,500);




            }

          }

      }

      function showalertpopup(message,status) {

        $ionicLoading.hide();

        var alertPopup = $ionicPopup.alert({
          title: "Payment Status",
          template: message,
          okText: "oke",
          cssClass: "alertPopup"
        });

        alertPopup.then(function(res) {
          if (status == 200 || status == 103 || status == 500){
            $state.go("app.loginbilling");
          }else
            console.log('Thank you for not eating my delicious ice cream cone');
        });
      }

      }

    }
