app.controller('AdminController', function($scope,$modal,$log, EvalService, HttpService, $http, $routeParams){
		

		
		$scope.userinfo = HttpService.getUserobj();
		console.log($scope.userinfo);
		$scope.courses = [];


		//Get all evaluations
		EvalService.getAllEvaluations().then(function(data) {
			console.log("Success, data: ", data);
			$scope.evaluations = data;
		}, function(errorMessage) {
			console.log("Error: " + errorMessage);
		}, function(updateMessage) {
			console.log("Update: " + updateMessage);
		});
		// Get Evaluation by ID

		/*EvalService.getEvaluationById(id).then(function(data) {
			console.log("Success, data: ", data);
			$scope.evaluations = data;
		}, function(errorMessage) {
			console.log("Error: " + errorMessage);
		}, function(updateMessage) {
			console.log("Update: " + updateMessage);
		});*/

		//Get all evaluation templates
		EvalService.getAllEvaluationTemplates().then(function(data){
			console.log("Success, data: ", data);
			$scope.evaluationtemplates = data;
		}, function(errorMessage) {
			console.log("Error: " + errorMessage);
		}, function(updateMessage) {
			console.log("Update: " + updateMessage);
		});

		//Get courses that administrator is signed up for

		myCourses().then(function(data) {
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
		//Get evaluation template by ID
	$scope.TESTCLICK = function(){
			console.log("success");
			EvalService.getEvaluationTemplateByID(1).then(function(data){
			console.log("Success, data: ", data);
			$scope.evaluationtemplatesID = data;
		}, function(errorMessage) {
			console.log("Error: " + errorMessage);
		}, function(updateMessage) {
			console.log("Update: " + updateMessage);
		});
			console.log($scope.evaluationtemplatesID);
		}
		//Post an evaluation template
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
	$scope.TESTCLICK3 = function(){
		EvalService.addEvaluation().then(function(data){
			console.log("Success, data: ", data);
			//$scope.evaluationtemplatesID = data;
		}, function(errorMessage) {
			console.log("Error: " + errorMessage);
		}, function(updateMessage) {
			console.log("Update: " + updateMessage);
		});

	}

	function myCourses(){
				var deferred = $q.defer();

				$http.defaults.headers.common.Authorization = "Basic " + HttpService.getToken();
	    		console.log(HttpService.getToken());
	    		$http.get(HttpService.getSocket() + 'my/courses').
				    success(function(data, status, headers, config) {
				  		console.log("courses");
				  		//$scope.courses = data;
				  		//console.log($scope.courses);
				  		deferred.resolve(data);
				    }).
				    error(function(data, status, headers, config) {
				      // called asynchronously if an error occurs
				      // or server returns response with an error status.
				      console.log("NO COURSES!");
				      deferred.reject(status);
				    });	
				    return deferred.promise;
			}
});
