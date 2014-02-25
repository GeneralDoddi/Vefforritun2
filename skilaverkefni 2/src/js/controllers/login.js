app.controller("LoginController", function($scope, $location,SocketService, $modal) {
	
	
	console.log("hello from modal login");
	
	var modalLoginInstance = $modal.open({

				templateUrl:'templates/home.html',
				controller: "LoginPartialController",
				backdrop: "static",
	});
});	