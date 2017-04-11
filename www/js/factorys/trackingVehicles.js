angular
    .module('livein')
    .factory('trackingVehicles', trackingVehicles);

    function trackingVehicles($soap) {

        var base_url = "http://fleet.cartrack.id/api/index.php";
	    $soap.setCredentials("XLQQ00001","AOlc@01-07");

        return {
            busRoute: function(){
                return $soap.post(
                    base_url,
                    "busRoute" , 
                    {
                        headers: {
                            'Content-Type': 'text/xml; charset=utf-8',
                            'Access-Control-Allow-Origin': '*',
                            'SOAPAction': 'fleettestlive.cartrack.id/api/#get_vehicle_last_positions',
                            'Authorization': 'Basic WExRUTAwMDAxOkFPbGNAMDEtMDc='
                        }
                    }
                );
            }
        }

    }