angular
    .module('livein')
    .controller('eComplaint', eComplaint)
    .controller('eComplaintList', eComplaintList)
    .controller('eComplaintDetail', eComplaintDetail);

    function eComplaint($ionicPlatform, $window, $ionicSlideBoxDelegate, $localStorage, $scope, $state, eComplaintService, $ionicLoading, $ionicPopup, $timeout, $location, $cordovaFile, $cordovaFileTransfer,$cordovaFileOpener2, $filter) {
        ionic.Platform.ready(function () {
            $scope.at = localStorage.getItem('at');
                eComplaintService.getToken(function(response) {
                    if (response != false) {
                        var at = response.access_token;
                        var tt = response.token_type;
                        
                        if(localStorage.getItem('at') != null){
                            var pp = localStorage.getItem('at');
                            console.log('get at : ' ,pp);
                        } else {
                            localStorage.setItem('at', at);
                            console.log('set item : ' ,at);
                            console.log(localStorage.getItem('at'));
                        }
                        
                        
                        localStorage.setItem('tt', tt);
                        
                    } else {
                        eComplaintService.getToken(function(response) {
                            var at = response.access_token;
                            var tt = response.token_type;
                            localStorage.setItem('at', at);
                            localStorage.setItem('tt', tt);
                        })
                    }
                });
        });
    };

    function eComplaintList($ionicSlideBoxDelegate, $localStorage, $scope, $state, eComplaintService, $ionicLoading, $ionicPlatform, $ionicPopup, $timeout, $location, $cordovaFileOpener2, $filter, $cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaDevice, $cordovaActionSheet,$window, $cordovaImagePicker){
        $scope.images = [];
        $scope.data = {};
        $scope.checking = false;
        //$scope.newCase = newCase;
        //Tambahkan
        var at = localStorage.getItem('at');
        if(at != null){
            eComplaintService.getUnit(at, function(response) {
                if (response != false) {
                    $scope.pps = response.PsCode;
                    var pp = $scope.pps;
                    console.log(pp);
                    
                        localStorage.setItem('pp', pp);
                        console.log('set item : ' ,pp);
                    
                    $scope.dataUnit = response;
                    $scope.unit = response.ListUnit;
                    
                } else {
                    console.log('haha kasian ');
                }
            });
        } else {
            console.log('gabisa ambil local storage');
        }
        
        //insert
        $scope.newCase = function(data,at){
            var at = localStorage.getItem('at');
            console.log('data newCase : ', JSON.stringify(data));
            console.log('isole : ',$localStorage.pp);
            var pp = localStorage.getItem('pp');
            var email = $localStorage.currentUser.data[0].email;
            var fullname = $localStorage.currentUser.data[0].fullname;
            var phone = $localStorage.currentUser.data[0].phone;
            var unit = $scope.unit[0].IdDropDown;
            var concern = $scope.data.concern;
            //var pps = $scope.pps;
            var linkImg = $scope.images;

                eComplaintService.insertCase(
                    at,
                    pp,
                    email,
                    fullname,
                    phone,
                    unit,
                    concern,
                    data.description,
                    linkImg, 
                function(response){
                    if (response != false) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'eComplaint',
                            template: $filter('translate')('e_success'),
                            okType: "button-stable",
                            cssClass: "alertPopup"
                        });

                        alertPopup.then(function(res) {
                            $state.go($state.current, {}, {reload: true});
                        });

                        //getlistcase
                        eComplaintService.getListCase(at, function(response) {
                            if (response != false) {
                                $scope.list = response;
                                $scope.dataList = response.ListCase;
                                
                                //$scope.dataList.CreatedOn = new Date($scope.dataList.CreatedOn).toISOString();
                                $scope.dataList.forEach(function(itemlist, indexlist, arrlist) {
                                    $scope.dataList[indexlist].tanggal = new Date($scope.dataList[indexlist].CreatedOn).toISOString();
                                });

                                console.log('alert response : ' , JSON.stringify($scope.dataList));
                            } else {
                                console.log('huft kasian ');
                            }
                        });
                        console.log('Umak Spesial : ',JSON.stringify(response));
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            title: 'eComplaint',
                            template: $filter('translate')('e_failed'),
                            okType: "button-stable",
                            cssClass: "alertPopup"
                        });
                        console.log('Umak ndak Spesial ');
                    }

                });
        }

        
        $scope.changedUnit = function() {
            var id = $scope.data.index;
            //$scope.data.concern = 0;
            if(id != null){
                var at = localStorage.getItem('at', JSON.stringify(at));
                eComplaintService.getHelpname(at, id, function(response) {
                    if (response != false) {
                        $scope.nameDropDown = response.ListHelpName;
                    } else {
                        console.log('huft');
                    }
                });
            }
        }
        
        //getlistcase
        eComplaintService.getListCase(at, function(response) {
            if (response != false) {
                $scope.list = response;
                $scope.dataList = response.ListCase;
                $scope.dataList.forEach(function(itemlist, indexlist, arrlist) {
                    $scope.dataList[indexlist].tanggal = new Date($scope.dataList[indexlist].CreatedOn).toISOString();
                });
                console.log('response 144 : ' , JSON.stringify($scope.dataList));
            } else {
                console.log('huft kasian ' , response);
            }
        });
        
        //Image
        $scope.tackPicture = function() {
            $scope.imgUrl;
            $scope.dataImg;
            // Image picker will load images according to these settings
            var options = {
                maximumImagesCount: 2, // Max number of selected images, I'm using only one for this example
                targetWidth: 100,
                targetHeight: 100,
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
                    console.log('Image URI: ' + results[i]);
                    //"data:image/jpeg;base64," +
                    
                    window.resolveLocalFileSystemURI(results[i],
                            function (fileEntry) {
                                // convert to Base64 string
                                fileEntry.file(
                                    function(file) {
                                        //got file
                                        var reader = new FileReader();
                                        reader.onloadend = function (evt) {
                                            $scope.imgUrl = evt.target.result;
                                            console.log("imgData : ",$scope.imgUrl) // this is your Base64 string
                                        };
                                        reader.readAsDataURL(file);
                                    }, 
                                function (evt) { 
                                    //failed to get file
                                });
                            },
                            // error callback
                            function () { }
                        );
                    }


                $scope.results=results;

                $scope.images.push({
                    filename: "eComplaint-"+results,
                    Base64String: $scope.imgUrl
                });
                
                $scope.checking = true;
                $scope.progressUpload = true;

                $timeout(function() {
                    $scope.progressUpload = false;
                }, 6000);

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

    function eComplaintDetail($ionicSlideBoxDelegate, $localStorage, $scope, $state, eComplaintService, $ionicLoading, $ionicPlatform, $ionicPopup, $timeout, $location, $cordovaFileOpener2, $filter, $cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaDevice, $cordovaActionSheet,$window, $cordovaImagePicker){
        $scope.images = [];
        $scope.data = {};
        $scope.checking = false;
        //$scope.newCase = newCase;
        //Tambahkan
        var at = localStorage.getItem('at');
        if(at != null){
            eComplaintService.getUnit(at, function(response) {
                if (response != false) {
                    $scope.pps = response.PsCode;
                    var pp = $scope.pps;
                    console.log(pp);
                    
                        localStorage.setItem('pp', pp);
                        console.log('set item : ' ,pp);
                    
                    $scope.dataUnit = response;
                    $scope.unit = response.ListUnit;
                    
                } else {
                    console.log('haha kasian ');
                }
            });
        } else {
            console.log('gabisa ambil local storage');
        }
        
       
        //getlistcase
        eComplaintService.getListCase(at, function(response) {
            if (response != false) {
                $scope.list = response;
                $scope.dataList = response.ListCase;
                $scope.dataList.forEach(function(itemlist, indexlist, arrlist) {
                    $scope.dataList[indexlist].tanggal = new Date($scope.dataList[indexlist].CreatedOn).toISOString();
                });
                console.log('response 144 : ' , JSON.stringify($scope.dataList));
            } else {
                console.log('huft kasian ' , response);
            }
        });
        
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