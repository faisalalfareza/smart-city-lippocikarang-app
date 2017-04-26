angular
    .module('livein')
    .service('trackingVehiclesService', trackingVehiclesService);

    function trackingVehiclesService($http) {   

        var service = {};
        service.busRoute = busRoute;
        return service;

        function busRoute(callback) {

            $http.post("http://fleettestlive.cartrack.id/api/index.php?wsdl", {
                headers: { 
                    'Content-Type' : 'text/xml; charset=utf-8',
                    'Cache-Control' : 'no-cache',
                    'Access-Control-Allow-Credentials' : true,
                    'Access-Control-Allow-Methods' : 'GET, POST',
                    'Access-Control-Allow-Headers' : 'Origin, Content-Type, Accept',
                    'Authorization' : 'Basic WExRUTAwMDAxOkFPbGNAMDEtMDc=',
                    'SOAPAction': 'fleettestlive.cartrack.id/api/#get_vehicle_last_positions'
                },
                withCredentials: 
                    true,
                body: 
                    '<x:Envelope xmlns:x="http://schemas.xmlsoap.org/soap/envelope/" xmlns:api="fleettestlive.cartrack.id/api/"><x:Header> <wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd"> <wsse:UsernameToken> <wsse:Username/> <wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText"/> </wsse:UsernameToken> </wsse:Security> </x:Header> <x:Body> <api:endpoint.get_vehicle_last_positions> <api:username>?</api:username> </api:endpoint.get_vehicle_last_positions> </x:Body> </x:Envelope>'		
		    })
            .success(function(response) {
                console.log(jsonData);
                callback(jsonData);
            })
            .error(function(error) {
                console.log(error);
                callback(error);
            });

        }

    }