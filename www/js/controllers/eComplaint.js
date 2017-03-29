angular
    .module('livein')
    .controller('eComplaint', eComplaint)
    .controller('eComplaintList', eComplaintList);

    function eComplaint($ionicPlatform, $window, $ionicSlideBoxDelegate, $localStorage, $scope, $state, eComplaintService, $ionicLoading, $ionicPopup, $timeout, $location, $cordovaFile, $cordovaFileTransfer,$cordovaFileOpener2, $filter) {
        ionic.Platform.ready(function () {
            if (localStorage.getItem('at') === null && localStorage.getItem('tt') === null ) {
                eComplaintService.getToken(function(response) {
                    if (response != false) {
                        var at = response.access_token;
                        var tt = response.token_type;
                        localStorage.setItem('at', JSON.stringify(at));
                        localStorage.setItem('tt', tt);
                    } else {
                        console.log('gaisa njumuk');
                    }
                });
            } else {
                eComplaintService.getToken(function(response) {
                    if (response != false) {
                        var at = response.access_token;
                        var tt = response.token_type;
                        localStorage.setItem('at', at);
                        localStorage.setItem('tt', tt);
                    } else {
                        console.log('gaisa njumuk 2');
                    }
                });
            }
        });
    };

    function eComplaintList($ionicSlideBoxDelegate, $localStorage, $scope, $state, eComplaintService, $ionicLoading, $ionicPlatform, $ionicPopup, $timeout, $location, $cordovaFileOpener2, $filter, $cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaDevice, $cordovaActionSheet, $cordovaImagePicker){
        //Tambahkan
        var at = localStorage.getItem('at', JSON.stringify(at));
        eComplaintService.getUnit(at, function(response) {
            if (response != false) {
                $scope.dataUnit = response;
                $scope.unit = response.ListUnit;
                alert($scope.unit);
                console.log('response : ' , JSON.stringify(response));
            } else {
                console.log('haha kasian ' , response);
            }
        });

        $scope.data = {};

        $scope.changedUnit = function() {
            console.log('51 : ' , $scope.data.index);
            var id = $scope.data.index;
            if(id != null){
                console.log(id);
                alert('allId , ' , allId);
                eComplaintService.getHelpname(at, id, function(response) {
                    if (response != false) {
                        $scope.data = response;
                        $scope.nameDropDown = response.ListHelpName;
                        console.log('Drop Down : ' , JSON.stringify($scope.nameDropDown));
                        console.log('response : ' , JSON.stringify(response));
                    } else {
                        console.log('huft : ' , response);
                    }
                });
            }
        }
        //

        //getlistcase
        eComplaintService.getListCase(at, function(response) {
            if (response != false) {
                $scope.list = response;
                $scope.dataList = response.ListCase;
                console.log('response : ' , $scope.dataList);
            } else {
                console.log('huft kasian ' , response);
            }
        });
        //
        $scope.images = [];
        $scope.checking = false;
        //Image
        $scope.loadImage = function() {
            // Image picker will load images according to these settings
            var options = {
                maximumImagesCount: 3, // Max number of selected images, I'm using only one for this example
                width: 800,
                height: 800,
                quality: 100, // Higher is better
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation:true
            };

            $cordovaImagePicker.getPictures(options).then(function(results) {
                // Loop through acquired images
                for (var i = 0; i < results.length; i++) {
                    
                    $scope.images.push({
                        filename: "eComplaint-" + results[i] + ".jpg",
                        Base64String: "data:image/jpeg;base64," + results[i]
                    });
                    //filename: "eComplaint-" + i + ".jpg",
                }
                $scope.checking = true;
                $scope.progressUpload = true;

                $timeout(function() {
                    $scope.progressUpload = false;
                }, 6000);

            alert('image : ',$scope.images);
            
            }, function(error) {
                console.log('Error: ' + JSON.stringify(error)); // In case of error
            })
        }
        $scope.pathForImage = function(images) {
            if (images === null) {
                return ''
            } else {
                return cordova.file.dataDirectory + images
            }
        }
        $scope.clearImages = function() {
            $scope.images = [];
            $scope.checking = false;
        }
        //
        
        $scope.generals = 'active';

        // general tab & property tab
        var genTab = angular.element(document.querySelector('#generaltab'));
        var proTab = angular.element(document.querySelector('#propertytab'));
        genTab.addClass("active");

        $scope.general = function() {
            $ionicSlideBoxDelegate.previous();
            $scope.generals = 'active';
            $scope.propertys = '';
        };
        $scope.property = function() {
            $ionicSlideBoxDelegate.next();
            $scope.propertys = 'active';
            $scope.generals = '';
        };
        // Called each time the slide changes
        $scope.slideChanged = function(index) {
            $scope.slideIndex = index;
            if ($scope.slideIndex == 1) {
                $scope.generals = '';
                $scope.propertys = 'active';
            } else {
                $scope.propertys = '';
                $scope.generals = 'active';
            }
        };

    };