angular
    .module('livein')
    .factory('trackingVehiclesFactory', trackingVehiclesFactory);

    function trackingVehiclesFactory($soap) {   

	    $soap.setCredentials("XLQQ00001","AOlc@01-07");          

        return {
            busRoute: function(){
                return $soap.post(
                    'http://fleettestlive.cartrack.id/api/index.php', 
                    'endpoint.get_vehicle_last_positions', 
                    {
                        headers: { 
                            'SOAPAction': 'fleettestlive.cartrack.id/api/#get_vehicle_last_positions'
                        }
                    }
                );
            }
        }

    }