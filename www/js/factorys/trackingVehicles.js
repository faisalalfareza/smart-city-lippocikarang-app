angular
    .module('livein')
    .factory('trackingVehicles', trackingVehicles);

    function trackingVehicles($soap, $ionicPopup) {   

        var base_url = 'http://fleettestlive.cartrack.id/api/index.php';

        var soapRequest ='<x:Envelope xmlns:x="http://schemas.xmlsoap.org/soap/envelope/" xmlns:api="fleettestlive.cartrack.id/api/"><x:Header> <wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd"> <wsse:UsernameToken> <wsse:Username/> <wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText"/> </wsse:UsernameToken> </wsse:Security> </x:Header> <x:Body> <api:endpoint.get_vehicle_last_positions> <api:username>?</api:username> </api:endpoint.get_vehicle_last_positions> </x:Body> </x:Envelope>';          

        var thisHeaders = {
            'Authorization': 'Basic WExRUTAwMDAxOkFPbGNAMDEtMDc=',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
            'Content-Type': 'text/xml; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'SOAPAction': 'fleettestlive.cartrack.id/api/#get_vehicle_last_positions'
        }   

	    $soap.setCredentials("XLQQ00001","AOlc@01-07");          

        return {
            busRoute: function(){
                return $soap.post(
                    base_url, 
                    "endpoint.get_vehicle_last_positions", 
                    {
                        headers: thisHeaders
                    }
                );
            }
        }

    }