app.controller('EvaluationController', [
	"$scope", "EvalService",  "$routeParams","HttpService", "$http",
	function($scope, EvalService, $routeParams, HttpService, $http) {
		var evaluationID = $routeParams.evaluationID;


		$scope.isWordQuestion = false;
		$scope.isSingleQuestion = false;
		$scope.isMultiQuestion = false;
		$scope.showHeaderQ = false;
		$scope.showAdditionalInfo = false;
		$scope.courses = [];

		$scope.userinfo = HttpService.getUserobj();
		console.log($scope.userinfo);						

		if
		(evaluationID !== undefined) {
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

			if($scope.isWordQuestion){
				$scope.showHeaderQ = true;
				$scope.showAdditionalInfo = false;
			}
			else if($scope.isSingleQuestion){
				$scope.showHeaderQ = true;
				$scope.showAdditionalInfo = true;
				$("#answer1").attr("type","radio");
				$("#answer2").attr("type","radio");
				$("#answer3").attr("type","radio");
				$("#answer4").attr("type","radio");
				$("#answer5").attr("type","radio");
			}
			else if($scope.isMultiQuestion){
				$scope.showHeaderQ = true;
				$scope.showAdditionalInfo = true;
				$("#answer1").attr("type","checkbox");
				$("#answer2").attr("type","checkbox");
				$("#answer3").attr("type","checkbox");
				$("#answer4").attr("type","checkbox");
				$("#answer5").attr("type","checkbox");
			}
			else{
				$scope.showHeaderQ = false;
				$scope.showAdditionalInfo = false;
			}
		}

		
    	$http.get(HttpService.getSocket() + 'my/courses').
		    success(function(data, status, headers, config) {
		  		console.log("courses");
		  		$scope.courses = data;
		  		console.log($scope.courses);
		    }).
		    error(function(data, status, headers, config) {
		      // called asynchronously if an error occurs
		      // or server returns response with an error status.
		      console.log("NO COURSES!");
		    });

		    $scope.submitQ

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
