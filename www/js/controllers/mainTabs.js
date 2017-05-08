angular
    .module('livein')
    .controller('mainTabs', mainTabs);

    function mainTabs($scope, $rootScope, $timeout, $window, $ionicPopup, $localStorage, $ionicLoading, $ionicModal, $ionicSlideBoxDelegate, $ionicPlatform, dataWhatsNew, talktoUs, $filter, AdvertiseService) {

        $rootScope.StartEvent = false;
        
        if ($localStorage.firstOpen == null) {
            startIntroduction();
            $localStorage.firstOpen = { status : true };
        }

        function startIntroduction() {

            var screen = angular.element(document.querySelector('ion-side-menu'));
            screen.css('visibility', 'hidden');
            
            $rootScope.IntroOptions = {
                    steps:[
                    {
                        element: document.querySelector('.tabs .tab-item.profilecon'),
                        intro: $filter('translate')('intro1'),
                        position: 'top'
                    },
                    {
                        element: document.querySelector('#step1'),
                        intro: $filter('translate')('intro2'),
                        position: 'top'
                    },
                    {
                        //.bar .button.button-custom.navcon
                        element: document.querySelector('.bar'),
                        intro: $filter('translate')('intro3'),
                        position: 'bottom'
                    }
                    ],
                    showStepNumbers: false,
                    showBullets: false,
                    exitOnOverlayClick: false,
                    exitOnEsc: false,
                    showProgress: false,
                    nextLabel: $filter('translate')('next'),
                    prevLabel: $filter('translate')('previous'),
                    skipLabel: $filter('translate')('skip'),
                    doneLabel: $filter('translate')('thanks')
            };

            var introprofile = angular.element(document.querySelector('.tabs .tab-item.profilecon'));
            introprofile.css('opacity', '1.0');
            introprofile.css('background-color', '#0D6DB6');

            var intronav = angular.element(document.querySelector('.bar .button.button-custom'));
            intronav.css('background-color', '#0D6DB6');

            $rootScope.CompletedEvent = function(){
                screen.css('visibility', 'visible');
                // console.log('[directive] completed Event')
            }
            $rootScope.StartEvent = true;
            $rootScope.ExitEvent = function(){
                screen.css('visibility', 'visible');
                // console.log('[directive] exit Event')
            }
            $rootScope.ChangeEvent = function(id){
                // console.log('[directive] change Event')
                // console.log($rootScope.IntroOptions.steps);
            }
            $rootScope.BeforeChangeEvent= function(id){
                // console.log('[directive] beforeChange Event')
                // console.log($rootScope.IntroOptions.steps);
            }
            $rootScope.AfterChangeEvent= function(id){
                // console.log('[directive] after change Event')
                // console.log($rootScope.IntroOptions.steps);
            }
        

        }        

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
        if($localStorage.currentUser){
            $scope.fullname = $localStorage.currentUser.data[0].fullname;
            $scope.salah = true;
        } else {
            $scope.salah = false;
        }

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
