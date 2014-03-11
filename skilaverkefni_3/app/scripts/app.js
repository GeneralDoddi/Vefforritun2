
var app = angular.module('skilaverkefni3App', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.bootstrap',
  'ngRoute'
  
]);

app.config(["$routeProvider", function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl: "views/main.html",
		controller: "MainCtrl"
	}).when("/admin/", {
		templateUrl: "views/admin.html",
		controller: "AdminCtrl"
	}).when("/evaluation/",{
		templateUrl: "views/evaluation.html",
		controller: "EvaluationController"
	}).when("/evaluation/:evaluationID",{
		templateUrl: "views/evaluation.html",
		controller: "EvaluationController"
	}).otherwise({ redirectTo: '/' });
	
	
		/*.when("/evaluation/:evaluationID", {
			templateUrl: "templates/evaluation.html",
			controller: "EvaluationController"
		}).when("/evaluation/", {
			templateUrl: "templates/evaluation.html",
			controller: "EvaluationController"}
	}).otherwise({ redirectTo: "/"});*/
}]);

/*app.config(["$routeProvider", function($routeProvider){
	$routeProvider.when("/",{ 
		templateUrl:"views/home.html",
		controller:"Login", 
	}).when("/room/:roomName", {
		templateUrl:"templates/room.html",
		controller: "RoomController",
.when('/testroute', {
  templateUrl: 'views/testroute.html',
  controller: 'TestrouteCtrl'
})
	}).otherwise({redirectTo:"/"});
}]);*/
