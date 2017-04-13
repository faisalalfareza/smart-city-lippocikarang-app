angular
    .module('livein')
    .controller('forum', forum)
    .controller('forumdetail', forumdetail)
    .controller('forumdetailImage', forumdetailImage)
    .controller('forumComment', forumComment)
    .controller('topic', topic)
    .controller('forumupdate', forumupdate)
    .controller('forumGallery', forumGallery)
    // Add this directive where you keep your directives
    .directive('onLongPress', onLongPress)

    function onLongPress($timeout) {
        return {
            restrict: 'A',
            link: function($scope, $elm, $attrs) {
                $elm.bind('touchstart', function(evt) {
                    // Locally scoped variable that will keep track of the long press
                    $scope.longPress = true;

                    // We'll set a timeout for 600 ms for a long press
                    $timeout(function() {
                        if ($scope.longPress) {
                            // If the touchend event hasn't fired,
                            // apply the function given in on the element's on-long-press attribute
                            $scope.$apply(function() {
                                $scope.$eval($attrs.onLongPress)
                            });
                        }
                    }, 600);
                });

                $elm.bind('touchend', function(evt) {
                    // Prevent the onLongPress event from firing
                    $scope.longPress = false;
                    // If there is an on-touch-end function attached to this element, apply it
                    if ($attrs.onTouchEnd) {
                        $scope.$apply(function() {
                            $scope.$eval($attrs.onTouchEnd)
                        });
                    }
                });
            }
        };
    }

    function forum($scope, $stateParams, ForumService, $ionicLoading, $filter, $localStorage) {

        $ionicLoading.show({ template: $filter('translate')('loading') + "...", duration: 1000 })
        $scope.data = [];
        $scope.barulo = [];
        $scope.lama = [];
        $scope.lamaloop = [];
        $scope.baruloop = [];

        var pagenumber = 1;
        var i = 1;
        $scope.idaccount = $localStorage.currentUser.data[0].idaccount;
        $scope.loadForum = function () {
                pagenumber = i;
                
                ForumService.listforum($stateParams.status, pagenumber, function(response){
                    if(response){
                        $scope.data = $scope.data.concat(response);
                        $scope.lama = response[0].idforums;  
                        $scope.lamaloop = response;                ;
                    } else {
                        console.log('no more data loaded');
                    }
                });

                
                $scope.$broadcast('scroll.infiniteScrollComplete');
                i++;
        };
        
        $scope.doRefresh = function() {
            
                ForumService.listNewforum($stateParams.status, function(response) {
                    $scope.barulo = response[0].idforums;  
                    $scope.baruloop = response;
                    //console.log('lama : ' , $scope.lama , ' baru : ' , $scope.barulo);
                    if($scope.lama != $scope.barulo){
                        console.log('lama : ' , $scope.lama , ' baru : ' , $scope.data[0].idforums);

                        var i = 0;
                        $scope.baruloop.forEach(function(itemlist, indexlist, arrlist) {
                            $scope.lamaloop.forEach(function(itemfile, indexfile, arrfile) {
                                if(arrlist[indexfile].idforums != arrfile[indexfile].idforums){
                                    $scope.data = [];
                                    $scope.data = $scope.data.concat($scope.baruloop);
                                   //
                                    var i = 2;
                                    $scope.loadForum = function () {
                                        console.log('hehe');
                                            var pagenumber = i;
                                            
                                            ForumService.listforum($stateParams.status, pagenumber, function(response){
                                                if(response){
                                                    $scope.data = $scope.data.concat(response);
                                                    $scope.lama = response[0].idforums;  
                                                    $scope.lamaloop = response;
                                                    console.log($scope.lama)                      ;
                                                } else {
                                                    console.log('no more data loaded');
                                                }
                                            });

                                            $scope.$broadcast('scroll.infiniteScrollComplete');
                                            i++;
                                    };
                                } else {
                                    console.log('tidak ada data terbaru');
                                }
                            });
                        });
                     
                        $scope.$broadcast('scroll.refreshComplete');
                    } else {
                        console.log('lama : ' , $scope.lama , ' baru : ' , $scope.data[0].idforums);
                        console.log('tidak ada data baru');
                        $scope.$broadcast('scroll.refreshComplete');
                    }
                });
        };

        /*ForumService.listforum($stateParams.status, pagenumber, function(response) {
            if (response != false) {
                $scope.data = response;
            } else {
                $scope.data = [{ name: $filter('translate')('no_property') }]
            }
            $ionicLoading.hide()
        })*/
    }

    function forumdetail($scope,  $ionicHistory, $window, $stateParams, $ionicLoading, $localStorage, ForumService, $ionicModal, $ionicPopup, $location, $filter, $state, $ionicSlideBoxDelegate,$timeout,
        $cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaDevice, $cordovaActionSheet, $cordovaImagePicker) {
        $scope.account = $localStorage.currentUser.data[0].idaccount
        console.log('tes1');
        $scope.myGoBack = function() {
            $ionicHistory.goBack();
        };
        var idaccount = $stateParams.idaccount;
        //if($location.path() == "/app/forumdetail/"+$stateParams.idforum+"/"+$stateParams.idaccount){
            ForumService.forumdetail(idaccount,function(response) {
                console.log('tes1 masuk response');
                $timeout(function(){  
                if (response != false) {
                    angular.forEach(response.detail, function(value, key) {
                        $scope.detail = value[0]
                    })
                    $scope.detail = response.detail[0];
                    console.log($scope.detail);
                    $scope.title = $scope.detail.title;
                    $scope.comment = response.comment;
                    $scope.galleryforums = response.galleryforums;
                    
                    $ionicSlideBoxDelegate.update();

                    var gall = $stateParams.idx;
                    $scope.gall = gall;

                    var keys = Object.keys($scope.galleryforums);
                    $scope.len = keys.length;

                    var i = 1;
                    $scope.galleryforums.forEach(function(itemfile, indexfile, arrfile) {
                        $scope.galleryforums[indexfile].number = i++;
                    });

                    $scope.satu = $scope.galleryforums[0];
                    $scope.s = 0;
                    $scope.d = 1;
                    $scope.t = 2;
                    $scope.dua = $scope.galleryforums[1];
                    $scope.tiga = $scope.galleryforums[2];
                    $scope.hitung = $scope.galleryforums.length;
                    $scope.idforum = $scope.galleryforums[0].idforums;

                    $scope.move1 = function(){
                        $state.go('app.forumDetailImage', {idforum: $scope.idforum,idx: '0'});
                        //$state.go('app.newforum');
                    }
                    $scope.move2 = function(){
                        $state.go('app.forumDetailImage', {idforum: $scope.idforum,idx: '1'});
                    }
                    $scope.move3 = function(){
                        $state.go('app.forumDetailImage', {idforum: $scope.idforum,idx: '2'});
                    }
                    
                } else {
                    $scope.data = { name: $filter('translate')('failed_get_data') }
                }
                }, 10);
            })
       /* } else {
            console.log('gausa di cari');
        }*/

        function next() {
            $ionicSlideBoxDelegate.next();
        };

        function previous() {
            $ionicSlideBoxDelegate.previous();
        };

        $scope.slideChanged = function() {
            $ionicSlideBoxDelegate.update();
        };

        $scope.updateForum = updateForum;

        $scope.images = [];
        $scope.checking = false;
        $scope.gambar = [];

        function updateForum(detail) {

            var a = 0;
            angular.forEach($scope.images, function(obj) {
                var b = a++;
                var list = $scope.images;
                var data = list[b];

                var url = 'http://innodev.vnetcloud.com/LiveInWeb/assets/img/upload_file_forum.php';

                // File for Upload
                var targetPath = data;

                // File name only
                var d = new Date(),
                    n = d.getTime(),
                    filename = "forum-" + b + '-' + n + ".jpg";

                $scope.gambar.push('http://innodev.vnetcloud.com/LiveInWeb/assets/img/forums/' + filename);

                var options = {
                    fileKey: 'file',
                    fileName: filename,
                    chunkedMode: false,
                    mimeType: 'image/*',
                    params: { 'fileName': filename }
                };
                $cordovaFileTransfer.upload(url, targetPath, options)
                    .then(function(result) {
                        console.log(result);
                    })
            })
            var linkImg = $scope.gambar.join();
            ForumService.insertGallery(
                detail.idforums,
                linkImg,
                function(response) {
                    if (response != false) {
                        console.log("success upload gallery");
                    } else {
                        console.log("failed upload gallery");
                    }
                }
            )
            $ionicLoading.show({ template: $filter('translate')('loading') + "..." })
            ForumService.updateforum(
                detail.idaccount,
                detail.title,
                detail.description,
                detail.viewer,
                detail.createdate,
                detail.idforums,
                function(response) {
                    if (response != false) {
                        var alertPopup = $ionicPopup.alert({
                            title: $filter('translate')('msg_update_success'),
                            okText: $filter('translate')('okay'),
                            okType: "button-stable",
                            cssClass: "alertPopup"
                        })
                        $location.path('app/forumdetail/' + detail.idforums)
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            title: $filter('translate')('msg_update_failed'),
                            okText: $filter('translate')('okay'),
                            okType: "button-stable",
                            cssClass: "alertPopup"
                        }); // tetap di halaman register//muncul alert phone or email alredy exist->dari api persis
                        $location.path('app/forumdetail/' + detail.idforums)
                    }
                    $ionicLoading.hide()
                })
        }
        $scope.loadImage = function() {
            // Image picker will load images according to these settings
            var options = {
                maximumImagesCount: 3, // Max number of selected images, I'm using only one for this example
                width: 800,
                height: 800,
                quality: 100 // Higher is better
            };

            $cordovaImagePicker.getPictures(options).then(function(results) {
                // Loop through acquired images
                for (var i = 0; i < results.length; i++) {
                    $scope.images.push(results[i]);
                }
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

        $scope.deleteforum = deleteForum;

        function deleteForum(idforums) {
            $ionicLoading.show({ template: $filter('translate')('loading') + "..." })
            ForumService.deleteforum(
                idforums,
                function(response) {
                    if (response != false) {
                        var alertPopup = $ionicPopup.alert({
                            title: $filter('translate')('delete_topic_success'),
                            okText: $filter('translate')('okay'),
                            okType: "button-stable",
                            cssClass: "alertPopup"
                        })
                        //alertPopup.then(function(res) {
                            /*$state.go('app.forum', {}, {reload: true});
                            $ionicHistory.clearCache().then(function(){
                                $location.path('app/forum');
                        });*/
                        //});
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            title: $filter('translate')('delete_topic_failed'),
                            okText: $filter('translate')('okay'),
                            okType: "button-stable",
                            cssClass: "alertPopup"
                        }); // tetap di halaman register//muncul alert phone or email alredy exist->dari api persis
                        //alertPopup.then(function(res) {
                            /*$state.go('app.forum', {}, {reload: true});
                            $ionicHistory.clearCache().then(function(){
                                $location.path('app/forum');
                        });*/
                        //});
                        //$location.path('app/forum');
                        
                    }
                    //$location.path('app/forum')
                    $ionicHistory.clearCache().then(function(){
                                $location.path('app/forum');
                        });
                    //$state.go('app.forum', {}, {reload: true});
                })
                $ionicLoading.hide()
        }

        $ionicModal.fromTemplateUrl('templates/modal.html', {
            id: '1',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.omodal1 = modal
        })

        $scope.deleteGallery = deleteGallery;

        function deleteGallery(idgallery) {
            console.log(idgallery);
            // A confirm dialog
            var confirmPopup = $ionicPopup.confirm({
                template: $filter('translate')('gallery_confirm'),
                okText: $filter('translate')('yes'),
                okType: 'button-light',
                cancelType: 'button-light',
                cancelText: $filter('translate')('no'),
            });

            confirmPopup.then(function(res) {
                if (res) {
                    ForumService.deleteGallery(
                        idgallery,
                        function(response) {
                            if (response != false) {
                                var alertPopup = $ionicPopup.alert({
                                    title: $filter('translate')('msg_delete_success'),
                                    okText: $filter('translate')('okay'),
                                    okType: "button-stable",
                                    cssClass: "alertPopup"
                                })
                            } else {
                                var alertPopup = $ionicPopup.alert({
                                    title: $filter('translate')('msg_delete_failed'),
                                    okText: $filter('translate')('okay'),
                                    okType: "button-stable",
                                    cssClass: "alertPopup"
                                });

                            }
                            $state.go('app.forum')
                        })
                }
            });
        }


        // Example functions
        $scope.itemOnLongPress = function(idgallery) {
            console.log(idgallery);
            // A confirm dialog
            var confirmPopup = $ionicPopup.confirm({
                template: $filter('translate')('gallery_confirm'),
                okText: $filter('translate')('yes'),
                okType: 'button-light',
                cancelType: 'button-light',
                cancelText: $filter('translate')('no'),
            });

            confirmPopup.then(function(res) {
                if (res) {
                    ForumService.deleteGallery(
                        idgallery,
                        function(response) {
                            if (response != false) {
                                var alertPopup = $ionicPopup.alert({
                                    title: $filter('translate')('msg_delete_success'),
                                    okText: $filter('translate')('okay'),
                                    okType: "button-stable",
                                    cssClass: "alertPopup"
                                })
                            } else {
                                var alertPopup = $ionicPopup.alert({
                                    title: $filter('translate')('msg_delete_failed'),
                                    okText: $filter('translate')('okay'),
                                    okType: "button-stable",
                                    cssClass: "alertPopup"
                                });

                            }
                            $state.go('app.forum')
                        })
                }
            });
        }

        $scope.itemOnTouchEnd = function(galleryforums) {
            $scope.gallery = galleryforums;
            $location.path('app/forumGallery/' + idforums);
        }

        $ionicModal.fromTemplateUrl('templates/forumGallery.html', {
            id: '2',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.omodal2 = modal;
        })
        $scope.openModal = function(index) {
            if (index == 1) $scope.omodal1.show();
            else if (index == 2) $scope.omodal2.hide();
        }
        $scope.closeModal = function(index) {
            if (index == 1) $scope.omodal1.hide();
            else if (index == 2) $scope.omodal2.show();
        }

        // Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function(index) {
            
        });

        $scope.$on('modal.shown', function() {
            console.log('Modal is shown!');
        });
        $scope.$on('modal.hide', function() {
            // Execute action
            console.log('Modal hide');
        });
        $scope.$on('modal.removed', function() {
            // Execute action
            console.log('Modal dihapus');
        });

        $scope.next = function() {
            $ionicSlideBoxDelegate.next();
        };

        $scope.previous = function() {
            $ionicSlideBoxDelegate.previous();
        };
    }

    function forumupdate($scope, $stateParams, $ionicLoading, ForumService, $ionicPopup, $filter) {
        var idaccount = '' ;
        ForumService.forumdetail(idaccount,function(response) {
            if (response != false) {
                angular.forEach(response.detail, function(value, key) {
                    $scope.detail = value[0]
                })
                $scope.detail = response.detail
                $scope.comment = response.comment
            } else {
                $scope.data = { name: $filter('translate')('failed_get_data') }
            }
        })
    }

    function forumGallery($scope, $ionicLoading, $ionicSlideBoxDelegate, $stateParams, ForumService, $filter) {
        $ionicLoading.show({ template: $filter('translate')('loading') + "..." });
        var idaccount = '' ;
        ForumService.forumdetail(idaccount,function(response) {
            if (response != false) {
                $scope.image = response.galleryforums;

                $ionicSlideBoxDelegate.update();

                var gall = $stateParams.index;
                $scope.gall = gall;
            } else {
                $scope.image = [{ name: $filter('translate')('there_no_gallery') }];
            }
            $ionicLoading.hide();
        });

        $scope.next = function() {
            $ionicSlideBoxDelegate.next();
        };

        $scope.previous = function() {
            $ionicSlideBoxDelegate.previous();
        };

        $scope.slideChanged = function() {
            $ionicSlideBoxDelegate.update();
        };

    }

    function forumdetailImage($scope, $ionicLoading, $ionicSlideBoxDelegate, $stateParams, ForumService, $filter) {
        $ionicLoading.show({ template: $filter('translate')('loading') + "..." });
        var idaccount = '' ;
        ForumService.forumdetail(idaccount,function(response) {
            if (response != false) {
                $scope.image = response.galleryforums;

                $ionicSlideBoxDelegate.update();

                var gall = $stateParams.idx;
                console.log(gall);
                $scope.gall = gall;
            } else {
                $scope.image = [{ name: $filter('translate')('there_no_gallery') }];
            }
            $ionicLoading.hide();
        });

        $scope.next = function() {
            $ionicSlideBoxDelegate.next();
        };

        $scope.previous = function() {
            $ionicSlideBoxDelegate.previous();
        };

        $scope.slideChanged = function() {
            $ionicSlideBoxDelegate.update();
        };

    }

    function topic($timeout, $scope, $state, ForumService, $ionicLoading, $location,
        $cordovaCamera, $cordovaFile, $ionicHistory, $cordovaFileTransfer, $cordovaDevice, $ionicPopup, $cordovaActionSheet, $cordovaImagePicker) {
        $scope.newforum = newForum;
        $scope.images = [];
        $scope.checking = false;
        $scope.gambar = [];
        $scope.myGoBack = function() {
            $ionicHistory.goBack();
        };
        function newForum(data) {
            console.log(data);
                        // $ionicLoading.show({ template: 'Loading...' })

            var a = 0;
            angular.forEach($scope.images, function(obj) {
                var b = a++;
                var list = $scope.images;
                var data = list[b];

                var url = 'http://innodev.vnetcloud.com/LiveInWeb/assets/img/upload_file_forum.php';

                // File for Upload
                var targetPath = data;

                // File name only
                var d = new Date(),
                    n = d.getTime(),
                    filename = "forum-" + b + '-' + n + ".jpg";

                $scope.gambar.push('http://innodev.vnetcloud.com/LiveInWeb/assets/img/forums/' + filename);

                var options = {
                    fileKey: 'file',
                    fileName: filename,
                    chunkedMode: false,
                    mimeType: 'image/*',
                    params: { 'fileName': filename }
                };
                $cordovaFileTransfer.upload(url, targetPath, options)
                    .then(function(result) {
                        console.log(result);
                    })
            })
            var linkImg = $scope.gambar.join();
            ForumService.newforum(
                data.title,
                data.description,
                linkImg,
                function(response) {
                    if (response != false) {
                        $state.go('app.forum')
                        console.log('hallo bisa')
                    } else {
                        $state.go('app.forum')
                        console.log('gabisa')
                    }
                    // $ionicLoading.hide()
                })
        }
        $scope.loadImage = function() {
            // Image picker will load images according to these settings
            var options = {
                maximumImagesCount: 3, // Max number of selected images, I'm using only one for this example
                width: 800,
                height: 800,
                quality: 100 // Higher is better
            };

            $cordovaImagePicker.getPictures(options).then(function(results) {
                // Loop through acquired images
                for (var i = 0; i < results.length; i++) {
                    $scope.images.push(results[i]);
                }
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
    }

    function forumComment($scope, $state, $stateParams,$window, $ionicHistory, $ionicPopup, $location, ForumService, $ionicLoading, $filter) {
        $scope.myGoBack = function() {
            $ionicHistory.goBack();
        };
        var idaccount = '' ;
        ForumService.forumdetail(idaccount,function(response) {
            if (response != false) {
                angular.forEach(response.detail, function(value, key) {
                    $scope.detail = value[0]
                })
                $scope.detail = response.detail
                $scope.comment = response.comment
                //layer bottom
                $scope.detailB = response.detail[0]
                $scope.titleB = $scope.detail.title;
                $scope.commentB = response.comment
                $scope.galleryforumsB = response.galleryforums
            } else {
                $scope.data = { name: $filter('translate')('failed_get_data') }
            }
        })

        $scope.sending = function(comment) {
            $scope.cmt = []
            $scope.cmt.push({
                comment: comment.desc
            })
            comment.desc = '';
            var forumComment = $scope.cmt[0].comment

            if (forumComment != '' || forumComment != ' ' || forumComment != null) {
                $ionicLoading.show({ template: 'Loading...' })
                ForumService.commentforum(forumComment,
                    function(response) {
                        if (response != false) {
                            console.log('success');
                            var alertPopup = $ionicPopup.alert({
                                title: $filter('translate')('forum_comment'),
                                template: $filter('translate')('comment_success'),
                                okType: "button-stable",
                                cssClass: "alertPopup"
                            });
                            $ionicHistory.goBack();
                        } else {
                            console.log('error');
                            var alertPopup = $ionicPopup.alert({
                                title: $filter('translate')('forum_comment'),
                                template: $filter('translate')('comment_failed'),
                                okType: "button-stable",
                                cssClass: "alertPopup"
                            });
                            $ionicHistory.goBack();
                        }
                        $ionicLoading.hide()
                    })
            } else {
              var alertPopup = $ionicPopup.alert({
                title: $filter('translate')('forum_comment'),
                template: $filter('translate')('comment_failed'),
                okType: "button-stable",
                cssClass: "alertPopup"
              });
            }
        }
    }
