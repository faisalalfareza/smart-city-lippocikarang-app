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
			// var soapCallback = function(e){
			// 	if(e.constructor.toString().indexOf("function Error()") != -1){
			// 		deferred.reject("An error has occurred.");
			// 		alert('there is an error');
			// 	} else {
			// 		deferred.resolve(e);
			// 	}
			// }

			function GetSoapResponse_callBack(r, soapResponse) {
				deferred.resolve(soapResponse);
			}
			
			console.log('ini url : ' + url);
			console.log('ini action : ' + action);
			console.log(soapParams);

			SOAPClient.invoke(url, action, soapParams, true, GetSoapResponse_callBack);

			return deferred.promise;
		},
		setCredentials: function(username, password){
			SOAPClient.username = username;
			SOAPClient.password = password;
		}
	}
}]);
