
app.controller('AdminController', function($q, $location, $scope,$modal,$log, EvalService, HttpService, $http, $routeParams){

		

		
		$scope.userinfo = HttpService.getUserobj();
		console.log($scope.userinfo);


		EvalService.getAllEvaluations().then(function(data) {
			console.log("Success evaluations, data: ", data);
			$scope.evaluations = data;
		
		});

		EvalService.getAllEvaluationTemplates().then(function(data){
			console.log("Success, data: ", data);
			$scope.evaluationtemplates = data;
		});
		
		//Get courses that administrator is signed up for

		EvalService.myCourses().then(function(data) {
			console.log("Success, data: ", data);
			$scope.courses = data;
		});

	$scope.openEval = function () {
		console.log("hello from openEval");
		$location.path("/evaluation/");

	};
	$scope.TESTCLICK = function(){

			EvalService.getEvaluationTemplateByID(1002).then(function(data){
			console.log("Success, data: ", data);
			$scope.evaluationtemplatesID = data;
		});
			console.log($scope.evaluationtemplatesID);
		}
	$scope.TESTCLICK2 = function(){
		EvalService.postEvaluationTemplate().then(function(data){
			console.log("Success, data: ", data);
			$scope.evaluationtemplatesID = data;
		});

	}

	$scope.TESTCLICK3 = function(){
		EvalService.addEvaluation().then(function(data){
			console.log("Success, data: ", data);
			$scope.evaluationtemplatesID = data;
		});

	}
});
