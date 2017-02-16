angular
    .module('livein')
    .service('billingServices', billingServices);

    function billingServices($http, $filter) {
        var service = {};

        service.loginBillingServices = loginBillingServices;
        service.getbilling = getbilling;

        return service;

        function loginBillingServices(email, callback) {
  
            var req = {
                method: 'POST',
                url: $filter('translate')('apilinkpayment') + 'validatelogin',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    "orgID": "1",
                    "Email": email
                }
            }

            $http(req)
                .success(function(response) {
                    callback(response);

                })
                .error(function(response) {
                    callback(response);
                });


        }


        function getbilling(email, siteId, callback) {
            var req = {
                method: 'POST',
                url: $filter('translate')('apilinkpayment') + 'getbilling',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    "orgID": "1",
                    "siteID": siteId,
                    "Email": email
                }
            }

            $http(req)
                .success(function(response) {
                    callback(response);

                })
                .error(function(response) {
                    callback(false);
                });

        }
    }