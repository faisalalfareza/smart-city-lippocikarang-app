angular
    .module('livein')
    .factory('trackingVehiclesFactory', trackingVehiclesFactory);

    function trackingVehiclesFactory($soap) {   

        var base_url = 'http://fleettestlive.cartrack.id/api/index.php';
	    $soap.setCredentials("XLQQ00001","AOlc@01-07");          

        return {
            busRoute: function(callback){ 

                return $soap.post(
                    base_url, 
                    "#get_vehicle_last_positions", { // endpoint.get_vehicle_last_positions
                        headers: {
                            'Content-Type' : 'text/xml; charset=utf-8',
                            'Cache-Control' : 'no-cache',
                            'Access-Control-Allow-Credentials' : true,
                            'Access-Control-Allow-Origin' : '*',
                            'Access-Control-Allow-Methods' : 'GET, POST',
                            'Access-Control-Allow-Headers' : 'Origin, Content-Type, Accept',
                        }
                    }
                ).then(
                    function(response) {
                        console.log("Successfully!");
                        console.log(response);
                    },
                    function(reason) {
                        console.log("Failure!");
                        console.log(reason);
                    }
            );
            }
        }

    }