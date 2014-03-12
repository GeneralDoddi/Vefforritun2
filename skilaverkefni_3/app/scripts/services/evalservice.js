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
			postEvaluationTemplate: function(){

				var deferred = $q.defer();

				$http.defaults.headers.common.Authorization = "Basic " + HttpService.getToken();

				$http.post(HttpService.getSocket() + 'evaluationtemplates',{
				  "ID": 1005,
				  "TitleIS": "Doddi2",
				  "TitleEN": "sample string 3",
				  "IntroTextIS": "sample string 4",
				  "IntroTextEN": "sample string 5",
				  "CourseQuestions": [
				    {
				      "ID": 1,
				      "TextIS": "sample string 2",
				      "TextEN": "sample string 3",
				      "ImageURL": "sample string 4",
				      "Type": "sample string 5",
				      "Answers": [
				        {
				          "ID": 1,
				          "TextIS": "sample string 2",
				          "TextEN": "sample string 3",
				          "ImageURL": "sample string 4",
				          "Weight": 5
				        },
				        {
				          "ID": 2,
				          "TextIS": "sample string 2",
				          "TextEN": "sample string 3",
				          "ImageURL": "sample string 4",
				          "Weight": 5
				        },
				        {
				          "ID": 3,
				          "TextIS": "sample string 2",
				          "TextEN": "sample string 3",
				          "ImageURL": "sample string 4",
				          "Weight": 5
				        }
				      ]

				    }],
				  	"TeacherQuestions": [
				    {
				      "ID": 1,
				      "TextIS": "sample string 2",
				      "TextEN": "sample string 3",
				      "ImageURL": "sample string 4",
				      "Type": "sample string 5",
				      "Answers": [
				        {
				          "ID": 1,
				          "TextIS": "sample string 2",
				          "TextEN": "sample string 3",
				          "ImageURL": "sample string 4",
				          "Weight": 5
				        },
				        {
				          "ID": 2,
				          "TextIS": "sample string 2",
				          "TextEN": "sample string 3",
				          "ImageURL": "sample string 4",
				          "Weight": 5
				        },
				        {
				          "ID": 3,
				          "TextIS": "sample string 2",
				          "TextEN": "sample string 3",
				          "ImageURL": "sample string 4",
				          "Weight": 5
				        }
				      ]
				  	}
				  ] 
			    }).success(function(data, status, headers, config){

			        console.log("POSTED!");
			        deferred.resolve(data);

			    }).error(function(data, status, headers, config) {
			      // called asynchronously if an error occurs
			      // or server returns response with an error status.
			      console.log("failed to post");
			      	deferred.reject(status);
			    }); 

				return deferred.promise;

			}
		};
	}
    //console.log("rass");
  ]);

