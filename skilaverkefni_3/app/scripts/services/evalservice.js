app.service("EvalService", [
	"$q", "$timeout", "HttpService", "$http",
	function($q, $timeout, HttpService, $http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    function createEvaluation(id, titleIS, titleEN, introIS, introEN) {
			return {
				ID: id,
				TitleIS: titleIS,
				TitleEN: titleEN,
				IntroTextIS: introIS,
				IntroTextEN: introEN,
				CourseQuestions: [],
				TeacherQuestions: []
			};
		}

		function createQuestion(id, textIS, textEN, imageUrl, type) {
			return {
				ID: id,
				TextIS: textIS,
				TextEN: textEN,
				ImageURL: imageUrl,
				Type: type,
				Answers: []
			}
		}

		function generateEvaluations() {
			var result = [];
			/*for(var i = 0; i < 5; ++i) {
				var number = i+1;
				var evaluation = createEvaluation(i, "Kennslumat " + number, "Evaluation " + number, "Derp", "Derp");
				for(var j = 0; j < 3; ++j) {
					var qNumber = j+1;
					var question = createQuestion(j, "Hvað er derp" + qNumber + "?", "What is derp " + qNumber + "?", "", "single");
					evaluation.CourseQuestions.push(question);
				}
				result.push(evaluation);
			}*/

			$http.get(HttpService.getSocket() + 'evaluations', {"user": "thordurt12", "pass": "123456"}).
    success(function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      console.log(data);
      console.log(status);
      console.log(headers);
      console.log(config);
      console.log("success");

      
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log("No such User");
      console.log(data);
      console.log(headers);
      console.log(status);
      console.log(config);
    }); 

			return result;
		}

		var evaluations = generateEvaluations();

		return {
			getAllEvaluations: function() {
				var deferred = $q.defer();

				deferred.resolve(evaluations);
			
				return deferred.promise;
			},
			getEvaluationById: function(id) {
				var deferred = $q.defer();

				if(evaluations[id]) {
					deferred.resolve(evaluations[id]);
				}
				else {
					deferred.reject("No evaluation with this id");
				}

				return deferred.promise;
			},
			addEvaluation: function(evaluation) {
				var deferred = $q.defer();

				

				return deferred.promise;
			}
		};
	}
    //console.log("rass");
  ]);

