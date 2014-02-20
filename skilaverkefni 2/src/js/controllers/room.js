app.controller("RoomController", ["$scope", "$location", "$routeParams", "SocketService","$modal","$log", function($scope, $location,$routeParams, SocketService,$modal,$log) {
	$scope.roomName = $routeParams.roomName;
	
	$scope.currentMessage = "";
	
	var socket = SocketService.getSocket();

	if(socket) {
		socket.emit("joinroom", { room: $scope.roomName, pass: "" }, function(success, errorMessage) {

		});

		socket.on("updatechat", function(roomname, messageHistory) {
			console.log(messageHistory);
			$scope.messages = messageHistory;
			$scope.$apply();
		});

		socket.on("updateusers", function(room, users) {
			if(room === $scope.roomName) {
				
				$scope.users = users;
				$scope.$apply();
			}
			//console.log(users);
		});
		
	}
	$scope.createRoom = function() {

		
		console.log("create new room");
		var modalInstance = $modal.open({
                templateUrl: 'templates/newRoomPartial.html',
                controller: "ModalInstanceCtrl",  //what do I put here to reference the other controller?
                resolve: {
                    userList: function() {
                        return $scope.users;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
	};
	$scope.joinRoom = function(){
		var modalInstance = $modal.open({
                templateUrl: 'templates/joinRoomPartial.html',
                controller: "ModalInstanceCtrl",  //what do I put here to reference the other controller?
                resolve: {
                    userList: function() {
                        return $scope.roomList;
                    }


                }
            });

            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });	
	};
	$scope.send = function() {
		if(socket) {
			var chatMsg = ($scope.currentMessage).split(' ');
			if(chatMsg[0] === "/kick"){
				console.log("homo");
			}
			else if(chatMsg[0] === "/op"){

			}
			else if(chatMsg[0] === "/ban"){

			}
			else if(chatMsg[0] === "/joinroom"){
				//console.log(chatMsg[1]);
				SocketService.setRoom(chatMsg[1]);
				console.log(SocketService.getRoom[chatMsg[1]]);
				socket.emit("joinroom", {room: SocketService.getRoom(chatMsg[1]), pass: ""}, function(success, errorMessage){

				});

			}
			else if(chatMsg[0] === "/partroom"){

			}
			else{
			console.log("I sent a message to " + $scope.roomName + ": " + $scope.currentMessage);
			socket.emit("sendmsg", { roomName: $scope.roomName, msg: $scope.currentMessage });
			$scope.currentMessage = "";
			}
		}
	};
	$scope.disconnect = function() {
		if(socket){
			console.log(SocketService.getUsername() + " Disconnected from server");
			$location.path("/");
			socket.disconnect();			

		}
	};
	$scope.keyPress = function($event) {
		console.log("$event");
		if($event.keyCode === 13) {
			$scope.send();
		}
	};
	
}]);