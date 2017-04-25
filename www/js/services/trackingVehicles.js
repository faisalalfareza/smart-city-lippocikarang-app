angular
    .module('livein')
    .service('trackingVehicles', trackingVehicles);

    function trackingVehicles() {   

        var service = {};
        service.busRoute = busRoute;
        return service;

        function busRoute() {
            // var pl = new SOAPClientParameters();
            // pl.add("arg0", false);

            var base_url = 'http://fleettestlive.cartrack.id/api/index.php';
            return SOAPClient.invoke(base_url, "endpoint.get_vehicle_last_positions", true, getDataCallback);
        }

        function getDataCallback(r, soapResponse) {
            alert(r);
        }

    }