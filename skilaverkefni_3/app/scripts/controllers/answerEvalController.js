app.controller('answerEvalController', [
	"$scope", "EvalService",  "$routeParams","HttpService", "$http","token",
	function($scope, EvalService, $routeParams, HttpService, $http, evalID,token) {
		var evaluation = EvalService.getEvaluationById(evalID);

	}]);