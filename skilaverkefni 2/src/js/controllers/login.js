app.controller("LoginController", function($scope, $location,SocketService, $modal) {
	
	
	console.log("hello from modal login");
	
	var modalLoginInstance = $modal.open({

				templateUrl:'templates/home.html',
				controller: "LoginPartialController",
				/*resolve:{
					socket: function() {
						return SocketService.getSocket();

					}
				}*/
			
	});
	$scope.keyPress = function($event) {
		if($event.keyCode === 13) {
			$scope.connect();
		}
	};
