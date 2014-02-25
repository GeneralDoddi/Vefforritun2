var LoginPartialController = function($scope,$location , SocketService, $modalInstance) {
	
	console.log("Hello from login");
	var socket = io.connect("http://localhost:8080");
	$scope.username = "";
	$scope.message = "";
	$scope.input = {};
	
	$scope.connect = function () {
		console.log($scope.input.abc);
		console.log("Hello from login3");
		if(socket){
			
			socket.emit("adduser", $scope.input.abc, function(available) {
				if (available){
					console.log("hello from connect");
					SocketService.setConnected(socket);
					SocketService.setUsername($scope.input.abc);

					SocketService.setRoom("lobby");
					
				}
				else{
					$scope.message = "Your name is taken, please choose another name";
				}
				$location.path("/room/lobby");
				$scope.$apply();
				$modalInstance.dismiss();	
			});
			
		}
	};

};