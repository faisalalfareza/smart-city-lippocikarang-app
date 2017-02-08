angular
    .module('livein')
    .service('Notification', Notification)
    .service('EditProfileService', EditProfileService)
    .service('ProfileService', ProfileService)
    .service('HistoryService', HistoryService);

    function Notification($http, $localStorage, $stateParams) {
        var service = {};
        service.listnotif = listnotif;
        service.deleteNotif = deleteNotif;
        service.detailNotif = detailNotif;
        service.updateNotif = updateNotif;
        service.insertBookmarkNotif = insertBookmarkNotif;
        service.deleteBookmarkNotif = deleteBookmarkNotif;
        return service;

        function listnotif(callback) {
            var req = {
                method: 'GET',
                url: 'http://innodev.vnetcloud.com/LiveIn/api/Notif/?action=listnotif&pagenumber=1&pagesize=1000&idaccount=' + $localStorage.currentUser.data[0].idaccount
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
                url: 'http://innodev.vnetcloud.com/LiveIn/api/Notif/?action=retrieve_get&idnotif=' + $stateParams.idnotif + '&idaccount=' + $localStorage.currentUser.data[0].idaccount
            }
            console.log(req);
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
                url: 'http://innodev.vnetcloud.com/LiveIn/api/Notif/',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'action=' + 'delete_notif' +
                '&idnotif=' + results
            }
            console.log(req);
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
                url: 'http://innodev.vnetcloud.com/LiveIn/api/Notif/',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'action=' + 'mark_read' +
                '&idnotif=' + results +
                '&idaccount=' + $localStorage.currentUser.data[0].idaccount
            }
            console.log(req);
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
                url: 'http://innodev.vnetcloud.com/LiveIn/api/Notifbookmark/',
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
                url: 'http://innodev.vnetcloud.com/LiveIn/api/Notifbookmark/',
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

    function EditProfileService($http) {
        var service = {};
        service.editprofile = editprofile;
        return service;

        function editprofile(idaccount, gender, phone, dateofbirth, fullname, address, avatar, pscode, privilege, password, email, callback) {
            var req = {
                method: 'POST',
                url: 'http://innodev.vnetcloud.com/LiveIn/api/Account/',
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
            console.log(req);
            $http(req)
                .success(function (response) {
                    callback(response);
                })
                .error(function () {
                    callback(false);
                });
        }
    }

    function ProfileService($http, $localStorage) {
        var service = {};
        service.retrievegetaccount = retrievegetaccount;
        return service;

        function retrievegetaccount(callback) {
            var req = {
                method: 'GET',
                url: 'http://innodev.vnetcloud.com/LiveIn/api/Account/?action=retrieve_get&idaccount=' + $localStorage.currentUser.data[0].idaccount
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

    function HistoryService($http) {
        var service = {};
        service.listHistory = listHistory;
        return service;

        function listHistory(idaccount, callback) {
            var req = {
                method: 'GET',
                url: 'http://innodev.vnetcloud.com/LiveIn/api/History/?action=listhistory&idaccount=' + idaccount + '&pagenumber=1&pagesize=1000'
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
