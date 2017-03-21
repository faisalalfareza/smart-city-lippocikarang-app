angular
    .module('livein')
    .service('Notification', Notification)
    .service('EditProfileService', EditProfileService)
    .service('ProfileService', ProfileService)
    .service('HistoryService', HistoryService);

    function Notification($http, $localStorage, $stateParams, $filter) {
        var service = {};

        service.listnotif = listnotif;
        service.totalnotif = totalnotif;
        service.deleteNotif = deleteNotif;
        service.detailNotif = detailNotif;
        service.updateNotif = updateNotif;
        service.insertBookmarkNotif = insertBookmarkNotif;
        service.deleteBookmarkNotif = deleteBookmarkNotif;

        return service;

        function listnotif(pagenumbernotif,callback) {
            var req = {
                method: 'GET',
                url: $filter('translate')('apilink') + 'api/Notif/?action=listnotif&pagenumber='+pagenumbernotif+'&pagesize=10&idaccount=' + $localStorage.currentUser.data[0].idaccount
            }
            $http(req)
                .success(function (response) {
                    callback(response);
                })
                .error(function () {
                    callback(false);
                });
        }
        function totalnotif(callback) {
            var req = {
                method: 'GET',
                url: $filter('translate')('apilink') + 'api/Notif/?action=listnotif&pagenumber=1&pagesize=1000&idaccount=' + $localStorage.currentUser.data[0].idaccount
            }
            $http(req)
                .success(function (response) {
                    callback(response);
                })
                .error(function () {
                    callback(false);
                });
        }

        function detailNotif(callback) {
            var req = {
                method: 'GET',
                url: $filter('translate')('apilink') + 'api/Notif/?action=retrieve_get&idnotif=' + $stateParams.idnotif + '&idaccount=' + $localStorage.currentUser.data[0].idaccount
            }
 
            $http(req)
                .success(function (response) {
                    callback(response);
                })
                .error(function () {
                    callback(false);
                });
        }

        function deleteNotif(results, callback) {
            var req = {
                method: 'POST',
                url: $filter('translate')('apilink') + 'api/Notif/',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'action=' + 'delete_notif' +
                '&idnotif=' + results
            }
 
            $http(req)
                .success(function (response) {
                    callback(response);
                })
                .error(function () {
                    callback(false);
                });
        }

        function updateNotif(results, callback) {
            var req = {
                method: 'POST',
                url: $filter('translate')('apilink') + 'api/Notif/',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'action=' + 'mark_read' +
                '&idnotif=' + results +
                '&idaccount=' + $localStorage.currentUser.data[0].idaccount
            }
   
            $http(req)
                .success(function (response) {
                    callback(response);
                })
                .error(function () {
                    callback(false);
                });
        }

        function insertBookmarkNotif(idnotif, callback) {
            var req = {
                method: 'POST',
                url: $filter('translate')('apilink') + 'api/Notifbookmark/',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'action=' + 'insert_notifbookmark' +
                '&idnotif=' + idnotif +
                '&idaccount=' + $localStorage.currentUser.data[0].idaccount
            }
            $http(req)
                .success(function (response) {
                    callback(response);
                })
                .error(function () {
                    callback(false);
                });
        }

        function deleteBookmarkNotif(idnotifbookmark, callback) {
            var req = {
                method: 'POST',
                url: $filter('translate')('apilink') + 'api/Notifbookmark/',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'action=' + 'delete_notifbookmark' +
                '&idnotifbookmark=' + idnotifbookmark +
                '&idaccount=' + $localStorage.currentUser.data[0].idaccount
            }
            $http(req)
                .success(function (response) {
                    callback(response);
                })
                .error(function () {
                    callback(false);
                });
        }

    }

    function EditProfileService($http, $filter) {
        var service = {};
        service.editprofile = editprofile;
        return service;

        function editprofile(idaccount, gender, phone, dateofbirth, fullname, address, avatar, pscode, privilege, password, email, callback) {
            var req = {
                method: 'POST',
                url: $filter('translate')('apilink') + 'api/Account/',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'action=' + 'update_account' +
                '&idaccount=' + idaccount +
                '&gender=' + gender +
                '&phone=' + phone +
                '&dateofbirth=' + dateofbirth +
                '&fullname=' + fullname +
                '&address=' + address +
                '&avatar=' + avatar +
                '&pscode=' + pscode +
                '&privilege=' + privilege +
                '&password=' + password +
                '&email=' + email
            }
       
            $http(req)
                .success(function (response) {
                    callback(response);
                })
                .error(function () {
                    callback(false);
                });
        }
    }

    function ProfileService($http, $localStorage, $filter) {
        var service = {};
        service.retrievegetaccount = retrievegetaccount;
        return service;

        function retrievegetaccount(callback) {
            var req = {
                method: 'GET',
                url: $filter('translate')('apilink') + 'api/Account/?action=retrieve_get&idaccount=' + $localStorage.currentUser.data[0].idaccount
            }
            $http(req)
                .success(function (response) {
                    callback(response);
                })
                .error(function () {
                    callback(false);
                });
        }
    }

    function HistoryService($http, $filter) {
        var service = {};
        service.listHistory = listHistory;
        return service;

        function listHistory(idaccount, pagenumber, callback) {
            var req = {
                method: 'GET',
                url: $filter('translate')('apilink') + 'api/History/?action=listhistory&idaccount=' + idaccount + '&pagenumber='+pagenumber+'&pagesize=10'
            }

            $http(req)
                .success(function (response) {
                    callback(response);
                })
                .error(function () {
                    callback(false);
                });
        }

    }
