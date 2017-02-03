angular
    .module('livein')
    .service('searchService', searchService);

    function searchService($http,$localStorage) {
        var service = {};

        service.searching = searching;
        service.searchingTenants = searchingTenants;
        service.searchingProperty = searchingProperty;
        service.searchingDiscount = searchingDiscount;
        service.searchingGallery = searchingGallery;
        service.searchingNews = searchingNews;

        return service;

        function searching(name, callback) {
            var req = {
                method: 'GET',
                url: 'http://innodev.vnetcloud.com/LiveIn/api/City/?action=listglobal&idcity=1&pagenumber=1&pagesize=3&keyword=%25'+ name +'%25',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
            $http(req)
                .success(function (response) {
                    callback(response);
                })
                .error(function () {
                    callback(false);
                });
        }

        function searchingTenants(name, callback) {
            var req = {
                method: 'GET',
                url: ' http://innodev.vnetcloud.com/LiveIn/index.php/api/tenant/?action=listalltenant&pagenumber=1&pagesize=1000&keyword=%25'+ name +'%25',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
            $http(req)
                .success(function (response) {
                    callback(response);
                })
                .error(function () {
                    callback(false);
                });
        }

        function searchingProperty(name, callback) {
            var req = {
                method: 'GET',
                url: 'http://innodev.vnetcloud.com/LiveIn/index.php/api/property/?action=listpropertybyname&idcategory=39&pagenumber=1&pagesize=1000&status=&keyword=%25' + name + '%25&idaccount=' + $localStorage.currentUser.data[0].idaccount,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
            $http(req)
                .success(function (response) {
                    callback(response);
                })
                .error(function () {
                    callback(false);
                });
        }

        function searchingDiscount(name, callback) {
            var req = {
                method: 'GET',
                url: ' http://innodev.vnetcloud.com/LiveIn/index.php/api/discountcoupon/?action=listdiscountcouponfilterbyname&pagenumber=1 &pagesize=1000&keyword=%25' + name + '%25',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
            $http(req)
                .success(function (response) {
                    callback(response);
                })
                .error(function () {
                    callback(false);
                });
        }

        function searchingGallery(name, callback) {
            var req = {
                method: 'GET',
                url: 'http://innodev.vnetcloud.com/LiveIn/index.php/api/city/?action=listgalleryfilterbyname&idcity=1&pagenumber=1&pagesize=3&keyword=%25' + name + '%25',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
            $http(req)
                .success(function (response) {
                    callback(response);
                })
                .error(function () {
                    callback(false);
                });
        }

        function searchingNews(name, callback) {
            var req = {
                method: 'GET',
                url: 'http://innodev.vnetcloud.com/LiveIn/index.php/api/news/?action=listnewsfilterbyname&pagenumber=1&pagesize=1000&keyword=%25' + name + '%25',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
            $http(req)
                .success(function (response) {
                    callback(response);
                })
                .error(function () {
                    callback(false);
                });
        }
    }