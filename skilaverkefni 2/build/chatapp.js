var app = angular.module("ChatApp",["ngRoute","ui.bootstrap"]);



app.config(["$routeProvider", function($routeProvider){
	$routeProvider.when("/",{ 
		templateUrl:"templates/default.html",
		controller:"LoginController", 
	}).when("/room/:roomName", {
		templateUrl:"templates/room.html",
		controller: "RoomController",
	}).otherwise({redirectTo:"/"});
}]);


app.factory("SocketService", ["$http", function($http) {
	var username = "";
	var socket;
	var rooms = [];
	return {
		setConnected: function(theSocket) {
			socket = theSocket;
		},
		setUsername: function(user) {
			username = user;
		},
		getUsername: function() {
			return username;
		},
		getSocket: function() {
			return socket;
		},
		//room service
		setRoom: function(theRoom){
			rooms.push(theRoom);
		},
		getRoom: function(){
			return rooms;
		},
		//partRoom: function(theRoom){
			
		//},
		roomExists: function(theRoom){
			for (var i = rooms.length - 1; i >= 0; i--) {
				console.log(rooms);
				if(rooms[i] === theRoom)
				{
					//console.log("true");
					return true;
				}
				
			}
			//console.log("false");
			return false;
		}
	};
}]);
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

};

var ModalInstanceCtrl = function ($scope, $modalInstance,$location, roomList, socket, SocketService) {

  $scope.roomName = "";
  $scope.roomList = roomList;
  $scope.input = {};
  
  $scope.createRoom = function (){
    
    console.log("Creating a new room");
    console.log($scope.input.roomName);
    socket.emit("joinroom", { room: $scope.roomname, pass: "" }, function(success, errorMessage) {
      if(SocketService.roomExists($scope.input.roomName) === false){
          SocketService.setRoom($scope.input.roomName);
          console.log("accepted");
          $location.path("/room/"+chatMsg[1]);
        }
      $modalInstance.dismiss();
    });
  };
  $scope.joinRoom = function(room) {
    console.log($scope.input.room);
    socket.emit("joinroom", { room: $scope.room, pass: "" }, function(success, errorMessage) {
      if(SocketService.roomExists($scope.input.roomName) === false){
          SocketService.setRoom($scope.input.roomName);
          console.log("accepted");
          $location.path("/room/"+chatMsg[1]);
        }
      $modalInstance.dismiss();
    });
  };
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};

app.controller("LoginController", function($scope, $location,SocketService, $modal) {
	
	
	console.log("hello from modal login");
	
	var modalLoginInstance = $modal.open({

				templateUrl:'templates/home.html',
				controller: "LoginPartialController",
				backdrop: "static",
				/*resolve:{
					socket: function() {
						return SocketService.getSocket();

					}
				}*/
			
	});
});	
app.controller("RoomController", ["$scope", "$location", "$routeParams", "SocketService","$modal","$log", function($scope, $location,$routeParams, SocketService,$modal,$log) {
	$scope.roomName = $routeParams.roomName;
	$scope.currentMessage = "";
	$scope.roomList = SocketService.getRoom();
	$scope.username = SocketService.getUsername();
	
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
				//console.log(messageHistory);
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

		
	}
	$scope.createRoom = function() {
		console.log("create new room");
		var modalInstance = $modal.open({
                templateUrl: 'templates/newRoomPartial.html',
                controller: "ModalInstanceCtrl",  //what do I put here to reference the other controller?
                backdrop: "static",
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
	$scope.partRoom = function() {
			console.log("Leaving room " + $scope.roomName);
			console.log($scope.roomName);
			console.log(SocketService.getUsername());	
			
			socket.emit("partroom",$scope.roomName, SocketService.getUsername() );
			console.log($scope.roomList);
			

	};
	
	$scope.keyPress = function($event) {
		console.log("$event");
		if($event.keyCode === 13) {
			$scope.send();
		}
	};
	/*$scope.active = function(room) {
		console.log("this is" + room);
		$(".tab-"+room).hide();

	};
	$scope.partRoom = function(){
		console.log("CLOSE");
	};*/

	
}]);