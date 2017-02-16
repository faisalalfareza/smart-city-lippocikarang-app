angular
    .module('livein')
    .service('PushNotificationService', PushNotificationService)
    .service('NotifAccountService', NotifAccountService);

    function PushNotificationService($q, $ionicUser, $ionicPush, $filter) {
        var PushNotificationService = this;

        PushNotificationService.identifyUser = function() {
            var user = $ionicUser.get();
            if(!user.user_id) {
                // Set your user_id here, or generate a random one.
                user.user_id = $ionicUser.generateGUID();
            };

            // Add some metadata to your user object.
            angular.extend(user, {
                name: 'Technews',
                bio: 'Hardcoded for now'
            });

            // Identify your user with the Ionic User Service
            $ionicUser.identify(user).then(function(){
                //alert('Identified user ' + user.name + '\n ID ' + user.user_id);
                PushNotificationService.pushRegister();
                return true;
            });
        },

        PushNotificationService.pushRegister = function() {
            // Register with the Ionic Push service.  All parameters are optional.
            $ionicPush.register({
                canShowAlert: true, //Can pushes show an alert on your screen?
                canSetBadge: true, //Can pushes update app icon badges?
                canPlaySound: true, //Can notifications play a sound?
                canRunActionsOnWake: true, //Can run actions outside the app,
                onNotification: function(notification) {
                    // Handle new push notifications here
                    // console.log(notification);
                    alert(notification);
                    return true;
                }
            });
        }

    }

    function NotifAccountService($http, $localStorage, $filter) {
        var service = {};
        service.countNotif = countNotif;
        return service; 

        function countNotif(callback) {
            var req = {
                    method: 'GET',
                    url: $filter('translate')('apilink') + 'api/Notif/?action=count_notif&idaccount='+$localStorage.currentUser.data[0].idaccount
                }
     
            $http(req)
                .success(function(response) {
                    if ($localStorage.notifBefore != null) {
                        console.log('Ntf response : ' + response[0].total);
                        console.log('Ntf localstr : ' + $localStorage.notifBefore.sum);
                        var count = response[0].total - $localStorage.notifBefore.sum;
                        console.log('Ntf count : ' + count);

                        $localStorage.notifBefore = { sum : response[0].total };
                        callback(count);
                    }
                    else {
                        $localStorage.notifBefore = { sum : response[0].total };
                        $localStorage.notifPush = { 'status' : true, 'sound' : true };
                    }
                })
                .error(function() {
                    callback(false);
                });
        }     
         

    }       
