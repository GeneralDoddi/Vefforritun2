var LoginPartialController = function($scope,$location , SocketService, $modalInstance) {
	
	
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
					
					SocketService.setConnected(socket);
					SocketService.setUsername($scope.input.abc);

					SocketService.setRoom("lobby");
					$location.path("/room/lobby");
					$scope.$apply();
					$modalInstance.dismiss();	
				}
				else{
					console.log("herro from error");
					$scope.message = "Your name is taken, please choose another name";
				}
				
					
			});
			
		}
	};
	$scope.keyPress = function($event) {
		//console.log("$event");
		if($event.keyCode === 13) {
			$scope.connect();
		}
	};

};