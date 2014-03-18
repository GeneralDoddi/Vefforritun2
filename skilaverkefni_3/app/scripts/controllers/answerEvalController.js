app.controller('answerEvalController', [
	"$scope", "EvalService",  "$routeParams","HttpService", "$http",
		function($scope, EvalService, $routeParams, HttpService, $http) {
		
		var evaluationID = $routeParams.evaluationID;
		$scope.evaluationTemp = [];

		EvalService.getEvaluationById(evaluationID).then(function(data) {
			console.log("Success, data: ", data);
			$scope.evaluationTemp = data;
			console.log($scope.evaluationTemp);
		}, function(errorMessage) {
			console.log("Error: " + errorMessage);
		}, function(updateMessage) {
			console.log("Update: " + updateMessage);
		});


		$scope.questionType = function(qType){
			if(qType === "text"){
				console.log(qType);
				return 0;
			}
			else if(qType === "single"){
				return 1;
			}
			else if(qType === "multiple"){
				return 2;
			}
		}
	}]);
