app.controller('AdminController', function($scope,$modal,$log, EvalService, HttpService, $http, $routeParams){
		

		
		$scope.userinfo = HttpService.getUserobj();
		console.log($scope.userinfo);

		EvalService.getAllEvaluations().then(function(data) {
			console.log("Success, data: ", data);
			$scope.evaluations = data;
		}, function(errorMessage) {
			console.log("Error: " + errorMessage);
		}, function(updateMessage) {
			console.log("Update: " + updateMessage);
		});

		EvalService.getAllEvaluationTemplates().then(function(data){
			console.log("Success, data: ", data);
			$scope.evaluationtemplates = data;
		}, function(errorMessage) {
			console.log("Error: " + errorMessage);
		}, function(updateMessage) {
			console.log("Update: " + updateMessage);
		});


	$scope.openEval = function () {
	  	console.log("hello from openEval");
	    var modalInstance = $modal.open({

	      templateUrl: 'views/evaluation.html',
	      controller: "EvaluationController",
	      backdrop: "static",
	      resolve: {
	        items: function () {
	          return $scope.items;
	        }
	    }
    });
	}

	$scope.TESTCLICK = function(){
			console.log("success");
			EvalService.getEvaluationTemplateByID(1002).then(function(data){
			console.log("Success, data: ", data);
			$scope.evaluationtemplatesID = data;
		}, function(errorMessage) {
			console.log("Error: " + errorMessage);
		}, function(updateMessage) {
			console.log("Update: " + updateMessage);
		});
			console.log($scope.evaluationtemplatesID);
		}
	$scope.TESTCLICK2 = function(){
		EvalService.postEvaluationTemplate().then(function(data){
			console.log("Success, data: ", data);
			$scope.evaluationtemplatesID = data;
		}, function(errorMessage) {
			console.log("Error: " + errorMessage);
		}, function(updateMessage) {
			console.log("Update: " + updateMessage);
		});

	}
});
