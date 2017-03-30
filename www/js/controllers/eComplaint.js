angular
    .module('livein')
    .controller('eComplaint', eComplaint)
    .controller('eComplaintList', eComplaintList);

    function eComplaint($ionicPlatform, $window, $ionicSlideBoxDelegate, $localStorage, $scope, $state, eComplaintService, $ionicLoading, $ionicPopup, $timeout, $location, $cordovaFile, $cordovaFileTransfer,$cordovaFileOpener2, $filter) {
        ionic.Platform.ready(function () {
            $scope.at = localStorage.getItem('at');
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
        
        $scope.images = [];
        $scope.data = {};
        $scope.checking = false;
        //$scope.newCase = newCase;
        //Tambahkan
        var at = localStorage.getItem('at', JSON.stringify(at));
        
        eComplaintService.getUnit(at, function(response) {
            if (response != false) {
                $scope.pps = response.PsCode;
                //$scope.data = $scope.data.push($scope.pps);
                $scope.dataUnit = response;
                $scope.unit = response.ListUnit;
                console.log('response : ' , JSON.stringify(response));  

                var pps = $scope.pps;
                var unit = $scope.unit;
                var linkImg = $scope.images;

                $scope.newCase = function(data,pps,unit){
                    console.log('newCase dipitet',JSON.stringify(data));
                    alert('isolo');
                    eComplaintService.insertCase(pps,unit,data.concern,data.description,linkImg, function(response){
                        if (response != false) {
                            console('yeay');
                        } else {
                            console('huft');
                        }

                    });
                }

            } else {
                console.log('haha kasian ' , response);
            }
        });
        
        $scope.changedUnit = function() {
            var id = $scope.data.index;
            if(id != null){
                var at = localStorage.getItem('at', JSON.stringify(at));
                eComplaintService.getHelpname(at, id, function(response) {
                    if (response != false) {
                        $scope.data = response;
                        $scope.nameDropDown = response.ListHelpName;
                    } else {
                        console.log('huft : ' , response);
                    }
                });
            }
        }

        $scope.Helpname = function(){
            console.log('62 : ', $scope.data.concern);
            alert('63 : ', $scope.data.concern);
        }
        
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

        //Image
        $scope.tackPicture = function() {
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
                        filename: "eComplaint-" + [i] + ".jpg",
                        Base64String: "data:image/jpeg;base64," + results[i]
                    });
                }
                $scope.checking = true;
                $scope.progressUpload = true;

                $timeout(function() {
                    $scope.progressUpload = false;
                }, 6000);

                console.log('data 123 : ',$scope.data);
                console.log('image 124 : ',JSON.stringify($scope.images));
                var ps = localStorage.getItem('PsCode', JSON.stringify(PsCode));
                console.log('psCode : ', ps);
            
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
        //end of image

        //insert case
        var linkImg = $scope.images.join();
        
        //console.log('PsCode : ' ,localStorage.getItem('PsCode', JSON.stringify(PsCode)));
        $scope.newCase = function(data){
            alert('newCase on process');
            
            alert(data);
            alert(linkImg);
            console.log(linkImg);
            console.log(data);
            
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