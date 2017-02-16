angular
  .module('livein')
  .service('getPlacePredictions',getPlacePredictions );


 function getPlacePredictions($q){
  var dfd = $q.defer(),
    service = new google.maps.places.AutocompleteService();

  service.getPlacePredictions({ input: query }, function(predictions, status){
    if (status != google.maps.places.PlacesServiceStatus.OK) {
      dfd.resolve([]);
      console.log(dfd)

    }
    else
    {
      dfd.resolve(predictions);
    }
  });

  return dfd.promise;
};
