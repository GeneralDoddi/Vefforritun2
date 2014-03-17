app.controller('answerEvalController', [
	"$scope", "EvalService",  "$routeParams","HttpService", "$http",
		function($scope, EvalService, $routeParams, HttpService, $http) {
		console.log($routeParams.evalId);
		var evaluation = $routeParams.evaluationId;
		console.log(evaluation);


	}]);