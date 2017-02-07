angular
    .module('livein')
    .controller('download', download)
    .controller('detaildownload', detaildownload);

    function download($ionicSlideBoxDelegate,$localStorage,$ionicPlatform, $scope, $state, DownloadService, $ionicLoading, $ionicPlatform, $ionicPopup, $timeout, $location, $cordovaFile, $cordovaFileTransfer,$cordovaFileOpener2, $filter) {
        if (localStorage.getItem('added_file') === null) {
          var files = ['bams.pdf','zaki.pdf'];
          localStorage.setItem('added_file', files);
        }
        ionic.Platform.ready(function () {
        $ionicLoading.show({ template: $filter('translate')('loading') + "..." });
        //console.log($state.status);

        DownloadService.listdownloadgeneral(function(response) {
            if (response != false) {
                $scope.datageneral = response;
                var source = response;
                console.log(source);

                var fileData = localStorage.added_file.split(',');
                $scope.filedata = fileData;

                var status = [];
                source.forEach(function(itemlist, indexlist, arrlist) {
                  fileData.forEach(function(itemfile, indexfile, arrfile) {
                    if (arrlist[indexlist].filename === arrfile[indexfile]) {
                      $scope.file    = arrlist[indexlist].filename;
                      $scope.storage = arrfile[indexfile];
                      source.push(status_file + ': ' + 'downloaded');
                      //status.push(filename + 'downloaded');
                    };
                  });
                });

                if (ionic.Platform.isIOS()) {
                    var targetPath =  cordova.file.documentsDirectory;
                } else if (ionic.Platform.isAndroid()) {
                    var targetPath = cordova.file.externalRootDirectory  + "Pictures/";
                }

                var targetDownload = targetPath + source;
                //$scope.tesTes = targetPath + $scope.file;
                //Check for the file.
                 /*$cordovaFile.checkDir(cordova.file.documentsDirectory , "LippoCikarang/")
                    .then(function (success) {
                        // success
                    }, function (error) {
                        $cordovaFile.createDir(cordova.file.documentsDirectory , "LippoCikarang", false)
                            .then(function (success) {
                            console.log("Folder created" + success);
                            }, function (error) {
                            console.log("Folder not created." + error);
                            });
                    });*/

                    // Retrieve
                    $scope.ls = localStorage.getItem(downloaded);

                 $cordovaFile.checkFile(targetDownload)
                    .then(function (success) {
                        // success
                        $scope.listGeneral = 'ada';
                        alert('hal 62 : dicek sudah');
                    }, function (error) {
                        // error
                        $scope.listGeneral = 'ndak';
                        alert('file tidak ada');
                    });


                $scope.openPDF = function() {

                    //
                    cordova.plugins.fileOpener2.open(
                        targetDownload, // You can also use a Cordova-style file uri: cdvfile://localhost/persistent/Download/starwars.pdf
                        'application/pdf',
                        {
                            error : function(e) {
                                alert('Error status: ' + e.status + ' - Error message: ' + e.message);
                            },
                            success : function () {
                                alert('file opened successfully');
                            }
                        }
                    );
                    //
                    /*$cordovaFileOpener2.open(
                        targetDownload, // Any system location, you CAN'T use your appliaction assets folder
                        'application/pdf'
                    ).then(function() {
                        console.log('Success');
                    }, function(err) {
                        console.log('An error occurred: ' + JSON.stringify(err));
                    });*/
                };


            } else {
                $scope.datageneral = [{ name: $filter('translate')('no_file_download') }];
            }
            $ionicLoading.hide();
        });

        });

        DownloadService.listdownloadproperty(function(response) {
            if (response != false) {
                $scope.dataproperty = response;
                $scope.filePro = response[0].filename;
                var sourcePro = response;

                var fileData = localStorage.added_file.split(',');
                sourcePro.forEach(function(itemlist, indexlist, arrlist) {
                  fileData.forEach(function(itemfile, indexfile, arrfile) {
                    if (arrlist[indexlist].filename == arrfile[indexfile]) {
                      $scope.listPro = 'success';
                    }
                  });
                });

                if (ionic.Platform.isIOS()) {
                    var targetPath = cordova.file.documentsDirectory;
                } else if (ionic.Platform.isAndroid()) {
                    var targetPath = cordova.file.externalRootDirectory  + "Pictures/";
                }

                var targetDownload = targetPath + source;
                //Check for the file.

                /*$cordovaFile.checkDir(cordova.file.documentsDirectory , "LippoCikarang/")
                    .then(function (success) {
                        // success
                    }, function (error) {
                        $cordovaFile.createDir(cordova.file.documentsDirectory , "LippoCikarang", false)
                            .then(function (success) {
                            console.log("Folder created" + success);
                            }, function (error) {
                            console.log("Folder not created." + error);
                            });
                    });*/
               $cordovaFile.checkFile(targetDownload)
                    .then(function (success) {
                        // success
                        $scope.listPro = 'success';
                        alert('ada file');
                    }, function (error) {
                        // error
                        alert('tidak ada file');
                    });

            } else {
                $scope.dataproperty = [{ name: $filter('translate')('no_file_download') }];
            }
            $ionicLoading.hide();
        });

        DownloadService.generalcategory(function(response) {
            if (response != false) {
                var sum = response.length;
                $scope.gencategory = response;
            } else {
                $scope.gencategory = [{ name: $filter('translate')('no_category') }];
            }
            $ionicLoading.hide();
        });

        DownloadService.propertycategory(function(response) {
            if (response != false) {
                var sum = response.length;
                $scope.procategory = response;
            } else {
                $scope.procategory = [{ name: $filter('translate')('no_category') }];
            }
            $ionicLoading.hide();
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

        $scope.showPopup = function(iddownload) {
            var downloadPopup = $ionicPopup.confirm({
                template: $filter('translate')('are_you_download')
            });
            downloadPopup.then(function(res) {
                if (res) {
                    $state.go("app.downloadDetail", { iddownload: iddownload });
                } else {
                    console.log('cancel');
                }
            });
        };

    }


    function detaildownload($scope, $stateParams, $localStorage, DownloadService, $ionicLoading, $cordovaFileTransfer, $cordovaFile, $timeout, $cordovaFileOpener2, $ionicPlatform, $filter) {
        ionic.Platform.ready(function () {
        DownloadService.detdownload($stateParams.iddownload, function(response) {
            console.log($stateParams.iddownload);
            if (response != false) {
                $scope.detailDiskon = response.detail;
                //alert(JSON.stringify($scope.detailDiskon));
              function appendToStorage(name, data) {
                var old = localStorage.getItem(name);
                if (old === null) old = "";
                localStorage.setItem(name, old + "," + data);
              }

                        if (ionic.Platform.isIOS()) {
                            var targetPath = cordova.file.documentsDirectory;
                        } else if (ionic.Platform.isAndroid()) {
                            var targetPath = cordova.file.externalRootDirectory  + "Pictures/";
                        };




                    //alert(JSON.stringify(cordova.file.documentsDirectory));
                    //alert('targetDownload :'+targetDownload);
                    //alert('targetPath :' + targetPath);
                        /*cordovaFileOpener2.open(
                            targetDownload, // Any system location, you CAN'T use your appliaction assets folder
                            'application/pdf'
                        ).then(function() {
                            alert('Success');
                        }, function(err) {
                            alert('An error occurred: ' + JSON.stringify(err));
                        });*/




                        var fileTransfer = new FileTransfer();
                        var source = response.detail[0].linkfile;
                        //alert(source);
                        var uri = encodeURI(source);
                        var filename = uri.split("/").pop();
                        var targetDownload = targetPath + filename;
                        var a = JSON.stringify(localStorage.getItem('added_file'));
                        //alert(fileURL);

                        /*
                        var fileTransfer = new FileTransfer();
                        alert("About to start transfer");
                        fileTransfer.download(uri, targetPath + filename,
                            function(entry) {
                                console.log("Success!");
                                alert("Success Download");
                            },
                            function(err) {
                                console.log("Error");
                                alert("Error");
                                console.dir(err);
                            });
                        */


                        $cordovaFileTransfer.download(uri, targetDownload, {}, true).then(function(result) {
                            $scope.hasil = 'Save file on ' + targetDownload + ' success!';
                            $scope.filename = uri.split("/").pop();
                            $scope.mywallpaper = targetDownload;

                            var data = $scope.filename;
                            appendToStorage('added_file', data);

                          cordova.plugins.fileOpener2.open(
                            targetDownload, // e.g. '/var/mobile/Applications/XXXXXXXXX/Library/files/mypdf.pdf'
                            'application/pdf',
                            {
                              error : function(errorObj) {
                                console.log('Error status: ' + errorObj.status + ' - Error message: ' + errorObj.message);
                              },
                              success : function () {
                                console.log('file opened successfully');
                              }
                            }
                          );

                        }, function(error) {
                            $scope.hasil = 'Error Download file';
                        }, function(progress) {
                            $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                        });

            } else {
                $scope.data = [{ name: $filter('translate')('no_file_download') }];
                console.log('gagal');
            }
            });
        });
    }
