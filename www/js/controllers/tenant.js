angular
    .module('livein')
    .controller('tenant', tenant)
    .controller('bookmark', bookmark)

    function tenant($scope, $ionicLoading, $location, $state, TenantServiceA, $filter) {
        $scope.rateTenant = rateTenantService;
        $scope.bookmarkTenant = bookmarkTenantService;

        function rateTenantService(user) {
            $ionicLoading.show({ template: $filter('translate')('loading') + "..." });
            console.log(user);
            TenantServiceA.rateTenant(
                user.idtenant,
                user.idaccount,
                user.rating,
                function(response) {
                    if (response != false) {
                        console.log(response);
                        $ionicLoading.show({
                            template: $filter('translate')('post_rating_success'),
                            duration: 3000
                        });
                        $location.path('/rate');
                    } else {
                        $ionicLoading.show({
                            template: $filter('translate')('post_rating_success'),
                            duration: 3000
                        });
                        $location.path('/rate');
                    }
                    $ionicLoading.hide();
                });
        };

        function bookmarkTenantService(user) {
            $ionicLoading.show({ template: $filter('translate')('loading') + "..." });
            console.log(user);
            TenantServiceA.bookmarkTenant(
                user.idtenant,
                user.idaccount,
                function(response) {
                    if (response != false) {
                        console.log(response);
                        $ionicLoading.show({
                            template: $filter('translate')('post_rating_success'),
                            duration: 3000
                        });
                        $location.path('/rating');
                    } else {
                        $ionicLoading.show({
                            template: $filter('translate')('post_rating_success'),
                            duration: 3000
                        });
                        $location.path('/rating');
                    }
                    $ionicLoading.hide();
                });
        };
    }

    function bookmark($scope, $ionicLoading, $location, $state, TenantServiceA, $cordovaGeolocation, $filter) {
        listbookmarkService();

        function listbookmarkService() {
            $ionicLoading.show({ template: $filter('translate')('loading') + "..." });
            $scope.noMoreItemsAvailable = false;

            TenantServiceA.listbookmarkTenant(
                function(response) {
                    if (response != false) {
                        $scope.listbookmarkTenant = response;

                        $scope.listbookmark = [];

                        var a = 0;
                        angular.forEach($scope.listbookmarkTenant, function(obj) {
                            var b = a++;
                            var list = $scope.listbookmarkTenant;
                            var data = list[b];
                            var idbookmark = data.idbookmark;
                            var idaccount = data.idaccount;
                            var idtenant = data.idtenant;
                            var idproperty = data.idproperty;
                            var avatar = data.avatar;
                            var tenantname = data.tenantname;
                            var address = data.address;
                            var longlat = calculatdistance(data.longlat);

                            $scope.listbookmark.push({
                                'idbookmark': idbookmark,
                                'idaccount': idaccount,
                                'idtenant': idtenant,
                                'idproperty': idproperty,
                                'avatar': avatar,
                                'tenantname': tenantname,
                                'address': address,
                                'longlat': longlat
                            });
                        });
                    } else {
                        $scope.listbookmarkTenant = { name: $filter('translate')('failed_get_data') };
                    }
                    $ionicLoading.hide();
                });
        };

        var posOptions = { timeout: 10000, enableHighAccuracy: true };
        $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
            $scope.lat = position.coords.latitude;
            $scope.long = position.coords.longitude;
        });

        calculatdistance = function(longlat) {
            datalonglat1 = longlat.replace('(', '');
            datalonglat2 = datalonglat1.replace(')', '');
            lattenant = (datalonglat2.split(',')[0]);
            longtenant = (datalonglat2.split(',')[1]);

            var R = 6371; // Radius of the earth in km
            var dLat = deg2rad($scope.lat - lattenant); // deg2rad below
            var dLon = deg2rad($scope.long - longtenant);
            var a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(deg2rad($scope.lat)) * Math.cos(deg2rad(lattenant)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c; // Distance in km
            return d;
        }

        function deg2rad(deg) {
            return deg * (Math.PI / 180);
        }
    }