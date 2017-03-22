angular
    .module('livein')
    .controller('whatsNew', whatsNew);

    function whatsNew($scope, $localStorage, $ionicLoading, $ionicModal, dataWhatsNew, $filter, $ionicSlideBoxDelegate) {
        $ionicLoading.show({ template: $filter('translate')('loading') + "..." });

        var lang = localStorage.getItem('NG_TRANSLATE_LANG_KEY');
        var pagesize = 5000;

        dataWhatsNew.getDataWhatsNew(lang,pagesize, function(response) {
            if (response != false) {
                $scope.data = response;
                $scope.whatsnew = [];
                var a = 0;
                angular.forEach($scope.data, function(obj) {
                    var b = a++;
                    var list = $scope.data;
                    var data = list[b];
                    
                    var status = data.status;
                    var idnews = data.idnews;
                    var description = data.description;
                    var gallery = data.gallery;
                    
                    dateString = data.createdate;
                    var d = new Date(dateString.replace(' ', 'T'));

                    var title = data.title;
                    var createdate = new Date(d); 
                    var avatar = data.avatar;

                    $scope.whatsnew.push({
                        'status': status,
                        'idnews': idnews,
                        'description': description,
                        'gallery': gallery,

                        'title': title,
                        'createdate': createdate,
                        'avatar': avatar
                    });
                });            
            } else {
                $scope.data = [{ name: $filter('translate')('no_news') }];
            }
            $ionicLoading.hide();
        });

        $ionicModal.fromTemplateUrl('partials/sides/whatsNewModal.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.openModal = function(list) {
            $scope.list = list; 

            if(list.gallery == '') {
                $scope.showGallery = false;
            } else {
                $scope.showGallery = true;
                $scope.gallery = list.gallery;
            }
            $scope.modal.show();  
        };

        $scope.closeModalSlider = function() {
            $scope.modal.hide();
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
        $scope.$on('modal.shown', function() {
            console.log('Modal is shown!');
        });

    }