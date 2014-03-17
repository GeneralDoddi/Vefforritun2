app.controller('answerEvalController', [
	"$scope", "EvalService",  "$routeParams","HttpService", "$http",
		function($scope, EvalService, $routeParams, HttpService, $http) {
		
		var evaluationID = $routeParams.evaluationID;
		$scope.evaluationTemp = [];
		
		EvalService.getEvaluationById(evaluationID).then(function(data) {
			console.log("Success, data: ", data);
			$scope.evaluationTemp = data;
		}, function(errorMessage) {
			console.log("Error: " + errorMessage);
		}, function(updateMessage) {
			console.log("Update: " + updateMessage);
		});
	}]);