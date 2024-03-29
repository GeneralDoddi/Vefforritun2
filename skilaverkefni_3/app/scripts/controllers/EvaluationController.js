app.controller('EvaluationController', [
	"$scope", "EvalService",  "$routeParams","HttpService", "$http",
	function($scope, EvalService, $routeParams, HttpService, $http) {
		var evaluationID = $routeParams.evaluationID;

		$scope.templateid = 1;
		$scope.finalEval = {
				ID:"",
				TitleIS: "",
				TitleEN: "",
				IntroTextIS: "",
				IntroTextEN: "",
				CourseQuestions: [],
				TeacherQuestions: []
			};

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
				$scope.evaluation1 = data;
			}, function(errorMessage) {
				console.log("Error fetching evaluation: " + errorMessage);
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


		$scope.submitQ = function() {
			console.log("hello from submitQ");

			var whatType = $( "input[name=teacherOrCourse]:checked" ).val();
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
			var tempArr = getEval();
			console.log($scope.evaluation.CourseQuestions.Type);
			if(whatType === "course"){
				console.log("adding course question to array");
				tempArr.CourseQuestions.push({

					ID: $scope.evaluation.CourseQuestions.length,
					TextIS: $("#qIs").val(),
					TextEN: $("#qEn").val(),
					ImageURL: $("#imageURL").val(),
					Type: $scope.whatType,
					Answers: []
				});
				if($scope.addMultiQuestion || $scope.addSingleQuestion){
					console.log("lkasndflnadsfksandf");
					tempArr.CourseQuestions.Answers = additionalAnswers;
					console.log($scope.evaluation.CourseQuestions.Answers);
				}
				tempArr.CourseQuestions.Type = xType;
			}
			else if(whatType === "teacher"){
				console.log("adding teacher question");
				tempArr.TeacherQuestions.push({

					ID: $scope.evaluation.TeacherQuestions.length,
					TextIS: $("#qIs").val(),
					TextEN: $("#qEn").val(),
					ImageURL: $("#imageURL").val(),
					Type: $scope.whatType,
					Answers: []
				});
				if($scope.addMultiQuestion || $scope.addSingleQuestion){
					console.log("lkasndflnadsfksandf");
					tempArr.TeacherQuestions.Answers = additionalAnswers;
					console.log(additionalAnswers);
					console.log($scope.evaluation.TeacherQuestions.Answers);
				}
				tempArr.TeacherQuestions.Type = xType;
			}
			console.log(tempArr);
			$scope.addWordQuestion = false;
			$scope.addSingleQuestion = false;
			$scope.addMultiQuestion = false;
			$scope.resetForm();
			$scope.addQ();
		}
		function setEval(arr){
			$scope.finalEval = arr;
		}
		function getEval(){
			return $scope.finalEval;
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
			console.log($scope.evaluation);
			var blah = getEval();
			EvalService.getAllEvaluationTemplates();
			console.log($scope.evaluationtemplates.length);
			blah.ID = $scope.evaluationtemplates.length +1;

			blah.TitleIS = $("#evalIs").val();
			blah.TitleEN = $("#evalEn").val();

			blah.IntroTextIS = $("#introIs").val();
			blah.IntroTextEN = $("#introEn").val();
			//lenti í veseni með spurninguna rétt fyrir skil þannig ég hardkóðaði inn spurningu
			blah.CourseQuestions = [{
					ID: 1,
					TextIS: "blah",
					TextEN: "blah",
					ImageURL: "blah",
					Type: "text",
					Answers:[]
				}]


			$scope.templateid = $scope.evaluationtemplates.length + 1;

			console.log(blah);
			EvalService.postEvaluationTemplate(blah);
		}
		$scope.saveEvaluation = function(){
			console.log("hello from saveEvaluation");
			console.log($scope.templateid);

			var evalObj = {
				TemplateID: $scope.templateid,
				StartDate:  $("#startDate").val(),
				EndDate: $("#endDate").val(),
			}
			EvalService.addEvaluation(evalObj);

		}
	}
]);
