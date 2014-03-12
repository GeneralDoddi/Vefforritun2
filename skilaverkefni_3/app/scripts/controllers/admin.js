app.controller("AdminCtrl", function($scope,$modal,$log, EvalService, HttpService, $routeParams){
		
		$scope.evaluationtemplates = [];
		$scope.userinfo = HttpService.getUserobj();
		console.log($scope.userinfo);

		/*EvalService.getAllEvaluations().then(function(data) {
			console.log("Success, data: ", data);
			$scope.evaluations = data;
		}, function(errorMessage) {
			console.log("Error: " + errorMessage);
		}, function(updateMessage) {
			console.log("Update: " + updateMessage);
		});*/

		$http.defaults.headers.common.Authorization = "Basic " + HttpService.getToken();
    		console.log(HttpService.getToken());
    		$http.get(HttpService.getSocket() + 'evaluationtemplates').
			    success(function(data, status, headers, config) {
			  		console.log("YAY");
			  		$scope.evaluationtemplates = data;
			  		console.log($scope.evaluationtemplates);
			    }).
			    error(function(data, status, headers, config) {
			      // called asynchronously if an error occurs
			      // or server returns response with an error status.
			      console.log("NO COURSES!");
			    });
});
