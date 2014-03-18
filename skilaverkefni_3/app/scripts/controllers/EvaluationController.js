app.controller('EvaluationController', [
	"$scope", "EvalService",  "$routeParams","HttpService", "$http",
	function($scope, EvalService, $routeParams, HttpService, $http) {
		var evaluationID = $routeParams.evaluationID;

		$scope.templateid = 1;

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
			});
		}
		else {
			$scope.evaluation = {
				ID:"",
				TitleIS: "",
				TitleEN: "",
				IntroTextIS: "",
				IntroTextEN: "",
				CourseQuestions: [],
				TeacherQuestions: []
			};
		}
		
		EvalService.getAllEvaluationTemplates().then(function(data){
			console.log("Success getAllEvaluationTemplates, data: ", data);
			$scope.evaluationtemplates = data;
		}, function(errorMessage) {
			console.log("Error: " + errorMessage);
		}, function(updateMessage) {
			console.log("Update: " + updateMessage);
		});

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


		$scope.submitQ = function() {
			console.log("hello from submitQ");

			$scope.whatType = $( "input[name=teacherOrCourse]:checked" ).val();
			
			$scope.xType = "";
			var additionalAnswers= [];

			if($scope.addWordQuestion){
				$scope.xType = "text";
			}
			else if($scope.addSingleQuestion){
				$scope.xType = "single";
			}
			else if($scope.addMultiQuestion){
				$scope.xType = "multiple";
			}

			if($scope.addMultiQuestion || $scope.addSingleQuestion){
				console.log("adding answers options to array");

				additionalAnswers.push({
					ID: 1,
					TextIS: $("#answer1IS").val(),
					TextEN :$("#answer1EN").val(),
					ImageURL: $("#imageURLInput1").val(),
					Weight: 1});

				additionalAnswers.push({
					ID: 2,
					TextIS: $("#answer2IS").val(),
					TextEN :$("#answer2EN").val(),
					ImageURL: $("#imageURLInput2").val(),
					Weight: 2});

				additionalAnswers.push({
					ID: 3,
					TextIS: $("#answer3IS").val(),
					TextEN :$("#answer3EN").val(),
					ImageURL: $("#imageURLInput3").val(),
					Weight: 3});

				additionalAnswers.push({
					ID: 4,
					TextIS: $("#answer4IS").val(),
					TextEN :$("#answer4EN").val(),
					ImageURL: $("#imageURLInput4").val(),
					Weight: 4});

				additionalAnswers.push({
					ID: 5,
					TextIS: $("#answer5IS").val(),
					TextEN :$("#answer5EN").val(),
					ImageURL: $("#imageURLInput5").val(),
					Weight: 5});

				console.log(additionalAnswers);

			}
			
			console.log($scope.evaluation.CourseQuestions.Type);
			if($scope.whatType === "course"){
				console.log("adding course question to array");
				$scope.evaluation.CourseQuestions.push({

					ID: $scope.evaluation.CourseQuestions.length,
					TextIS: $("#qIs").val(),
					TextEN: $("#qEn").val(),
					ImageURL: $("#imageURL").val(),
					Type: $scope.whatType,
					Answers: additionalAnswers.slice(0)
				});
				if($scope.addMultiQuestion || $scope.addSingleQuestion){
					console.log("lkasndflnadsfksandf");
					$scope.evaluation.CourseQuestions.Answers = additionalAnswers.slice(0);
					console.log($scope.evaluation.CourseQuestions.Answers);
				}
				$scope.evaluation.CourseQuestions.Type = xType;
			}
			else if($scope.whatType === "teacher"){
				console.log("adding teacher question");
				$scope.evaluation.TeacherQuestions.push({

					ID: $scope.evaluation.TeacherQuestions.length,
					TextIS: $("#qIs").val(),
					TextEN: $("#qEn").val(),
					ImageURL: $("#imageURL").val(),
					Type: $scope.whatType,
					Answers: additionalAnswers.slice(0)
				});
				if($scope.addMultiQuestion || $scope.addSingleQuestion){
					console.log("lkasndflnadsfksandf");
					$scope.evaluation.TeacherQuestions.Answers = additionalAnswers.slice(0);
					console.log($scope.evaluation.TeacherQuestions.Answers);
				}
				$scope.evaluation.TeacherQuestions.Type = xType;
			}
			$scope.addWordQuestion = false;
			$scope.addSingleQuestion = false;
			$scope.addMultiQuestion = false;
			$scope.resetForm();
			$scope.addQ();
		}
		$scope.resetForm = function(){
			$("#answer1IS").val("");
			$("#answer2IS").val("");
			$("#answer3IS").val("");
			$("#answer4IS").val("");
			$("#answer5IS").val("");

			$("#answer1EN").val("");
			$("#answer2EN").val("");
			$("#answer3EN").val("");
			$("#answer4EN").val("");
			$("#answer5EN").val("");
			
			$("#imageURLInput").val(" ");
			$("#imageURLInput1").val("");
			$("#imageURLInput2").val("");
			$("#imageURLInput3").val("");
			$("#imageURLInput4").val("");
			$("#imageURLInput5").val("");

			$("#qIs").val("");
			$("#qEn").val("");


		}

		$scope.saveTemplate = function(){
			console.log("hello from saveTemplate");
			EvalService.getAllEvaluationTemplates();
			console.log($scope.evaluationtemplates.length);
			$scope.evaluation.ID = $scope.evaluationtemplates.length + 1;

			$scope.evaluation.TitleIS = $("#evalIs").val();
			$scope.evaluation.TitleEN = $("#evalEn").val();

			$scope.evaluation.IntroTextIS = $("#introIs").val();
			$scope.evaluation.IntroTextEN = $("#introEn").val();

			$scope.templateid = $scope.evaluationtemplates.length + 1;

			console.log($scope.evaluation);
			EvalService.postEvaluationTemplate($scope.evaluation).then(function(data){
			console.log("Success, data: ", data);
			$scope.evaluationtemplatesID = data;
		});
		}
		$scope.saveEvaluation = function(){
			console.log("hello from saveEvaluation");
			console.log($scope.templateid);

			var evalObj = {
				TemplateID: $scope.templateid,
				StartDate:  $("#startDate").val(),
				EndDate: $("#endDate").val(),
			}
			EvalService.addEvaluation(evalObj).then(function(data){
			console.log("Success, data: ", data);
			$scope.addedEvaluation = data;
		});

		}
	}
]);
