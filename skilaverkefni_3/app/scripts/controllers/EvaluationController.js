app.controller('EvaluationController', [
	"$scope", "EvalService",  "$routeParams","HttpService", "$http",
	function($scope, EvalService, $routeParams, HttpService, $http) {
		var evaluationID = $routeParams.evaluationID;


		$scope.isWordQuestion = false;
		$scope.isSingleQuestion = false;
		$scope.isMultiQuestion = false;

		$scope.addWordQuestion = false;
		$scope.addSingleQuestion = false;
		$scope.addMultiQuestion = false;

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

		

		$scope.addImage = function(){
			console.log("hello from addImage");
			var img = $("#imageURLInput").val();
			if(img !== ""){
				console.log("input detected");
				$.ajax({
				    url: img,
				    type:'HEAD',
				    error:
				        function(){
				        	$('#imageURL').attr('src', "http://armphoto.am/components/com_polygraphy/tmpl/source/nophotoavailable.jpg");
				        	
				        },
				    success:
				        function(){
							$('#imageURL').attr('src',$("#imageURLInput").val());
				        }
				});
			}

			
			console.log(img);
		}

		$scope.submitQ = function(){
			console.log("hello from submitQ");

			var whatType = $( "input[name=teacherOrCourse]:checked" ).val();

			if(whatType === "course"){
				console.log("adding course question to array");
				$scope.addCourseQuestion();
			}
			else if(whatType === "teacher"){
				console.log("adding teacher question");
			}
			$scope.addQ();
		}

		$scope.addCourseQuestion = function() {
			console.log("hello from addCourseQuestion");

			var xType = "";
			var additionalAnswers= [];

			if($scope.addWordQuestion){
				xType = "text";
			}
			else if($scope.addSingleQuestion){
				xType = "single";
			}
			else if($scope.addMultiQuestion){
				xType = "multiple";
			}

			if($scope.addMultiQuestion || $scope.addSingleQuestion){
				console.log("adding answers options to array");
				console.log($("#answer1IS").val());
				additionalAnswers.push($("#answer1IS").val());
				additionalAnswers.push($("#answer1EN").val());

				additionalAnswers.push($("#answer2IS").val());
				additionalAnswers.push($("#answer2EN").val());

				additionalAnswers.push($("#answer3IS").val());
				additionalAnswers.push($("#answer3EN").val());

				additionalAnswers.push($("#answer4IS").val());
				additionalAnswers.push($("#answer4EN").val());

				additionalAnswers.push($("#answer5IS").val());
				additionalAnswers.push($("#answer5EN").val());

				console.log(additionalAnswers);

			}
			console.log(additionalAnswers);
			var test = $("#qIs").val();
			console.log(test);
			console.log(xType);
			$scope.evaluation.CourseQuestions.push({
				ID: $scope.evaluation.CourseQuestions.length,
				TextIS: $("#qIs").val(),
				TextEN: $("#qEn").val(),
				ImageURL: $("#imageURL").val(),
				Type: xType,
				Answers: []
			});
			$scope.evaluation.CourseQuestions.Answers.push($scope.additionalAnswers);
			console.log($scope.evaluation.CourseQuestions);
			$scope.addWordQuestion = false;
			$scope.addSingleQuestion = false;
			$scope.addMultiQuestion = false;
			
		}
	}
]);
