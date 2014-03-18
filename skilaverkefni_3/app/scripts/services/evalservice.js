app.service("EvalService", ["$q", "$timeout", "HttpService", "$http", function($q, $timeout, HttpService, $http) {
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
		//var evaluations = generateEvaluations();

		return {
			getAllEvaluations: function() {
				var deferred = $q.defer();

				$http.defaults.headers.common.Authorization = "Basic " + HttpService.getToken();

				$http.get(HttpService.getSocket() + 'evaluations').
				success(function(data, status, headers, config) {
		      // this callback will be called asynchronously
		      // when the response is available
		      console.log(data);
		      console.log("success");
		      deferred.resolve(data);
		      
		    }).
		    error(function(data, status, headers, config) {
		      // called asynchronously if an error occurs
		      // or server returns response with an error status.
		      console.log("No such User");

		      console.log(status);
		      deferred.reject(status);
		    }); 

				//deferred.resolve(evaluations);
			
				return deferred.promise;
			},
			getEvaluationById: function(id) {
				var deferred = $q.defer();

				$http.defaults.headers.common.Authorization = "Basic " + HttpService.getToken();

				$http.get(HttpService.getSocket() + 'evaluations/' + id).
				success(function(data, status, headers, config) {
		      // this callback will be called asynchronously
		      // when the response is available
		      console.log(data);
		      console.log("success");
		      deferred.resolve(data);
		      
		    }).
		    error(function(data, status, headers, config) {
		      // called asynchronously if an error occurs
		      // or server returns response with an error status.
		      console.log("No such User");

		      console.log(status);
		      deferred.reject(status);
		    });

				return deferred.promise;
			},
			addEvaluation: function(evaluation) {
				
				var deferred = $q.defer();

				$http.defaults.headers.common.Authorization = "Basic " + HttpService.getToken();

				$http.post(HttpService.getSocket() + 'evaluations', evaluation).success(function(data, status, headers, config){
			        console.log("POSTED!");
			        deferred.resolve(data);

			    }).error(function(data, status, headers, config) {
			      // called asynchronously if an error occurs
			      // or server returns response with an error status.
			      console.log("failed to post");
			      	deferred.reject(status);
			    }); 
			    
			    console.log(evaluation);
				return deferred.promise;

			},
			getAllEvaluationTemplates: function(){
				var deferred = $q.defer();

				$http.defaults.headers.common.Authorization = "Basic " + HttpService.getToken();
    			console.log(HttpService.getToken());
    			$http.get(HttpService.getSocket() + 'evaluationtemplates').
			    success(function(data, status, headers, config) {
			  		console.log("YAY");
			  		deferred.resolve(data);
			    }).
			    error(function(data, status, headers, config) {
			      // called asynchronously if an error occurs
			      // or server returns response with an error status.
			      console.log("NO COURSES!");
			      deferred.reject(status);
			    });
			    return deferred.promise;
			},
			getEvaluationTemplateByID: function(id){
				var deferred = $q.defer();

				$http.defaults.headers.common.Authorization = "Basic " + HttpService.getToken();
    			console.log(HttpService.getToken());
    			$http.get(HttpService.getSocket() + 'evaluationtemplates/' + id).
			    success(function(data, status, headers, config) {
			  		console.log("YAY");
			  		deferred.resolve(data);
			    }).
			    error(function(data, status, headers, config) {
			      // called asynchronously if an error occurs
			      // or server returns response with an error status.
			      console.log("NO COURSES!");
			      deferred.reject(status);
			    });
			    return deferred.promise;
			},
			postEvaluationTemplate: function(evalObj){

				var deferred = $q.defer();

				$http.defaults.headers.common.Authorization = "Basic " + HttpService.getToken();

				$http.post(HttpService.getSocket() + 'evaluationtemplates', evalObj).success(function(data, status, headers, config){

			        console.log("POSTED!");
			        deferred.resolve(data);

			    }).error(function(data, status, headers, config) {
			      // called asynchronously if an error occurs
			      // or server returns response with an error status.
			      console.log("failed to post");
			      	deferred.reject(status);
			    }); 

				return deferred.promise;

			},
			getCourseTeacher: function(course, semester){
				var deferred = $q.defer();

				$http.defaults.headers.common.Authorization = "Basic " + HttpService.getToken();
    			console.log(HttpService.getToken());
    			$http.get(HttpService.getSocket() + 'courses/' + course + '/' + semester + '/teachers').
			    success(function(data, status, headers, config) {
			  		console.log("teachers");
			  		deferred.resolve(data);
			    }).
			    error(function(data, status, headers, config) {
			      // called asynchronously if an error occurs
			      // or server returns response with an error status.
			      console.log("NO TEACHERS!");
			      deferred.reject(status);
			    });
			    return deferred.promise;
			},
			getCourseEvaluation: function(course, semester, ID){
				var deferred = $q.defer();

				$http.defaults.headers.common.Authorization = "Basic " + HttpService.getToken();
    			console.log(HttpService.getToken());
    			$http.get(HttpService.getSocket() + 'courses/' + course + '/' + semester + '/evaluations/' + ID).
			    success(function(data, status, headers, config) {
			  		console.log("course evaluations");
			  		deferred.resolve(data);
			    }).
			    error(function(data, status, headers, config) {
			      // called asynchronously if an error occurs
			      // or server returns response with an error status.
			      console.log("NO COURSE EVALUATIONS!");
			      deferred.reject(status);
			    });
			    return deferred.promise;
			},
			postCourseEvaluation: function(course, semester, ID){
				var deferred = $q.defer();

				$http.defaults.headers.common.Authorization = "Basic " + HttpService.getToken();
    			console.log(HttpService.getToken());
    			$http.post(HttpService.getSocket() + 'courses/' + course + '/' + semester + '/evaluations/' + ID, [
					  {
					    "QuestionID": 1,
					    "TeacherSSN": 1234567890,
					    "Value": "sample string 3"
					  },
					  {
					    "QuestionID": 2,
					    "TeacherSSN": 1234567890,
					    "Value": "sample string 3"
					  },
					  {
					    "QuestionID": 3,
					    "TeacherSSN": 1234567890,
					    "Value": "sample string 3"
					  }
					]).
			    success(function(data, status, headers, config) {
			  		console.log("course evaluations");
			  		deferred.resolve(data);
			  		console.log(data);
			    }).
			    error(function(data, status, headers, config) {
			      // called asynchronously if an error occurs
			      // or server returns response with an error status.
			      console.log("NO COURSE EVALUATIONS!");
			      deferred.reject(status);
			    });
			    return deferred.promise;
			}


		};
	}
    //console.log("rass");
  ]);

