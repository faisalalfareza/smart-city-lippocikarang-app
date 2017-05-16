angular
    .module('livein')
    .factory('trackingVehiclesFactory', trackingVehiclesFactory);

    function trackingVehiclesFactory($soap) {   

        var factory = {};
        factory.busRoute = busRoute;
        return factory;                           

        function busRoute(callback) { 

            var base_url = 'http://fleettestlive.cartrack.id/api/index.php';
            $soap.setCredentials("XLQQ00001","AOlc@01-07");  

            return $soap.post(
                base_url, 
                "#get_vehicle_last_positions", { 

                    // endpoint.get_vehicle_last_positions
                    // #get_vehicle_last_positions

                    headers: {
                        'Content-Type' : 'text/xml; charset=utf-8',
                        'SOAPAction' : '#get_vehicle_last_positions'
                    }

                }
            ).then(
                function(response) {
                    console.log("Successfully!");
                    callback(response);
                },
                function(reason) {
                    console.log("Failure!");
                    callback(reason);
                }
            );
        }


    }