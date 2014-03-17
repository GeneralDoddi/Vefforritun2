app.controller('answerEvalController', [
	"$scope", "EvalService",  "$routeParams","HttpService", "$http",
	function($scope, EvalService, $routeParams, HttpService, $http, evalID) {
		var evaluation = EvalService.getEvaluationById(evalID);

	}]);