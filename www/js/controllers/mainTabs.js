angular
    .module('livein')
    .controller('mainTabs', mainTabs);

    function mainTabs($scope, $rootScope, $timeout, $window, $ionicPopup, $localStorage, $ionicLoading, $ionicModal, $ionicSlideBoxDelegate, dataWhatsNew, talktoUs, $filter) {

        // function startIntroduction() {

        //     $scope.CompletedEvent = function () {
        //         console.log("Completed Event called");
        //     };

        //     $scope.ExitEvent = function () {
        //         console.log("Exit Event called");
        //     };

        //     $scope.ChangeEvent = function (targetElement) {
        //         console.log("Change Event called");
        //         console.log(targetElement);
        //     };

        //     $scope.BeforeChangeEvent = function (targetElement) {
        //         console.log("Before Change Event called");
        //         console.log(targetElement);
        //     };

        //     $scope.AfterChangeEvent = function (targetElement) {
        //         console.log("After Change Event called");
        //         console.log(targetElement);
        //     };

        //     $scope.IntroOptions = {
        //         steps:[
        //         {
        //             element: document.querySelector('#step1'),
        //             intro: "This is the first tooltip."
        //         },
        //         {
        //             element: document.querySelectorAll('#step2')[0],
        //             intro: "<strong>You</strong> can also <em>include</em> HTML",
        //             position: 'right'
        //         },
        //         {
        //             element: '#step3',
        //             intro: 'More features, more fun.',
        //             position: 'left'
        //         },
        //         {
        //             element: '#step4',
        //             intro: "Another step.",
        //             position: 'bottom'
        //         },
        //         {
        //             element: '#step5',
        //             intro: 'Get it, use it.'
        //         }
        //         ],
        //         showStepNumbers: false,
        //         showBullets: false,
        //         exitOnOverlayClick: true,
        //         exitOnEsc:true,
        //         nextLabel: '<strong>NEXT!</strong>',
        //         prevLabel: '<span style="color:green">Previous</span>',
        //         skipLabel: 'Exit',
        //         doneLabel: 'Thanks'
        //     };

        // }

        $scope.afliates_ovo = isOVO;

        function isOVO() {

            // this function invokes the plugin:    
            appAvailability.check(
                'ovo://', 
                function onSucces(result) { 
                    gotoApps(); 
                }, 
                function onError(error) { 
                    gotoAppStore(); 
                }
            );

            function gotoApps() {
                window.open('ovo://', '_system', 'location=no');
                console.log('Ovo Installed');               
            }

            function gotoAppStore() {
                window.open('https://itunes.apple.com/id/app/ovo/id1142114207?mt=8', '_system', 'location=no');
                console.log('Ovo Not Installed');
            }            

        }        
        
        $scope.fullname = $localStorage.currentUser.data[0].fullname;
        var lang = localStorage.getItem('NG_TRANSLATE_LANG_KEY');
        var pagesize = 3;

        dataWhatsNew.getDataWhatsNew(lang, pagesize, function(response) {
            $timeout(function() {
                if (response != false) {
                    $scope.data = response;
                    $scope.news = [];
                    var a = 0;
                    angular.forEach($scope.data, function(obj) {
                        var b = a++;
                        var list = $scope.data;
                        var data = list[b];
                        
                        var status = data.status;
                        var idnews = data.idnews;
                        var description = data.description;
                        var gallery = data.gallery;
                        
                        if(data.createdate!=null) {
                            var d = new Date(data.createdate.replace(' ', 'T'));
                            var createdate = new Date(d); 
                        } else {
                            var createdate = ""; 
                        }

                        var title = data.title;
                        var avatar = data.avatar;

                        $scope.news.push({
                            'status': status,
                            'idnews': idnews,
                            'description': description,
                            'gallery': gallery,
                            'title': title,
                            'createdate': createdate,
                            'avatar': avatar
                        });
                    }); 

                    $ionicSlideBoxDelegate.update();
                } else {
                    $scope.news = [{ name: $filter('translate')('no_news') }];
                }
            }, 500);
        });
        
        talktoUs.getTalktoUs(function(response) {
            if (response != false) {
                $scope.datatalk = response;
            } else {
                $scope.datatalk = [{ name: $filter('translate')('no_data') }];
            }
            $ionicLoading.hide();
        });

        //modal talkToUs
        $ionicModal.fromTemplateUrl('partials/sides/talktoUs.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.openTalkto = function(index) {
            $scope.modal.show();
        };

        $scope.closeModal = function() {
            $scope.modal.hide();
            $scope.modalSlider.hide();
        };

        $ionicModal.fromTemplateUrl('partials/sides/whatsNewModal.html', {
            scope: $scope
        }).then(function(modalSlider) {
            $scope.modalSlider = modalSlider;
        });

        $scope.openModal = function(list) { 
            $scope.list = list; 

            if(list.gallery == '') {
                $scope.showGallery = false;
            } else {
                $scope.showGallery = true;
                $scope.gallery = list.gallery;
            }
            $scope.modalSlider.show();           
        };

        $scope.closeModalSlider = function() {
            $scope.modalSlider.hide();
        };

        // Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hide', function() {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
            // Execute action
        });

        // Called each time the slide changes
        $scope.slideChanged = function(index) {
            $scope.slideIndex = index;
        };

        $scope.next = function() {
            $ionicSlideBoxDelegate.next();
        };

        $scope.previous = function() {
            $ionicSlideBoxDelegate.previous();
        };
    }
