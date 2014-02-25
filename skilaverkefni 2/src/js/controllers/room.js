app.controller("RoomController", ["$scope", "$location", "$routeParams", "SocketService","$modal","$log", function($scope, $location,$routeParams, SocketService,$modal,$log) {
	$scope.roomName = $routeParams.roomName;
	$scope.currentMessage = "";
	$scope.roomList = SocketService.getRoom();
	$scope.username = SocketService.getUsername();
	$scope.privChat = SocketService.getPrivchat();
	$scope.privmessages = SocketService.getChatitem();
	
	
	var socket = SocketService.getSocket();
	
	if(socket) {

		//used for maintaining the joined room when a scope is switched
		//it was unavoidable for the first join, user is both op and user

		socket.emit("joinroom", { room: $scope.roomName, pass: "" }, function(success, errorMessage) {
				if(SocketService.roomExists($scope.roomName) === false){
					SocketService.setRoom($scope.roomName);
				}
		});

		// Keeps the chat updated in real time, but only the one selected

		socket.on("updatechat", function(roomname, messageHistory) {
			if(roomname === $scope.roomName)
			{
				console.log(messageHistory);
				$scope.messages = messageHistory;
				$scope.$apply();
			}
		});

		//keeps users updated in real time in rooms the client is currently
		// a part of 

		socket.on("updateusers", function(room, users, ops) {
			if(room === $scope.roomName) {
				$scope.ops = ops;
				$scope.users = users;
				$scope.$apply();
			}
		});

		// kicked listener, makes the user part the room and is redirected
		// to the lobby

		socket.on("kicked", function(room, kickeduser, byuser){
			if(kickeduser === $scope.username){
				SocketService.partRoom($scope.roomName);
				$location.path("/room/lobby");
				
			}
				
		});

		//opped and deop listeners were unnessecary
		// a banned listener kicks user when he is banned 

		socket.on("banned", function(room, banneduser, byuser){
			socket.emit("kick", {room: room, user: banneduser},function(success, errorMessage){

			});
		});
		//a special made listener for user to be redirected to lobby
		// when he parts a room
		socket.on("exited", function(room, user){
			$location.path("/room/lobby");			
		});

		//Private messages are recieved and processed, though we are aware
		// of a special duplicate error in console it doesn't do any harm
		// that error is because of the chatExists, sometimes he inserts
		// an item that is already in the array
		socket.on("recv_privatemsg", function(user, message){
				if(SocketService.chatExists(user) === false){
					SocketService.setPrivchat(user);
				}
				console.log(message);
				SocketService.setChatitem(message);
				$scope.privmessages = message;
				$scope.$apply();
				if(!$("."+user).is(":visible")){
					$("."+user).toggle();
				}
			
		});

		
	}

	//The partial view , for create room buttons
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

	// The send function where it extracts the commands, kick,ban,op,deop,join
	// etc and processes accordingly, of there isn't a / command it is a message

	
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
				SocketService.setPrivchat(chatMsg[1]);
				socket.emit("privatemsg", {nick: chatMsg[1], message: chatMsg[2]}, function(success, errorMessage){
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

	// closes the socket for the client 

	$scope.disconnect = function() {
		if(socket){
			console.log(SocketService.getUsername() + " Disconnected from server");
			socket.disconnect();
			$location.path("/");
			
		}
	};

	// partroom button implemented.

	$scope.partRoom = function() {
			
			if($scope.roomName === "lobby")
				{
					alert("You must disconnect to leave lobby");
				}
			else{
					console.log("delete " + $scope.roomName);
					
					SocketService.partRoom($scope.roomName);
					socket.emit("exited", room, $scope.username);
					socket.emit("partroom",$scope.roomName);
					$location.path("/room/lobby");
				}
			
			

	};

	// Monitors a keypress with enter, and sends the message
	
	$scope.keyPress = function($event) {
		console.log("$event");
		if($event.keyCode === 13) {
			$scope.send();
		}
	};

	// the power of derp shows and hides private messages
	$scope.derp = function(chat){
		$("."+chat).toggle();
	};
	
}]);

