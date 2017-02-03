/**
 * Created by Lenovo on 07/12/2016.
 */
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
      console.log(dfd)
      console.log(predictions)
    }
  });

  return dfd.promise;
};
