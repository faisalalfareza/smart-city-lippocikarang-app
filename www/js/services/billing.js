angular
  .module('livein')
  .service('billingServices', billingServices);

  function billingServices($http) {
    var service = {};

    service.loginBillingServices = loginBillingServices;
    service.getbilling = getbilling;
    service.ovopaymet_service = ovopayment;

    return service;
    
    function loginBillingServices(email, callback) {
      console.log(email);
      var req = {
        method: 'POST',
        url: 'http://innodev.vnetcloud.com/liveinpayment/validatelogin',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          "orgID": "1",
          "Email": email
        }
      }

      $http(req)
        .success(function (response) {
          callback(response);

        })
        .error(function (response) {
          callback(response);
        });


    }


    function getbilling(email, siteId, callback) {
      var req = {
        method: 'POST',
        url: 'http://innodev.vnetcloud.com/liveinpayment/getbilling',
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
        .success(function (response) {
          console.log(response)
          console.log(response.status)
          callback(response);

        })
        .error(function (response) {
          console.log('false')
          callback(false);
        });

    }

    function ovopayment(name,email,siteId,amount,ovoid,callback) {

      var req = {
        method: 'POST',
        url: 'http://innodev.vnetcloud.com/liveinpayment/getbilling',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          "name": name,
          "email": email,
          "siteid": siteId,
          "orgId": amount,
          "paymenttype": 3,
          "amount": amount,
          "ovoId": ovoid,
        }
      }

      $http(req)
        .success(function (response) {
          console.log(response)
          console.log(response.status)
          callback(response);

        })
        .error(function (response) {

          console.log('false')
          callback(false);
        });


    }
  }
