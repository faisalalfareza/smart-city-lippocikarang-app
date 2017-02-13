    angular
        .module('livein')
        .controller('login', login);

        function login($scope, LoginService, $ionicPopup, $ionicLoading, $state, registerService, AdvertiseService, $filter, $location, $localStorage) {
          $scope.data = {};
          $scope.credentials = loginManualService;
          $scope.facebook_auth = facebookAuth;
          $scope.google_auth = google_auth;
          $scope.twitter_auth = twitter_auth;

          initController();

          function initController() {
              // reset login status
              LoginService.logoutUser();
          };

          // Login By Credentials
          function loginManualService(data) {
              if (data.email && data.password) {
                  $ionicLoading.show({ template: $filter('translate')('loginmessage') + "...", duration: 2000 });

                  LoginService.loginUser(
                    data.email,
                    data.password,
                    function(response) {
                          if (response[0].status == true) {
                              $scope.users = response;
                              $state.go('app.main');
                              $ionicLoading.hide();
                              var alert = $ionicPopup.alert({
                                template: $filter('translate')('hello') + '! ' + $scope.users[0].fullname + '. ' + $filter('translate')('welcome_dialog') + ' <strong>' + $scope.users[0].privilege + '!</strong> ',
                                okText: $filter('translate')('okay'),
                                okType: "button-stable",
                                cssClass: "alertPopup"
                              });

                              // setTimeout(function() {
                              AdvertiseService.AdsLogin();
                              // }, 2500);

                          } else {
                              $ionicLoading.show({
                                  template: response[0].messages,
                                  duration: 2000
                              });
                          }

                    });

              } else {
                  $ionicLoading.show({
                      template: $filter('translate')('enter_credential'),
                      duration: 2000
                  });
              }

          }

          // Facebook Auth
          function facebookAuth() {

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
                  senddatauser(datauser, "facebook");
                }, function onError(erroruser) {
                  console.error("Failed: ", erroruser);
                }
              );

            }, function onError(error) {
              var alertPopup = $ionicPopup.alert({
                title: 'Facebook Login Failed ..',
                template: JSON.stringify(error),
                okText: $filter('translate')('okay'),
                okType: "button-stable",
                cssClass: "alertPopup"
              });
            });

          }

          // Google Plus Auth
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

          // Twitter Auth
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
                alert(JSON.stringify(result));
                console.log('Twitter handle :'+result.userName);
              }, function(error) {
                console.log('Error retrieving user profile');
                console.log(error);
              }
            );

          }

          //action of login and register
          function senddatauser(data_user, sosmed) {

            $ionicLoading.show({ template: $filter('translate')('loginmessage') + "...", duration: 2000 });

            if(sosmed == "facebook") {

              registerService.registerManualService(
                data_user.name,
                data_user.gender,
                Math.random(),
                data_user.email,
                Math.random(),
                function (response) {
                  if (response != false) {
                    if (response[0].status == false) {

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
                          LoginService.logoutUser();
                          $ionicLoading.show({ template: $filter('translate')('logoutmessage') + "...", duration: 500 });
                          $state.go('login');
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
