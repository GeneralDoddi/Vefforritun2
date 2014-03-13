


var app = angular.module('skilaverkefni3App', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.bootstrap',
  'ngRoute',
  
]);

app.config(["$routeProvider", function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl: "views/main.html",
		controller: "MainCtrl"
	}).when("/admin/", {
		templateUrl: "views/admin.html",
		controller: "AdminController"
	}).when("/evaluation/",{
		templateUrl: "views/evaluation.html",
		controller: "EvaluationController"
	}).when("/evaluation/:evaluationID",{
		templateUrl: "views/evaluation.html",
		controller: "EvaluationController"
	}).when("/user/",{
		templateUrl: "views/user.html",
		controller: "UserController"
	}).otherwise({ redirectTo: '/' });

}]);

