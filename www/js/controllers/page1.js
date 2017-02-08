angular
    .module('livein')
    .controller('con1', con1)
    .controller('con2', con2);

    function con1($scope, $ionicLoading, serv1) {
        $ionicLoading.show({ template: 'Be patient...' });
        
        serv1.getUsers(function(response) {
            if(response!=false) {
                $scope.users = response;
            } else {
                $scope.users = [{name:'There are no user'}];
            }
            $ionicLoading.hide();
        });
    }

    function con2($scope, $stateParams, $ionicLoading, serv1) {
        $ionicLoading.show({ template: 'Be patient...' });

        serv1.getUser($stateParams.userId, function(response) {
            if(response!=false) {
                $scope.user = response;
            } else {
                $scope.user = {name:'Failed get user data'};
            }
            $ionicLoading.hide();
        });
    }