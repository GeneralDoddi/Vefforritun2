app.controller('UserController', function($scope,$modal,$log, EvalService, HttpService, $routeParams){
		
		$scope.items = [];

		EvalService.getAllEvaluations().then(function(data) {
			console.log("Success, data: ", data);
			$scope.evaluations = data;
		}, function(errorMessage) {
			console.log("Error: " + errorMessage);
		}, function(updateMessage) {
			console.log("Update: " + updateMessage);
		});

		$scope.userinfo = function(){
		 	$scope.items = HttpService.getUserobj();
		 	console.log($scope.items);
		}

});