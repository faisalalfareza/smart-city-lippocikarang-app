angular
    .module('livein')
    .controller('category', category)
    .controller('categoryRecomended', categoryRecomended)
    .filter('rounded', rounded);

    function rounded() {
        return function(val) {
            return val.toFixed(0);
        }
    }

    function category($scope, $cordovaGeolocation,$timeout, $stateParams, TenantService, $ionicLoading, $filter) {
        $ionicLoading.show({ template: $filter('translate')('loading') + "...", duration: 1000 });

        listTenant();
        listAllChild();
        filterByCategory();

        function listAllChild() {
            TenantService.listAllChild($stateParams.idcategory, function(response) {
                $timeout(function(){
                if (response != false) {
                     var id =  $stateParams.idcategory;
                     if(id==17 || id==18 || id==20 || id==50 || id==65 || id==69 || id==82 || id==82){
                         $scope.subcategorys = response[0].parentname;
                         console.log('subcat 26 : ' + $scope.subcategorys);
                            $scope.categoryData = [];
                            var categoryKey = $scope.subcategorys.toLowerCase('');
                            categoryKey = $scope.subcategorys.replace(/ +|&/g, '_');

                            $scope.categoryData.push({
                                'categoryValue': $scope.subcategorys,
                                'categoryName': $filter('translate')(categoryKey)
                            });

                            $scope.catName = $scope.categoryData[0].categoryName;
                            console.log('allo ini catDat : ' + JSON.stringify($scope.categoryData));  
                            console.log($scope.catName);
                     }
                     else {
                          $scope.subcategorys = response[0].categoryname;
                          console.log('subcat 30 : ' + $scope.subcategorys);    
                            $scope.categoryData = [];
                            var categoryKey = $scope.subcategorys.toLowerCase('');
                            categoryKey = $scope.subcategorys.replace(/ +|&/g, '_');

                            $scope.categoryData.push({
                                'categoryValue': $scope.subcategorys,
                                'categoryName': $filter('translate')(categoryKey)
                            });
                            
                            $scope.catName = $scope.categoryData[0].categoryName;
                            console.log('allo ini catDat : ' + JSON.stringify($scope.categoryData));  
                            console.log($scope.catName);
                     }
                }
                }, 1000);            
            });
        }

        function filterByCategory() {
            TenantService.filterByCategory($stateParams.idcategory, function(response) {
                if (response != false) {
                    $scope.categorys = response;
                    //
                    $scope.categoryData = [];
                    var a = 0;
                    angular.forEach($scope.categorys, function() {
                        var b = a++;
                        var list = $scope.categorys;
                        var data = list[b];

                        var categoryname = data.categoryname;
                        var categoryKey = categoryname.toLowerCase('');
                        categoryKey = categoryKey.replace(/ +|&/g, '_');

                        $scope.categoryData.push({
                            'categoryValue': categoryname,
                            'categoryName': $filter('translate')(categoryKey)
                        });
                        //$scope.list = $filter('translate')(categoryname);                        
                    });
                    console.log($scope.categoryData);
                } else {
                    $scope.categorys = [{ name: $filter('translate')('no_user') }];
                }
            });
        }

        function listTenant() {
            TenantService.listTenant($stateParams.idcategory, function(response) {
                if (response != false) {

                    var id = $stateParams.idcategory;

                    //inisialisation of filter
                    if(id == 17 || id == 18 || id == 20 || id == 49 || id == 50 || id == 65 || id == 69 || id == 82) { 
                        $scope.filter = true;
                    } else {
                        $scope.filter = false; 
                    }

                    $scope.data = response;
                    $scope.tenantdata = [];
                    var a = 0;
                    angular.forEach($scope.data, function(obj) {
                        var b = a++;
                        var list = $scope.data;
                        var data = list[b];
                        var idcategory = data.idcategory;
                        var categoryname = data.categoryname;
                        var level = data.level;
                        var idtenant = data.idtenant;
                        var avatar = data.avatar;
                        var tenantsname = data.tenantsname;
                        var address = data.address;
                        var longlat = calculatdistance(data.longlat);
                        var premium = data.premium;
                        var phone = data.phone;
                        var link = data.link;
                        var logo = data.logo;
                        var color = data.color;
                        var rate = parseFloat(data.rate).toFixed(1);
                        var open = data.open;
                        var openhour = data.openhour;
                        var closehour = data.closehour;

                        $scope.tenantdata.push({
                            'idcategory': idcategory,
                            'categoryname': categoryname,
                            'level': level,
                            'idtenant': idtenant,
                            'avatar': avatar,
                            'tenantsname': tenantsname,
                            'address': address,
                            'longlat': longlat,
                            'premium': premium,
                            'phone': phone,
                            'link': link,
                            'logo': logo,
                            'color': color,
                            'rate': rate,
                            'open': open,
                            'openhour': openhour,
                            'closehour': closehour
                        });
                    });

                } else {
                    $scope.data = [{ name: $filter('translate')('no_user') }];
                }
                $ionicLoading.hide();
            });
        }

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

    function categoryRecomended($scope, $cordovaGeolocation, $stateParams, TenantService, $ionicLoading, $filter) {
        $ionicLoading.show({ template: $filter('translate')('loading') + "...", duration: 1000 });
        $scope.categoryname = $filter('translate')('recommended');

        listRecomendedTenant();

        function listRecomendedTenant() {
            TenantService.listRecomendedTenant($stateParams.idcategory, function(response) {
                if (response != false) {
                    $scope.data = response;
                    $scope.tenantdata = [];
                    var a = 0;
                    angular.forEach($scope.data, function(obj) {
                        var b = a++;
                        var list = $scope.data;
                        var data = list[b];
                        var idcategory = data.idcategory;
                        var categoryname = data.categoryname;
                        var level = data.level;
                        var idtenant = data.idtenant;
                        var avatar = data.avatar;
                        var tenantsname = data.tenantsname;
                        var address = data.address;
                        var longlat = calculatdistance(data.longlat);
                        var premium = data.premium;
                        var phone = data.phone;
                        var link = data.link;
                        var logo = data.logo;
                        var color = data.color;
                        var rate = parseFloat(data.rate).toFixed(1);
                        var open = data.open;
                        var openhour = data.openhour;
                        var closehour = data.closehour;
                        var bookmarked = data.bookmarked;

                        $scope.tenantdata.push({
                            'idcategory': idcategory,
                            'categoryname': categoryname,
                            'level': level,
                            'idtenant': idtenant,
                            'avatar': avatar,
                            'tenantsname': tenantsname,
                            'address': address,
                            'longlat': longlat,
                            'premium': premium,
                            'phone': phone,
                            'link': link,
                            'logo': logo,
                            'color': color,
                            'rate': rate,
                            'open': open,
                            'openhour': openhour,
                            'closehour': closehour,
                            'bookmarked': bookmarked
                        });
                    });
                } else {
                    $scope.data = [{ name: $filter('translate')('no_user') }];
                }

                $ionicLoading.hide();

            });
        }

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