app.controller('EvaluationController', [
	"$scope", "$compile", "EvalService",  "$routeParams",
	function($scope, $compile, EvalService, $routeParams) {
		var evaluationID = $routeParams.evaluationID;


		$scope.isWordQuestion = false;
		$scope.isSingleQuestion = false;
		$scope.isMultiQuestion = false;

		$scope.maseter = {};

	    $scope.orig = angular.copy($scope.data);

	    $scope.reset = function() {
	    	console.log("hello from reset");

	    };		

		if(evaluationID !== undefined) {
			EvalService.getEvaluationById(evaluationID).then(function(data) {
				$scope.evaluation = data;
			}, function(errorMessage) {
				console.log("Error fetching evaluation: " + errorMessage);
			});
		}
		else {
			$scope.evaluation = {
				TitleIS: "",
				TitleEN: "",
				IntroTextIS: "",
				IntroTextEN: "",
				CourseQuestions: [],
				TeacherQuestions: []
			};
		}

		$scope.addQ = function(){
			console.log("Hello from addQ");
			$scope.reset();
			
			
		}

		$scope.addCourseQuestion = function() {
			$scope.evaluation.CourseQuestions.push({
				ID: $scope.evaluation.CourseQuestions.length,
				TextIS: "",
				TextEN: "",
				ImageURL: "",
				Type: "single",
				Answers: []
			});
		}
	}
]);
