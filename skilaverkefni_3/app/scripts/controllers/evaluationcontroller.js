app.controller('EvaluationController', [
	"$scope", "EvalService", "$routeParams",
	function($scope, EvalService, $routeParams) {
		var evaluationID = $routeParams.evaluationID;

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
			var header = $("#qHeader").html();
			$("#questions").append(header);

		}

		$scope.addAnswer = function(question) {
			question.Answers.push("New answer");
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
