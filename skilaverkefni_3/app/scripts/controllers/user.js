app.controller('UserController', function($scope,$modal,$log,$http, EvalService, HttpService, $routeParams, $q){
		
		$scope.items = HttpService.getUserobj();
		$scope.courses = HttpService.getCourses();
		$scope.evaluations = [];
		$scope.teachers = [];

		

		EvalService.getAllEvaluations().then(function(data) {
			console.log("Success, data: ", data);
			$scope.evaluations = data;
		}, function(errorMessage) {
			console.log("Error: " + errorMessage);
		}, function(updateMessage) {
			console.log("Update: " + updateMessage);
		});
		
		myEvaluations().then(function(data) {
			console.log("Success, data: ", data);
			$scope.evaluations = data;
		}, function(errorMessage) {
			console.log("Error: " + errorMessage);
		}, function(updateMessage) {
			console.log("Update: " + updateMessage);
		});

		myCourses().then(function(data) {
			console.log("Success, data: ", data);
			$scope.evaluations = data;
		}, function(errorMessage) {
			console.log("Error: " + errorMessage);
		}, function(updateMessage) {
			console.log("Update: " + updateMessage);
		});
			

		EvalService.getCourseTeacher('T-427-WEPO', 'S2014').then(function(data) {
			console.log("Success, data: ", data);
			$scope.teachers = data;
		}, function(errorMessage) {
			console.log("Error: " + errorMessage);
		}, function(updateMessage) {
			console.log("Update: " + updateMessage);
		});

		$scope.posteval = function(){

			EvalService.postCourseEvaluation('T-427-WEPO', 'S2014', 1).then(function(data) {
			console.log("Success, data: ", data);
			$scope.evaluations1 = data;
		}, function(errorMessage) {
			console.log("Error: " + errorMessage);
		}, function(updateMessage) {
			console.log("Update: " + updateMessage);
		});
		}

		$scope.geteval = function (){
			EvalService.getCourseEvaluation('T-427-WEPO', 'S2014', 1).then(function(data) {
			console.log("Success, data: ", data);
			//$scope.evaluations = data;
		}, function(errorMessage) {
			console.log("Error: " + errorMessage);
		}, function(updateMessage) {
			console.log("Update: " + updateMessage);
		});
		}

		function myEvaluations(){
			var deferred = $q.defer();
			$http.defaults.headers.common.Authorization = "Basic " + HttpService.getToken();
			$http.get(HttpService.getSocket() + 'my/evaluations').
			    success(function(data, status, headers, config) {
			  		console.log("evaluations");
			  		//$scope.evaluation = data;
			  		//console.log($scope.evaluation);
			  		deferred.resolve(data);
			    }).
			    error(function(data, status, headers, config) {
			      // called asynchronously if an error occurs
			      // or server returns response with an error status.
			      console.log("NO EVALUATIONS!");
			      deferred.reject(status);
			    });
			    return deferred.promise;
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