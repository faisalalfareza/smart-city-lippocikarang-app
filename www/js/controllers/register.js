angular
    .module('livein')
    .controller('register', register)

    function register($scope, $ionicLoading, $ionicPopup, $location, $state, registerService, $filter) {
        $scope.registerManual = registerManualService;
        $scope.registerGooglePlus = registerGooglePlus;
        $scope.facebook_auth = facebook_auth;
        $scope.google_auth = google_auth;
        $scope.twitter_auth = twitter_auth;

        function registerManualService(user) {
            $ionicLoading.show({ template: $filter('translate')('loading') + "..." });
            console.log(user);
            registerService.registerManualService(
                user.fullname,
                user.gender,
                user.phone,
                user.email,
                user.password,
                function(response) {
                    if (response != false) {
                        console.log(response);
                        var alertPopup = $ionicPopup.alert({
                            title: $filter('translate')('registration_success'),
                            template: $filter('translate')('activate_account'),
                            okText: $filter('translate')('yes'),
                            okType: "button-stable",
                            cssClass: "alertPopup"
                        });
                        $location.path('/login');
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            title: $filter('translate')('registration_failed'),
                            template: $filter('translate')('email_exist'),
                            okText: $filter('translate')('yes'),
                            okType: "button-stable",
                            cssClass: "alertPopup"
                        }); //tetap di halaman register//muncul alert phone or email alredy exist->dari api persis
                        $location.path('/register');
                    }
                    $ionicLoading.hide();
                });
        };

        function registerGooglePlus() {
            $ionicLoading.show({ template: 'Logging in...' });
            window.plugins.googleplus.login({},
                function(user_data) {
                    // For the purpose of this example I will store user data on local storage
                    registerService.setUserGoogle({
                        userID: user_data.userId,
                        name: user_data.displayName,
                        email: user_data.email,
                        picture: user_data.imageUrl,
                        accessToken: user_data.accessToken,
                        idToken: user_data.idToken
                    });

                    $ionicLoading.hide();
                    $state.go('app.home');
                },
                function(msg) {
                    $ionicLoading.hide();
                }
            );
        };


        // sosmed auth

        //with twitter
        function twitter_auth() {
            var provider = new firebase.auth.TwitterAuthProvider();

            firebase.auth().signInWithPopup(provider).then(function(result) {


                if (result.user.email == null) {
                    var alertPopup = $ionicPopup.alert({
                        title: $filter('translate')('login_failed'),
                        template: $filter('translate')('cannot_put_email'),
                        okText: $filter('translate')('try_again'),
                        cssClass: "alertPopup"
                    });
                } else {
                    senddatauser()
                }
            }).catch(function(error) {
                // Handle Errors here.
                var alertPopup = $ionicPopup.alert({
                    title: $filter('translate')('login_failed'),
                    template: error.message,
                    okText: $filter('translate')('try_again'),
                    cssClass: "alertPopup"
                });
            });

        }

        //facebook
        function facebook_auth() {
            var provider = new firebase.auth.FacebookAuthProvider();
            provider.addScope('user_birthday');
            provider.addScope('email')
            provider.addScope('user_gender')


            firebase.auth().signInWithPopup(provider).then(function(result) {
                // This gives you a Facebook Access Token.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                senddatauser();
                console.log(result);
            }).catch(function(error) {
                var alertPopup = $ionicPopup.alert({
                    title: $filter('translate')('login_failed'),
                    template: error.message,
                    okText: $filter('translate')('try_again'),
                    cssClass: "alertPopup"
                });
            })
        }


        //google auth
        function google_auth() {

            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
            provider.addScope('https://www.googleapis.com/auth/plus.login');

            firebase.auth().signInWithPopup(provider).then(function(result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                result_user = result.user;
                console.log(result_user);

                //send data to api
                senddatauser();

            }).catch(function(error) {
                // Handle Errors here
                // .
                var alertPopup = $ionicPopup.alert({
                    title: $filter('translate')('login_failed'),
                    template: error.message,
                    okText: $filter('translate')('try_again'),
                    cssClass: "alertPopup"
                });
                // ...
            });


        }

        function senddatauser() {
            registerService.registerManualService(
                result_user.displayName,
                'unknow',
                Math.random(),
                result_user.email,
                Math.random(),
                function(response) {
                    if (response != false) {
                        console.log(response);
                        var alertPopup = $ionicPopup.alert({
                            title: $filter('translate')('login_success'),
                            template: $filter('translate')('dialog_success_upgrade'),
                            okText: $filter('translate')('yes'),
                            cssClass: "alertPopup"
                        });
                        $state.go('app.main');
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            title: $filter('translate')('registration_failed'),
                            template: $filter('translate')('email_exist'),
                            okText: $filter('translate')('yes'),
                            cssClass: "alertPopup"
                        }); //tetap di halaman register//muncul alert phone or email alredy exist->dari api persis
                        $state.go('/login');
                    }
                    $ionicLoading.hide();
                });
        }

      function senddatauser(data_user, sosmed) {

        $ionicLoading.show({ template: 'Logging In ...', duration: 2000 });

        if(sosmed == "facebook") {

          registerService.registerManualService(
            data_user.name,
            data_user.gender,
            Math.random(),
            data_user.email,
            Math.random(),
            function (response) {
              alert(JSON.stringify(response))
              alert(Math.random());
              if (response != false) {
                if (response[0].status == false) {

                  //$localStorage.currentUser = { data : response[0] };
                  $state.go('app.main');

                  var alertPopup = $ionicPopup.alert({
                    template: $filter('translate')('hello') + ' ' + response[0].fullname + '. ' + $filter('translate')('welcome_dialog') + ' <strong>' + response[0].privilege + '!</strong> ',
                    okText: $filter('translate')('okay'),
                    okType: "button-stable",
                    cssClass: "alertPopup"

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


                  $localStorage.currentUser = { data : response[0] };

                  var alertPopup = $ionicPopup.alert({
                    template: $filter('translate')('hello') + ' ' + response[0].fullname + '. ' + $filter('translate')('welcome_dialog') + ' <strong>' + response[0].privilege + '!</strong> ',
                    okText: $filter('translate')('okay'),
                    okType: "button-stable",
                    cssClass: "alertPopup"

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
