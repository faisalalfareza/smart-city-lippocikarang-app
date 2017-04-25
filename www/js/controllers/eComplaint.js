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
        $ionicLoading.show({ template: $filter('translate')('loading') + "..." });
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
        $ionicLoading.hide();
        
        $scope.newCase = function(data,at){
            var confirmPopup = $ionicPopup.confirm({
                template: $filter('translate')('newCase'),
                okText: $filter('translate')('yes'),
                cancelText: $filter('translate')('no'),
                okType: "button-stable"
            });
            
            confirmPopup.then(function (res) {
                if (res) {
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
                                $ionicLoading.show({ template: $filter('translate')('loading') + "..." });
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
                            $ionicLoading.hide();
                        });
                    }
                });
        }

        
        $scope.changedUnit = function() {
            var id = $scope.data.index;
            //$scope.data.concern = 0;
            if(id != null){
                var at = localStorage.getItem('at', JSON.stringify(at));
                $ionicLoading.show({ template: $filter('translate')('loading') + "..." });
                eComplaintService.getHelpname(at, id, function(response) {
                    if (response != false) {
                        $scope.nameDropDown = response.ListHelpName;
                    } else {
                        console.log('huft');
                    }
                });
                $ionicLoading.hide();
            }
        }

        //getlistcase
        eComplaintService.getListCase(at, function(response) {
            $ionicLoading.show({ template: $filter('translate')('loading') + "..." });
            if (response != false) {
                $scope.list = response;
                $scope.dataList = response.ListCase;
                $scope.dataList.forEach(function(itemlist, indexlist, arrlist) {
                    $scope.dataList[indexlist].tanggal = new Date($scope.dataList[indexlist].CreatedOn).toISOString();
                });
                console.log('Response : ',JSON.stringify($scope.dataList));
            } else {
                console.log('huft kasian ' , response);
            }
            $ionicLoading.hide();
        });

        function convertImgToBase64URL(url, callback, outputFormat){
            var img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = function(){
                var canvas = document.createElement('CANVAS'),
                ctx = canvas.getContext('2d'), dataURL;
                canvas.height = this.height;
                canvas.width = this.width;
                ctx.drawImage(this, 0, 0);
                dataURL = canvas.toDataURL(outputFormat);
                callback(dataURL);
                canvas = null; 
            };
            img.src = url;
        }
        $scope.gambar;
        //coba
        $scope.Pick = function(){
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 100,
                targetHeight: 100,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation:true
                };
            $ionicLoading.show({ template: $filter('translate')('loading') + "..." });
            $cordovaImagePicker.getPictures(options).then(function (results) {
                for (var i = 0; i < results.length; i++) {
                    console.log('Image URI: ' + results[i]);

                    var example_uri = results[i];
                    
                    convertImgToBase64URL(example_uri, function(base64Img){
                        // Base64DataURL
                        var base = base64Img.substring(24);
                        $scope.images.push({
                            filename: "eComplaint-"+results,
                            Base64String: base
                        });
                        $scope.gambar.push(base64Img);
                        console.log('baseGambar : ',$scope.gambar)
                        console.log('images 233 : ',$scope.images);
                        console.log('base64Img 230 : ',base);
                    });
                }
            $ionicLoading.hide();
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

    function eComplaintDetail($ionicSlideBoxDelegate,$stateParams, $localStorage, $scope, $state, eComplaintService, $ionicLoading, $ionicPlatform, $ionicPopup, $timeout, $location, $cordovaFileOpener2, $filter, $cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaDevice, $cordovaActionSheet,$window, $cordovaImagePicker){
        $scope.title = $stateParams.CaseNumber;
        $scope.images = [];
        $scope.datanya = [];

        $scope.searchText = $stateParams.CaseNumber;
        
        $scope.checking = false;
        //$scope.newCase = newCase;
        //Tambahkan

        var at = localStorage.getItem('at');
        if(at != null){
            eComplaintService.getUnit(at, function(response) {
                if (response != false) {
                    
                    $scope.pps = response.PsCode;
                    var pp = $scope.pps;
                        localStorage.setItem('pp', pp);
                        console.log('haiiii : ' ,pp);
                    
                    $scope.dataUnit = response;
                    $scope.unit = response.ListUnit;
                    
                } else {
                    console.log('haha kasian ');
                }
            });
        } else {
            console.log('gabisa ambil local storage');
        }
        
       $scope.detail= [];
        //getlistcase
        eComplaintService.getListCase(at, function(response) {
            if (response != false) {
                
                $scope.list = response;
                $scope.dataList = response.ListCase;
                $scope.detail.push($scope.dataList);
                $scope.dataList.forEach(function(itemlist, indexlist, arrlist) {
                    $scope.dataList[indexlist].tanggal = new Date($scope.dataList[indexlist].CreatedOn).toISOString();
                });
                
                if($scope.detail != null){
                    for (var i = 0; i < $scope.detail.length; i++) {
                        if($scope.detail[i].CaseNumber == $stateParams.CaseNumber){
                            $scope.detailList = $scope.detail[i];

                            var canvas = document.getElementById("c");
                            var ctx = canvas.getContext("2d");

                            var image = new Image();
                            image.onload = function() {
                                ctx.drawImage(image, 0, 0);
                            };
                            image.src = $scope.detailList.ListImage[0];
                        } else {
                            console.log('gak podo');
                        }
                    }
                } else {
                    console.log('scope.detail is null')
                }

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