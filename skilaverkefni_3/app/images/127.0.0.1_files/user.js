app.controller('UserController', function($scope,$modal,$log,$http,$location, EvalService, HttpService, $routeParams, $q){
		
		$scope.items = HttpService.getUserobj();
		$scope.courses = HttpService.getCourses();
		$scope.evaluations = EvalService.getAllEvaluations();
		$scope.myEval = myEvaluations();
		$scope.teachers = [];

		

		EvalService.getAllEvaluations().then(function(data) {
			console.log("Success getAllEvaluations, data: ", data);
			$scope.evaluations = data;
		});
		
		myEvaluations().then(function(data) {
			console.log("Success myeval, data: ", data);
			$scope.myEval = data;
		});

		myCourses().then(function(data) {
			console.log("Success, data: ", data);
			$scope.courses = data;
		});
			

		EvalService.getCourseTeacher('T-501-FMAL', 'S2014').then(function(data) {
			console.log("Success, data: ", data);
			$scope.teachers = data;
		});

		$scope.posteval = function(){

			EvalService.postCourseEvaluation('T-427-WEPO', 'S2014', 1).then(function(data) {
			console.log("Success, data: ", data);
			$scope.evaluations1 = data;
		});
		}
		$scope.isOpen = function(evaluation){
			if(evaluation.Status === "closed"){
				console.log("the evaluation is closed");
				return 0;
			}
			else if(evaluation.Status === "open"){
				console.log("the evaluation is open");
				return 1;
			}
		}

		$scope.geteval = function (){
			EvalService.getCourseEvaluation('T-427-WEPO', 'S2014', 1).then(function(data) {
			console.log("Success, data: ", data);
			$scope.evaluations = data;
		});
		}
		$scope.answerEval = function(evalId){
			
			$location.path("/answerEval/"+evalId); 			
		}

		function myEvaluations(){
			var deferred = $q.defer();
			$http.defaults.headers.common.Authorization = "Basic " + HttpService.getToken();
			$http.get(HttpService.getSocket() + 'my/evaluations').
			    success(function(data, status, headers, config) {
			  		console.log("my evaluations");
			  		console.log(data);
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