app.controller('AdminController', function($scope,$modal,$log, EvalService, $routeParams){
		

		EvalService.getAllEvaluations().then(function(data) {
			console.log("Success, data: ", data);
			$scope.evaluations = data;
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
	console.log("rass");
});
