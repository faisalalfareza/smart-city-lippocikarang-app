angular
    .module('livein')
    .controller('profile', profile)
    .controller('notification', notification)
    .controller('notificationDetail', notificationDetail)
    .controller('editProfile', editProfile)
    .controller('history', history)
    .controller('myhistory', myhistory)
    .filter('elapsed', elapsed);

    function elapsed() {
        return function (date) {
            if (!date) return;

                var time = Date.parse(date.replace(' ', 'T'));
                timeNow = new Date().getTime();
                difference = timeNow - time;
                seconds = Math.floor(difference / 1000);
                minutes = Math.floor(seconds / 60);
                hours = Math.floor(minutes / 60);
                days = Math.floor(hours / 24);

            if (days > 1)
                return days + " days";

            if (hours > 1)
                return hours + " h";

            if (minutes > 1)
                return minutes + " m";

                return "a few seconds ago";

        }
    }

    function profile($scope, $timeout, $rootScope, $state, $localStorage, $filter, $ionicPopup, $ionicLoading, LoginService, Notification, ProfileService, $window) {
        $scope.fullname = $localStorage.currentUser.data[0].fullname;
        $scope.logoutConfirm = logoutConfirm;

        $scope.showNotification = false;

        countnotif();

        $scope.cb = [];
        console.log($scope.cb);
        function countnotif() {
            Notification.totalnotif(
                function (response) {
                    if (response != false) {
                        $scope.listnotifUser = response;
                        $scope.listnotif = [];

                        var a = 0;
                        angular.forEach($scope.listnotifUser, function (obj) {
                            var b = a++;
                            var list = $scope.listnotifUser;
                            var data = list[b];
                            var isread = data.isread;

                            if (isread === 'f') {
                                $scope.listnotif.push({
                                    'isread': isread
                                });
                            }
                        });

                        if ($scope.listnotif.length === 0) {
                            $scope.showNotification = false;
                            $scope.cb.push(0);
                        } else {
                            $scope.countnotif = $scope.listnotif.length;
                            $scope.showNotification = true;

                            var cn = $scope.listnotif.length;
                            $scope.cb.push(cn);
                        }
                    } else {
                        $scope.listnotifUser = { name: $filter('translate')('failed_get_data') };
                        $scope.showNotification = false;
                        $scope.cb.push(0);
                    }
                    $ionicLoading.hide();
                });
        }

        retrievegetaccount();

        function retrievegetaccount() {
            ProfileService.retrievegetaccount(
                function (response) {
                    if (response != false) {
                        var account = response.account;
                        var arrayLength = account.length;
                        for (var i = 0; i < arrayLength; i++) {
                            $scope.avatar = account[i].avatar;
                        }
                    } else {
                        $scope.dataaccount = { name: $filter('translate')('failed_get_data') };
                    }
                });

        }

        function logoutConfirm() {
            var confirmPopup = $ionicPopup.confirm({
                template: $filter('translate')('dialog_signout'),
                okText: $filter('translate')('yes'),
                cancelText: $filter('translate')('no'),
                okType: "button-stable"
            });

            confirmPopup.then(function (res) {
                if (res) {
                    LoginService.logoutUser();
                    $rootScope.buttonDisabled = false;
                    $ionicLoading.show({ template: $filter('translate')('logoutmessage') + "...", duration: 500 });
                    $state.go('login');
                }
            });
        }
    }

    function notification($scope, $stateParams, $ionicLoading, $location, $state, Notification, $ionicPopup, $filter, $window, $localStorage) {
        $scope.insertbookmarknotif = insertbookmarknotif;
        $scope.deletebookmarknotif = deletebookmarknotif;

        var lang = localStorage.getItem('NG_TRANSLATE_LANG_KEY');

        listnotifService();

        function listnotifService() {
            $ionicLoading.show({ template: $filter('translate')('loading') + "..." });
            $scope.listnotifUser = [];

            var pagenumber = 1;

            Notification.listnotif(lang, pagenumber, function(response) {
                    if (response != false) {
                        $scope.listnotifUser = response;

                        var i = 2;
                        var a = 0;
                        $scope.loadNotif = function () {
                            pagenumber = i;
                            Notification.listnotif(pagenumber, function(response){
                                if(response[a].idnotif != 'undefined'){
                                    $scope.listnotifUser = $scope.listnotifUser.concat(response);
                                } else {
                                    alert('no more data loaded');
                                }
                            });

                            $scope.$broadcast('scroll.infiniteScrollComplete');
                            i++;
                            a++;
                        };
                    } else {
                        $scope.listnotifUser = { name: $filter('translate')('failed_get_data') };
                    }
                    $ionicLoading.hide();
                });
        };

        function insertbookmarknotif(idnotif) {
            Notification.insertBookmarkNotif(
                idnotif,
                function (response) {
                    if (response != false) {
                        $ionicLoading.show({
                            template: $filter('translate')('success_favorite'),
                            duration: 5000
                        });
                        listnotifService();
                    } else {
                        $ionicLoading.show({
                            template: $filter('translate')('failed_favorite'),
                            duration: 5000
                        });
                        listnotifService();
                    }
                    $ionicLoading.hide();
                });
        };

        function deletebookmarknotif(idnotifbookmark) {
            Notification.deleteBookmarkNotif(
                idnotifbookmark,
                function (response) {
                    if (response != false) {
                        $ionicLoading.show({
                            template: $filter('translate')('remove_favorite_success'),
                            duration: 5000
                        });
                        listnotifService();
                    } else {
                        $ionicLoading.show({
                            template: $filter('translate')('remove_favorite_failed'),
                            duration: 5000
                        });
                        listnotifService();
                    }
                    $ionicLoading.hide();
                });
        };

        var initial_state = false;
        $scope.show = initial_state;

        // toggle value
        $scope.showFooter = function () {
            $scope.show = !$scope.show;
        }

        $scope.delete = function (idnotif) {
            var p = [];
            var results = [];
            var a = 0;

            for (var i = 0; i < $scope.listnotifUser.length; i++) {
                var item = $scope.listnotifUser[i];
                if (item.checked) {
                    p.push(item)
                }
            }
            $scope.selectedItems = p;

            angular.forEach($scope.selectedItems, function (obj) {
                var b = a++;
                var data = $scope.selectedItems;
                var dat = data[b];
                var ll = dat.idnotif;

                results = dat.idnotif;
                $scope.idku = results;

                Notification.deleteNotif(results, function (response) {
                    if (response != false) {
                        $ionicLoading.show({
                            template: $filter('translate')('msg_deleted'),
                            duration: 5000
                        });
                        listnotifService();
                    } else {
                        $ionicLoading.show({
                            template: $filter('translate')('msg_delete_failed'),
                            duration: 5000
                        });
                        listnotifService();
                    }
                });
            })

        }

        $scope.readed = function () {
            var p = [];
            var results = [];
            var a = 0;

            for (var i = 0; i < $scope.listnotifUser.length; i++) {
                var item = $scope.listnotifUser[i];
                if (item.checked) {
                    p.push(item)
                }
            }
            $scope.selectedItems = p;

            angular.forEach($scope.selectedItems, function (obj) {
                var b = a++;
                var data = $scope.selectedItems;
                var dat = data[b];
                var ll = dat.idnotif;

                results = dat.idnotif;
                $scope.idku = results;

                Notification.updateNotif(results, function (response) {
                    if (response != false) {
                        $ionicLoading.show({
                            template: $filter('translate')('msg_marked'),
                            duration: 5000
                        });
                        listnotifService();
                    } else {
                        $ionicLoading.show({
                            template: $filter('translate')('msg_update_failed'),
                            duration: 5000
                        });
                        listnotifService();
                    }
                });
            })
        }
    }

    function notificationDetail($scope, $stateParams, $ionicLoading, $location, $state, Notification, $ionicPopup, $ionicHistory, $filter) {
        $scope.goBack = function () {
            $state.go('app.notification');
        };

        // Notification.listnotif(function (response) {
        //     if (response != false) {
        //         $scope.results = [];
        //         $scope.notif = response;

        //         var a = 0;
        //         angular.forEach($scope.notif, function (obj) {
        //             var b = a++;
        //             var list = $scope.notif;
        //             var data = list[b];
        //             var ll = data.idnotif;

        //             if (ll == $stateParams.idnotif) {
        //                 $scope.results.push(list[b]);
        //             }
        //         })

        //     } else {
        //         $.data = { name: $filter('translate')('failed_get_data') };
        //     }

        // });

        var lang = localStorage.getItem('NG_TRANSLATE_LANG_KEY');

        Notification.detailNotif(lang, function (response) {
            if (response != false) {
                $scope.details = response.notif;
                $scope.bookmarked = $stateParams.bookmarked;
            } else {
                $.data = { name: $filter('translate')('failed_get_data') };
            }

        });
    }

    function editProfile($scope, $ionicLoading, $location, $state, EditProfileService, ProfileService,
        $cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaDevice, $ionicPopup, $cordovaActionSheet, $filter) {
        $scope.saveEditProfile = saveEditProfile;

        $scope.isRead = true;
        $scope.isEdit1 = true;
        $scope.ShowRead = function () {
            //If DIV is hidden it will be visible and vice versa.
            $scope.isRead = $scope.isRead ? false : true;
        }
        $scope.ShowEdit = function () {
            //If DIV is hidden it will be visible and vice versa.
            $scope.isEdit1 = $scope.isEdit1 ? false : true;
        }

        dataProfile();

        function dataProfile() {
            $ionicLoading.show({ template: $filter('translate')('loading') + "..." });
            ProfileService.retrievegetaccount(
                function (response) {
                    if (response != false) {
                        $scope.dataaccount = response.account;
                        $scope.account = [];
                        var a = 0;
                        angular.forEach($scope.dataaccount, function(obj) {
                            var b = a++;
                            var list = $scope.dataaccount;
                            var data = list[b];
                            
                            var address = data.address;
                            var avatar = data.avatar;
                            var createdate = data.createdate;
                            var dateofbirth = data.dateofbirth;
                            var email = data.email;
                            var fullname = data.fullname;
                            var gender = data.gender;
                            var idaccount = data.idaccount;
                            var privilege = data.privilege;
                            var pscode = data.pscode;
                            
                            if(data.phone==null) {
                                var phone = ""; 
                            } else {
                                var phone = data.phone; 
                            }

                            $scope.account.push({
                                'address': address,
                                'avatar': avatar,
                                'createdate': createdate,
                                'dateofbirth': dateofbirth,
                                'email': email,
                                'fullname': fullname,
                                'gender': gender,
                                'idaccount': idaccount,
                                'privilege': privilege,
                                'pscode': pscode,
                                'phone': phone
                            });

                            console.log($scope.account);
                        });
                    } else {
                        $scope.dataaccount = { name: $filter('translate')('failed_get_data') };
                    }

                    $ionicLoading.hide();
                });
        }

        $scope.image = null;

        function saveEditProfile(user) {
            $ionicLoading.show({ template: $filter('translate')('loading') + "..." });
            var filename = $scope.image; // File name only

            if (filename === null) {
                var avatarupdate = user.avatar;
            } else {
                var url = encodeURI("http://innodev.vnetcloud.com/LiveInWeb/assets/img/upload_file_avatar.php");
                var targetPath = $scope.pathForImage($scope.image); // File for Upload

                var options = {
                    fileKey: "file",
                    fileName: filename,
                    chunkedMode: false,
                    mimeType: "multipart/form-data",
                    params: { 'fileName': filename }
                };

                $cordovaFileTransfer.upload(url, targetPath, options)
                    .then(function (result) {
                        // $scope.showAlert('Success', 'Image upload finished.');
                        console.log("Image upload finished");
                    });

                var avatarupdate = "http://innodev.vnetcloud.com/LiveInWeb/assets/img/account/" + filename;
            }

            EditProfileService.editprofile(
                user.idaccount,
                user.gender,
                user.phone,
                user.dateofbirth,
                user.fullname,
                user.address,
                avatarupdate,
                user.pscode,
                user.privilege,
                user.password,
                user.email,
                function (response) {
                    if (response != false) {
                        var alertPopup = $ionicPopup.alert({
                            title: $filter('translate')('msg_update'),
                            template: $filter('translate')('msg_update_success'),
                            okText: $filter('translate')('okay'),
                            okType: "button-stable",
                            cssClass: "alertPopup"
                        });
                        dataProfile();
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            title: $filter('translate')('msg_update'),
                            template: $filter('translate')('msg_update_failed'),
                            okText: $filter('translate')('okay'),
                            okType: "button-stable",
                            cssClass: "alertPopup"
                        });
                        dataProfile();
                    }
                    $ionicLoading.hide();
                });
        };

        $scope.showAlert = function (title, msg) {
            var alertPopup = $ionicPopup.alert({
                title: title,
                template: msg,
                okType: "button-stable",
                cssClass: "alertPopup"
            });
        };

        // The rest of the app comes in here
        // Present Actionsheet for switch beteen Camera / Library
          $scope.loadImage = function () {
            var callback = function(buttonIndex) {
              setTimeout(function() {
                //alert('button index clicked: ' + buttonIndex);
              });
            };

            var options = {
              title: $filter('translate')('select_image_source'),
              buttonLabels: [$filter('translate')('load_from_library'), $filter('translate')('use_camera')],
              addCancelButtonWithLabel: $filter('translate')('cancel'),
              androidEnableCancelButton: true,
              winphoneEnableCancelButton: true,
              destructiveButtonLast: true
            };

             $cordovaActionSheet.show(options, callback).then(function (btnIndex) {
                var type = null;
                    if (btnIndex === 1) {
                    type = Camera.PictureSourceType.PHOTOLIBRARY;
                } else if (btnIndex === 2) {
                    type = Camera.PictureSourceType.CAMERA;
                }
                if (type !== null) {
                    $scope.selectPicture(type);
                }
             });
          };

        $scope.selectPicture = function (sourceType) {
            var options = {
                quality: 100,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: sourceType,
                saveToPhotoAlbum: false
            };

            $cordovaCamera.getPicture(options).then(function (imagePath) {
                // Grab the file name of the photo in the temporary directory
                var currentName = imagePath.replace(/^.*[\\\/]/, '');
                //Create a new name for the photo
                var d = new Date(),
                    n = d.getTime(),
                    newFileName = "account-" + n + ".jpg";

                if ($cordovaDevice.getPlatform() == 'Android' && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
                    window.FilePath.resolveNativePath(imagePath, function (entry) {
                        window.resolveLocalFileSystemURL(entry, success, fail);

                        function fail(e) {
                            console.error('Error: ', e);
                        }

                        function success(fileEntry) {
                            var namePath = fileEntry.nativeURL.substr(0, fileEntry.nativeURL.lastIndexOf('/') + 1);
                            // Only copy because of access rights
                            $cordovaFile.copyFile(namePath, fileEntry.name, cordova.file.dataDirectory, newFileName)
                                .then(function (success) {
                                    $scope.image = newFileName;

                                }, function (error) {
                                    $scope.showAlert('Error', error.exception);
                                });
                        };
                    });
                } else {
                    var namePath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                    // Move the file to permanent storage
                    $cordovaFile.moveFile(namePath, currentName, cordova.file.dataDirectory, newFileName)
                        .then(function (success) {
                            $scope.image = newFileName;
                        }, function (error) {
                            $scope.showAlert('Error', error.exception);
                        });
                }
            },
                function (err) {
                    // Not always an error, maybe cancel was pressed...
                })
        };

        $scope.pathForImage = function (image) {
            if (image === null) {
                return '';
            } else {
                return cordova.file.dataDirectory + image;
            }
        };
    }

    function history($scope, $localStorage) {
        $scope.idaccount = $localStorage.currentUser.data[0].idaccount;
    }

    function myhistory($scope, $stateParams, $localStorage, $ionicLoading, HistoryService, $filter) {
        $ionicLoading.show({ template: $filter('translate')('loading') + "...", duration: 1000 });
        $scope.data = [];
        var pagenumber = 1;
        $scope.idaccount = $localStorage.currentUser.data[0].idaccount;

        HistoryService.listHistory($stateParams.idaccount, pagenumber, function (response) {
            if (response != false) {
                $scope.data = response;

                    var i = 2;
                    $scope.loadMore = function () {
                            pagenumber = i;
                            
                            HistoryService.listHistory($stateParams.idaccount, pagenumber, function(response){
                                if(response){
                                    $scope.data = $scope.data.concat(response);
                                } else {
                                    console.log('no more data loaded');
                                }
                            });

                            $scope.$broadcast('scroll.infiniteScrollComplete');
                            i++;
                    };
                    //
            } else {
                $scope.data = [{ name: $filter('translate')('no_user') }];
            }
            $ionicLoading.hide();
        });

    }
