angular
    .module('livein')
    .service('introductionService', introductionService);

    function introductionService($filter, $rootScope) {

        var service = {};
        service.startIntroduction = startIntroduction;
        return service; 

        function startIntroduction() {

            var screen = angular.element(document.querySelector('ion-side-menu'));
            screen.css('visibility', 'hidden');
            
            $rootScope.IntroOptions = {
                    steps:[
                    {
                        element: document.querySelector('#step1'),
                        intro: $filter('translate')('intro2'),
                        position: 'top'
                    },
                    {
                        element: document.querySelector('#step2'),
                        intro: $filter('translate')('intro1'),
                        position: 'bottom'
                    },
                    {
                        element: document.querySelector('#step3'),
                        intro: $filter('translate')('intro3'),
                        position: 'bottom'
                    }
                    ],
                    showStepNumbers: false,
                    showBullets: false,
                    exitOnOverlayClick: false,
                    exitOnEsc: true,
                    nextLabel: $filter('translate')('next'),
                    prevLabel: '<span style="color:#7a7a7a">' + $filter('translate')('previous') + '</span>',
                    skipLabel: $filter('translate')('skip'),
                    doneLabel: $filter('translate')('thanks')
            };
            

            $rootScope.CompletedEvent = function(){
                showAlertUser();
                screen.css('visibility', 'visible');
                console.log('[directive] completed Event')
            }
            $rootScope.ExitEvent = function(){
                showAlertUser();
                screen.css('visibility', 'visible');
                console.log('[directive] exit Event')
            }
            $rootScope.ChangeEvent = function(element){
                console.log('[directive] change Event')
                console.info(element);
            }
            $rootScope.BeforeChangeEvent= function(element){
                console.log('[directive] beforeChange Event')
                console.info(element);
            }
            $rootScope.AfterChangeEvent= function(element){
                console.log('[directive] after change Event')
                console.info(element);
            }

        }
        
    }