angular
    .module('livein')
    .factory('trackingVehicles', trackingVehicles);

    function trackingVehicles($soap) {      

        var base_url = 'http://fleet.cartrack.id/api/index.php';

        var soapRequest ='<x:Envelope xmlns:x="http://schemas.xmlsoap.org/soap/envelope/" xmlns:api="fleettestlive.cartrack.id/api/"><x:Header> <wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd"> <wsse:UsernameToken> <wsse:Username/> <wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText"/> </wsse:UsernameToken> </wsse:Security> </x:Header> <x:Body> <api:endpoint.get_vehicle_last_positions> <api:username>?</api:username> </api:endpoint.get_vehicle_last_positions> </x:Body> </x:Envelope>';          

        var req = {
            'Authorization': 'Basic WExRUTAwMDAxOkFPbGNAMDEtMDc=',
            'Content-Type': 'text/xml; charset=utf-8',
            'SOAPAction': 'fleettestlive.cartrack.id/api/#get_vehicle_last_positions',
            'Access-Control-Allow-Origin': '*'
        }   

	    $soap.setCredentials("XLQQ00001","AOlc@01-07");           

        return {
            busRoute: function(){
                return $soap.post(base_url, 'lastpositions', {headers: req});
            }
        }

    }