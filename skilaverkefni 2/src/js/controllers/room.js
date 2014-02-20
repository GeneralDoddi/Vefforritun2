app.controller("RoomController", ["$scope", "$location", "$routeParams", "SocketService","$modal","$log", function($scope, $location,$routeParams, SocketService,$modal,$log) {
	$scope.roomName = $routeParams.roomName;
	$scope.currentMessage = "";
	$scope.roomList = SocketService.getRoom();
	
	var socket = SocketService.getSocket();
	
	if(socket) {
		socket.emit("joinroom", { room: $scope.roomName, pass: "" }, function(success, errorMessage) {
				if(SocketService.roomExists($scope.roomName) === false){
					SocketService.setRoom($scope.roomName);
					console.log("accepted");
				}
				
				console.log("joinroom " + $scope.roomName);
				console.log(SocketService.getRoom());
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
                    roomList: function() {
                        return $scope.roomList;
                    },
                    socket: function() {return SocketService.getSocket();
                    },
                    setRoom: function() {return SocketService.setRoom;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {
                //$scope.selected = selectedItem;
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
				if(SocketService.roomExists(chatMsg[1]) === false){
					SocketService.setRoom(chatMsg[1]);
					console.log("accepted");
					socket.emit("joinroom", {room: chatMsg[1], pass: ""}, function(success, errorMessage){
					console.log(SocketService.getRoom());
				});
				}
				
				
				$scope.currentMessage = "";

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
			socket.disconnect();
			$location.path("/");
			
		}
	};
	$scope.keyPress = function($event) {
		console.log("$event");
		if($event.keyCode === 13) {
			$scope.send();
		}
	};
	
}]);