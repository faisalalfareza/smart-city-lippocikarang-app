angular
    .module('livein')
    .controller('register', register)

    function register($scope, $ionicLoading, $ionicPopup, $location, $state, registerService, $filter, $localStorage) {
        $scope.registerManual = registerManualService;
        $scope.registerGooglePlus = registerGooglePlus;
        $scope.facebook_auth = facebook_auth;
        $scope.google_auth = google_auth;
        $scope.twitter_auth = twitter_auth;

        function registerManualService(user) {
            if(user.email != null && user.fullname != null && user.gender != null  && user.phone != null && user.password != null && user.confpassword != null && user.password == user.confpassword && user.checkbox1 != null) {
                $ionicLoading.show({ template: $filter('translate')('loading') + "..." });

                registerService.registerManualService(
                    user.fullname,
                    user.gender,
                    user.phone,
                    user.email,
                    user.password,
                    function(response) {
                        if (response != false) {
                            $state.go('login');
                            var alertPopup = $ionicPopup.alert({
                                title: $filter('translate')('registration_success'),
                                template: $filter('translate')('activate_account'),
                                okText: $filter('translate')('yes'),
                                okType: "button-stable",
                                cssClass: "alertPopup"
                            });   
                        } else {
                            var alertPopup = $ionicPopup.alert({
                                title: $filter('translate')('registration_failed'),
                                template: $filter('translate')('email_exist'),
                                okText: $filter('translate')('yes'),
                                okType: "button-stable",
                                cssClass: "alertPopup"
                            }); //tetap di halaman register//muncul alert phone or email alredy exist->dari api persis
                        }
                        $ionicLoading.hide();
                    });

            } else if(user.fullname == null){
               $ionicLoading.show({
                    template: $filter('translate')('cbe_fullname'),
                    duration: 3000
                });
            } else if(user.gender == null){
              $ionicLoading.show({
                    template: $filter('translate')('cbe_fullname'),
                    duration: 3000
                });
            } else if(user.phone == null){
              $ionicLoading.show({
                    template: $filter('translate')('cbe_phone'),
                    duration: 3000
                });
            }

            else if(user.email == null){
              $ionicLoading.show({
                    template: $filter('translate')('cbe_email'),
                    duration: 3000
                });
            }

            else if(user.password == null){
              $ionicLoading.show({
                    template: $filter('translate')('cbe_pass'),
                    duration: 3000
                });
            }

            else if(user.confpassword != user.password || user.password != user.confpassword){
              $ionicLoading.show({
                    template: $filter('translate')('not_equal'),
                    duration: 3000
                });
            } else if(user.checkbox1 == null) {
                $ionicLoading.show({
                    template: $filter('translate')('cbe_check1'),
                    duration: 3000
                });
            } 
            else {
                console.log('error');
            }
        };

        function registerGooglePlus() {

          ionic.Platform.ready(function() {

            if (window.plugins.googleplus && window.plugins){
                 window.plugins.googleplus.isAvailable(
                function(available) {

                  window.plugins.googleplus.login(                    {
                      'scopes':'profile email', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
                      'webClientId':'com.googleusercontent.apps.683716271520-acb1b36o862aotvbdh0d6gooolkn0ar8', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
                      'offline': false, // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
                    },
                    function (obj) {
                      console.log(JSON.stringify(obj));
                      senddatauser(obj,"google")// do something useful instead of alerting
                    },
                    function (msg) {
                      console.log('error: ' + msg);
                    });

                });
            }
            // will execute when device is ready, or immediately if the device is already ready.
          });

        }

        //with twitter
        function twitter_auth() {
          ionic.Platform.ready(function () {
            // console.log("function twitter ready");
            //
            //
            // var api_key = "LuAov6upYoyXnv9MT8UegwiOX"; //Enter your Consumer Key (API Key)
            // var api_secret = "uSpxUyRaFj5NH6I7WgUzEJMsqMRQYTeUpSRlFEgtiOIQfdc22V"; // Enter your Consumer Secret (API Secret)
            // $cordovaOauth.twitter(api_key, api_secret).then(function(result) {
            //   console.log(result);
            // });

            TwitterConnect.login(
              function(result) {
                console.log('Successful login!');
                console.log(result);
                getdatausertwitter();
              }, function(error) {
                console.log('Error logging in');
                console.log(error);
              }
            );
            console.log("udah masuk ready")
          },function error(error) {alert(JSON.stringify(error))});


        }

      function getdatausertwitter () {

        TwitterConnect.showUser(
          function(result) {
            console.log('User Profile:');
            console.log(result);
            // alert(JSON.stringify(result));
            console.log('Twitter handle :'+result.userName);
            if(result.email == undefined || result.email == ""){

              var alertPopup = $ionicPopup.alert({
                template: "Sorry, we can’t fetch your email for registration",
                okText: $filter('translate')('okay'),
                okType: "button-stable",
                cssClass: "alertPopup"
              });
            }else {
              senddatauser(result,"facebook")
            }
          }, function(error) {
            console.log('Error retrieving user profile');
            console.log(error);
          }
        );

      }


      //facebook
        function facebook_auth() {

        ionic.Platform.ready(function(){
            facebookConnectPlugin.logout(function succes(result){
            getloginfacebook();
            }, function oneror(error){
            getloginfacebook();
            })
        });

        }

        function getloginfacebook () {

        facebookConnectPlugin.login(["public_profile", "email", "user_birthday"], function onSucces(result) {

            facebookConnectPlugin.api("me" + "/?fields=id,email,gender,birthday,name", null,
            function onSuccess(datauser) {
                console.log("Result: ", datauser);
                // alert(JSON.stringify(datauser))
                senddatauser(datauser, "facebook");
            }, function onError(erroruser) {
                console.error("Failed: ", erroruser);
            }
            );

        }, function onError(error) {
            var alertPopup = $ionicPopup.alert({
            title: 'Facebook Login Failed ..',
            template: $filter('translate')('user_cancelled'),
            okText: $filter('translate')('okay'),
            okType: "button-stable",
            cssClass: "alertPopup"
            });
        });

        }


        //google auth
        function google_auth() {

          ionic.Platform.ready(function() {

            if (window.plugins.googleplus && window.plugins){
              window.plugins.googleplus.isAvailable(
                function(available) {

                  window.plugins.googleplus.login(                    {
                      'scopes':'profile email', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
                      'webClientId':'com.googleusercontent.apps.683716271520-acb1b36o862aotvbdh0d6gooolkn0ar8', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
                      'offline': false, // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
                    },
                    function (obj) {
                      console.log(JSON.stringify(obj));
                      senddatauser(obj,"google")// do something useful instead of alerting
                    },
                    function (msg) {
                      console.log('error: ' + msg);
                    });

                });
            }
            // will execute when device is ready, or immediately if the device is already ready.
          });


        }

      //action of login and register
        function senddatauser(data_user, sosmed) {

        $ionicLoading.show({ template: $filter('translate')('loginmessage') + "...", duration: 2000 });

        if(sosmed == "facebook") {

          // alert("send data from facebook")

            registerService.registerManualService(
            data_user.name,
            data_user.gender,
            Math.random(),
            data_user.email,
            Math.random(),
            function (response) {
                if (response != false) {
                if (response[0].status == false) {
                  // alert(JSON.stringify(response))

                    $localStorage.currentUser = { data : response };
                    $state.go('app.main');

                    var alertPopup = $ionicPopup.alert({
                    template: $filter('translate')('hello') + ' ' + response[0].fullname + '. ' + $filter('translate')('welcome_dialog') + ' <strong>' + response[0].privilege + '!</strong> ',
                    okText: $filter('translate')('okay'),
                    okType: "button-stable",
                    cssClass: "alertPopup"
                    });

                    alertPopup.then(function (res) {
                    if (res) {
                        AdvertiseService.AdsLogin();
                    }
                    });

                    console.log("false")

                } else if (response[0].status == true) {

                  alert(JSON.stringify(response));
                    var alertPopup = $ionicPopup.alert({
                    title: $filter('translate')('registration_success'),
                    template: $filter('translate')('check_email'),
                    okText: $filter('translate')('okay'),
                    okType: "button-stable",
                    cssClass: "alertPopup"
                    });
                    console.log("true")

                }

                console.log("true tapi false api yo gak true")

                } else {
                var alertPopup = $ionicPopup.alert({
                    title: $filter('translate')('registration_failed'),
                    template: $filter('translate')('email_exist'),
                    okText: $filter('translate')('okay'),
                    okType: "button-stable",
                    cssClass: "alertPopup"
                });

                //tetap di halaman register//muncul alert phone or email alredy exist->dari api persis
                $state.go('/login');
                }
                $ionicLoading.hide();
            });
        } else if (sosmed == "google"){

            registerService.registerManualService(
            data_user.displayName,
            "n",
            Math.random(),
            data_user.email,
            Math.random(),
            function (response) {
                if (response != false) {
                if (response[0].status == false) {

                    $state.go('app.main');
                    $localStorage.currentUser = { data : response };

                    var alertPopup = $ionicPopup.alert({
                    template: $filter('translate')('hello') + ' ' + response[0].fullname + '. ' + $filter('translate')('welcome_dialog') + ' <strong>' + response[0].privilege + '!</strong> ',
                    okText: $filter('translate')('okay'),
                    okType: "button-stable",
                    cssClass: "alertPopup"
                    });

                    alertPopup.then(function (res) {
                    if (res) {
                        AdvertiseService.AdsLogin();
                    }
                    });

                    console.log("false")

                } else if (response[0].status == true) {
                    var alertPopup = $ionicPopup.alert({
                    title: $filter('translate')('registration_success'),
                    template: $filter('translate')('check_email'),
                    okText: $filter('translate')('okay'),
                    okType: "button-stable",
                    cssClass: "alertPopup"
                    });
                    console.log("true")

                }

                } else {
                var alertPopup = $ionicPopup.alert({
                    title: $filter('translate')('registration_failed'),
                    template: $filter('translate')('email_exist'),
                    okText: $filter('translate')('okay'),
                    okType: "button-stable",
                    cssClass: "alertPopup"
                });

                //tetap di halaman register//muncul alert phone or email alredy exist->dari api persis
                $state.go('/login');
                }
                $ionicLoading.hide();
            });

          }
        }



    }
