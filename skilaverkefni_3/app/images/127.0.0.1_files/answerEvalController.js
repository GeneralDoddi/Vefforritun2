app.controller('answerEvalController', [
	"$scope", "EvalService",  "$routeParams","HttpService", "$http",
		function($scope, EvalService, $routeParams, HttpService, $http) {
		
		var evaluationID = $routeParams.evaluationID;
		$scope.evaluation = [];
		$scope.evaluationTemplate = [];

		EvalService.getEvaluationById(evaluationID).then(function(data) {
			console.log("Success from answerEvalController EvalService.getEvaluationById, data: ", data);
			$scope.evaluationTemplate = data;
			console.log($scope.evaluationTemp);
		}, function(errorMessage) {
			console.log("Error: " + errorMessage);
		}, function(updateMessage) {
			console.log("Update: " + updateMessage);
		});

		EvalService.getEvaluationTemplateByID(evaluationID).then(function(data) {
			console.log("Success from answerEvalController Evalservice.getEvaluationTemplateByID, data: ", data);
			$scope.evaluation = data;
			console.log($scope.evaluations);
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
