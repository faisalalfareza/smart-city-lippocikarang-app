angular.module('angularSoap', [])

.factory("$soap",['$q',function($q){
	return {
		post: function(url, action, params){
			var deferred = $q.defer();
			
			//Create SOAPClientParameters
			var soapParams = new SOAPClientParameters();
			for(var param in params){
				soapParams.add(param, params[param]);
			}
			
			//Create Callback
			var soapCallback = function (e, status) {
                if (e == null || e.constructor.toString().indexOf("function Error()") != -1) {
                    deferred.reject("An error has occurred " + status);
					console.log("Callback in if")
					console.log(status) // {"location":null}
					console.log("e : " + e)
                } else {
                    deferred.resolve(e);
					console.log("Callback in else")
					console.log("e : " + e)
                }
            }
			
			console.log('ini url : ' + url);
			console.log('ini action : ' + action);

			SOAPClient.invoke(url, action, soapParams, true, soapCallback);

			return deferred.promise;
		},
		setCredentials: function(username, password){
			SOAPClient.username = username;
			SOAPClient.password = password;
		}
	}
}]);
