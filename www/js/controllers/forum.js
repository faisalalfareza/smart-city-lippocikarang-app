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

    function forum($scope, $stateParams, ForumService, $ionicLoading, $filter) {
        $ionicLoading.show({ template: $filter('translate')('loading') + "...", duration: 1000 })

        ForumService.listforum($stateParams.status, function(response) {
            if (response != false) {
                $scope.data = response
            } else {
                $scope.data = [{ name: $filter('translate')('no_property') }]
            }
            $ionicLoading.hide()
        })
    }

    function forumdetail($scope,  $ionicHistory, $stateParams, $ionicLoading, $localStorage, ForumService, $ionicModal, $ionicPopup, $location, $filter, $state, $ionicSlideBoxDelegate,
        $cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaDevice, $cordovaActionSheet, $cordovaImagePicker) {
        $scope.account = $localStorage.currentUser.data[0].idaccount

        $scope.myGoBack = function() {
            $ionicHistory.goBack();
        };

        ForumService.forumdetail(function(response) {
            if (response != false) {
                angular.forEach(response.detail, function(value, key) {
                    $scope.detail = value[0]
                })
                $scope.detail = response.detail[0]
                console.log($scope.detail);
                $scope.title = $scope.detail.title;
                $scope.comment = response.comment;
                $scope.galleryforums = response.galleryforums;
                //$scope.dibawa[0] = response.galleryforums.idgalleryforums;
                $ionicSlideBoxDelegate.update();

                var gall = $stateParams.index;
                $scope.gall = gall;
                console.log('gall ',$scope.gall);

                var keys = Object.keys($scope.galleryforums);
                $scope.len = keys.length;

                var i = 1;
                $scope.galleryforums.forEach(function(itemfile, indexfile, arrfile) {
                    $scope.galleryforums[indexfile].number = i++;
                });

                console.log('di detailimage', $scope.galleryforums);
            } else {
                $scope.data = { name: $filter('translate')('failed_get_data') }
            }
        })

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
                            cssClass: "alertPopup"
                        })
                        $location.path('app/forumdetail/' + detail.idforums)
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            title: $filter('translate')('msg_update_failed'),
                            okText: $filter('translate')('okay'),
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

        $scope.deleteforum = deleteForum

        function deleteForum(idforums) {
            $ionicLoading.show({ template: $filter('translate')('loading') + "..." })
            ForumService.deleteforum(
                idforums,
                function(response) {
                    if (response != false) {
                        var alertPopup = $ionicPopup.alert({
                            title: $filter('translate')('delete_topic_success'),
                            okText: $filter('translate')('okay'),
                            cssClass: "alertPopup"
                        })
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            title: $filter('translate')('delete_topic_failed'),
                            okText: $filter('translate')('okay'),
                            cssClass: "alertPopup"
                        }); // tetap di halaman register//muncul alert phone or email alredy exist->dari api persis

                    }
                    $location.path('app/forum')
                    $ionicLoading.hide()
                })
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
                                    cssClass: "alertPopup"
                                })
                            } else {
                                var alertPopup = $ionicPopup.alert({
                                    title: $filter('translate')('msg_delete_failed'),
                                    okText: $filter('translate')('okay'),
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
                                    cssClass: "alertPopup"
                                })
                            } else {
                                var alertPopup = $ionicPopup.alert({
                                    title: $filter('translate')('msg_delete_failed'),
                                    okText: $filter('translate')('okay'),
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
            console.log($location.path());
            console.log($scope.gallery);
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
            else $scope.omodal2.show();
        }
        $scope.closeModal = function(index) {
            if (index == 1) $scope.omodal1.hide();
            else $scope.omodal2.hide();
        }
        $scope.next = function() {
            $ionicSlideBoxDelegate.next();
        };

        $scope.previous = function() {
            $ionicSlideBoxDelegate.previous();
        };
    }

    function forumupdate($scope, $stateParams, $ionicLoading, ForumService, $ionicPopup, $filter) {
        ForumService.forumdetail(function(response) {
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
        ForumService.forumdetail(function(response) {
            if (response != false) {
                $scope.image = response.galleryforums;

                $ionicSlideBoxDelegate.update();

                var gall = $stateParams.index;
                $scope.gall = gall;
                console.log($scope.image);
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
        ForumService.forumdetail(function(response) {
            if (response != false) {
                $scope.image = response.galleryforums;

                $ionicSlideBoxDelegate.update();

                var gall = $stateParams.index;
                $scope.gall = gall;
                console.log($scope.image);
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
                        console.log('sukses')
                        $state.go('app.forum')
                    } else {
                        $state.go('app.forum')
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

        ForumService.forumdetail(function(response) {
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
                                cssClass: "alertPopup"
                            });
                            $ionicHistory.goBack();
                        } else {
                            console.log('error');
                            var alertPopup = $ionicPopup.alert({
                                title: $filter('translate')('forum_comment'),
                                template: $filter('translate')('comment_failed'),
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
                cssClass: "alertPopup"
              });
            }
        }
    }
