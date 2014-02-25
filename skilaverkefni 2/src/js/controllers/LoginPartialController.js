var LoginPartialController = function($scope,$location , SocketService, $modalInstance) {
	
	//a controller for a partial view login screen
	
	var socket = io.connect("http://localhost:8080");
	$scope.username = "";
	$scope.message = "";
	$scope.input = {};
	
	$scope.connect = function () {
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
					$scope.message = "Your name is taken, please choose another name";
				}
				
					
			});
			
		}
	};
	$scope.keyPress = function($event) {
		if($event.keyCode === 13) {
			$scope.connect();
		}
	};

};