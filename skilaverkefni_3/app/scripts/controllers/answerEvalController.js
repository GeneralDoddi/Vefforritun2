app.controller('answerEvalController', 
		function($scope, EvalService, $routeParams, HttpService, $http) {
		
		var evaluationID = $routeParams.evaluationID;
		$scope.evaluation = [];
		$scope.evaluationTemplate = [];

		EvalService.getEvaluationById(evaluationID).then(function(data) {
			console.log("Success from answerEvalController EvalService.getEvaluationById, data: ", data);
			$scope.evaluationTemplate = data;
			console.log($scope.evaluationTemp);
		});

		EvalService.getEvaluationTemplateByID(evaluationID).then(function(data) {
			console.log("Success from answerEvalController Evalservice.getEvaluationTemplateByID, data: ", data);
			$scope.evaluation = data;
			console.log($scope.evaluations);
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
	});
