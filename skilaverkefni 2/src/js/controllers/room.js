app.controller("RoomController", ["$scope", "$location", "$routeParams", "SocketService","$modal","$log", function($scope, $location,$routeParams, SocketService,$modal,$log) {
	$scope.roomName = $routeParams.roomName;
	$scope.currentMessage = "";
	$scope.roomList = SocketService.getRoom();
	$scope.username = SocketService.getUsername();
	$scope.privChat = SocketService.getPrivchat();
	$scope.privmessages = [];
	
	var socket = SocketService.getSocket();
	
	if(socket) {
		socket.emit("joinroom", { room: $scope.roomName, pass: "" }, function(success, errorMessage) {
				if(SocketService.roomExists($scope.roomName) === false){
					SocketService.setRoom($scope.roomName);

					
				}

		});

		socket.on("updatechat", function(roomname, messageHistory) {
			//console.log(roomname + " " + $scope.roomName);
			if(roomname === $scope.roomName)
			{
				console.log(messageHistory);
				$scope.messages = messageHistory;
				$scope.$apply();
			}
		});
		socket.on("updateusers", function(room, users, ops) {
			if(room === $scope.roomName) {
				//console.log("ops " + ops);
				$scope.ops = ops;
				$scope.users = users;
				$scope.$apply();
			}
			//console.log(users);
		});
		socket.on("kicked", function(room, kickeduser, byuser){
			if(kickeduser === $scope.username){
				SocketService.partRoom($scope.roomName);
				$location.path("/room/lobby");
				
			}
				
		});
		socket.on("opped", function(room, oppeduser, byuser){
			if(oppeduser === $scope.username){
				
				//console.log("op");
			}
		});
		socket.on("deopped", function(room, deoppeduser, bysuser){
			if(deoppeduser === $scope.username){
				
			}
		});
		socket.on("banned", function(room, banneduser, byuser){
			socket.emit("kick", {room: room, user: banneduser},function(success, errorMessage){

			});
		});
		socket.on("exited", function(room, user){
			$location.path("/room/lobby");
			//socket.emit("sendmsg", {roomName: room,  msg: "Has left" });
					
		});
		socket.on("recv_privatemsg", function(user, message){
				if(SocketService.chatExists(user) === false){
					SocketService.setPrivchat(user);
					//$location.path("/room/"+senduser);

				}
				console.log(message);
				$scope.privmessages.push(message);
				$scope.$apply();
				if(!$("."+user).is(":visible")){
					$("."+user).toggle();
				}
			
		});

		
	}
	$scope.createRoom = function() {
		console.log("create new room");
		var modalInstance = $modal.open({
                templateUrl: 'templates/newRoomPartial.html',
                controller: "ModalInstanceCtrl",  //what do I put here to reference the other controller?
                backdrop: "static",
                resolve: {
                    roomList: function() {
                        return SocketService.getRoom();
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
				socket.emit("kick", {room: $scope.roomName, user: chatMsg[1]}, function(success, errorMessage){
					if(success){
						socket.emit("sendmsg", {roomName: $scope.roomName,  msg: "Has kicked : " + chatMsg[1]});
					}
				});
				
				$scope.currentMessage = "";
			}
			else if(chatMsg[0] === "/op"){
				socket.emit("op", {room: $scope.roomName, user: chatMsg[1]}, function(success, errorMessage){
					if(success){
						socket.emit("sendmsg", {roomName: $scope.roomName,  msg: "Has opped " + chatMsg[1]});
					}
				});
				$scope.currentMessage = "";
			}
			else if(chatMsg[0] === "/deop"){
				socket.emit("deop", {room: $scope.roomName, user: chatMsg[1]}, function(success, errorMessage){
					if(success){
						socket.emit("sendmsg", {roomName: $scope.roomName, msg: "Has deopped " + chatMsg[1]});
					}	
				});
				$scope.currentMessage = "";
			}
			else if(chatMsg[0] === "/ban"){
				socket.emit("ban", {room: $scope.roomName, user: chatMsg[1]}, function(success, errorMessage){
					if(success){
						socket.emit("sendmsg", {roomName: $scope.roomName, msg: "Has banned " + chatMsg[1]});
					}
				});
				$scope.currentMessage = "";

			}
			else if(chatMsg[0] === "/unban"){
				socket.emit("unban", {room: $scope.roomName, user: chatMsg[1]}, function(success, errorMessage){
					if(success){
						socket.emit("sendmsg", {roomName: $scope.roomName, msg: "Has unbanned " + chatMsg[1]});
					}
				});
				$scope.currentMessage = "";

			}
			else if(chatMsg[0] === "/joinroom"){
				
				if(SocketService.roomExists(chatMsg[1]) === false){
					SocketService.setRoom(chatMsg[1]);
					socket.emit("joinroom", {room: chatMsg[1], pass: ""}, function(success, errorMessage){
						if(success){
							$location.path("/room/"+chatMsg[1]);
							$scope.$apply();
						}
						else{
							alert("you are banned from " + chatMsg[1]);
						}
					});
					socket.emit("op", {room: $scope.roomName, user: $scope.username}, function(success, errorMessage){
					if(success){
						$scope.$apply();
					}
				});
					
				}
				
				
				$scope.currentMessage = "";

			}
			else if(chatMsg[0] === "/partroom"){
				if($scope.roomName === "lobby")
				{
					alert("You must disconnect to leave lobby");
				}
				else{
					chatMsg.shift();
					socket.emit("sendmsg", {roomName: $scope.roomName,  msg: "Has left : " + chatMsg.join(" ")});
					$scope.currentMessage = "";
					SocketService.partRoom($scope.roomName);
					$location.path("/room/lobby");
					socket.emit("partroom",$scope.roomName);

				}
			}
			else if(chatMsg[0] === "/msg"){
				//chatMsg.shift();
				//socket.emit("enablechat", $scope.username, chatMsg[1]);
				SocketService.setPrivchat(chatMsg[1]);
				socket.emit("privatemsg", {nick: chatMsg[1], message: chatMsg[2]}, function(success, errorMessage){
						if(success){
							//$scope.privmessages.push(chatMsg[2]);
							//$scope.$apply();
						}
				});
				$scope.currentMessage = "";
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
	$scope.partRoom = function(room) {
			console.log(room);
			if(room === "lobby")
				{
					alert("You must disconnect to leave lobby");
				}
			else{
					//chatMsg.shift();
					console.log("delete " + room);
					
					SocketService.partRoom(room);
					socket.emit("exited", room, $scope.username);
					
					socket.emit("partroom",room);
					//$location.path("/room/lobby");

				}
			
			

	};
	
	$scope.keyPress = function($event) {
		console.log("$event");
		if($event.keyCode === 13) {
			$scope.send();
		}
	};
	$scope.derp = function(chat){
		$("."+chat).toggle();
	};
	
}]);

