angular
    .module('livein')
    .factory('trackingVehiclesFactory', trackingVehiclesFactory);

    function trackingVehiclesFactory($soap) {                          

        return {
            busRoute: function(callback) {

                var base_url = 'http://fleettestlive.cartrack.id/api/index.php';
                $soap.setCredentials("XLQQ00001","AOlc@01-07");  

                return $soap.post(
                    base_url, 
                    "endpoint.get_vehicle_last_positions", { 

                        // endpoint.get_vehicle_last_positions
                        // #get_vehicle_last_positions

                        headers: {
                            'Content-Type' : 'text/xml; charset=utf-8',
                            'SOAPAction' : 'fleettestlive.cartrack.id/api/#get_vehicle_last_positions'
                        }

                    }
                ).then(
                    function(response) {
                        alert("Successfully!");
                        // console.log("Successfully!");
                        // callback(response);
                    },
                    function(reason) {
                        alert("Failure!");
                        // console.log("Failure!");
                        // callback(reason);
                    }
                );
            }
        }


    }