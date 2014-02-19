var app = angular.module("ChatApp", ["ngRoute"]);

app.config(["$routeProvider", function($routeProvider){
	$routeProvider.when("/",{
		templateUrl:"templates/home.html",
		controller:"LoginController", 
	}).when("/room/:roomName", {
		templateUrl:"templates/room.html",
		controller: "RoomController",
	}).otherwise({redirectTo:"/"});
}]);

app.factory("SocketService", ["$http", function($http) {
	var username = "";
	var socket;
	return {
		setConnected: function(theSocket) {
			socket = theSocket;
		},
		setUsername: function(user) {
			username = user;
		},
		setRoom: function(theRoom){
			room.push(theRoom);
		},
		getUsername: function() {
			return username;
		},
		getSocket: function() {
			return socket;
		},
		getRoom: function() {
			return room;
		} 
	};
}]);
app.controller("LoginController", ["$scope","$location", "SocketService", function($scope, $location,SocketService) {
	$scope.username = "";
	$scope.message = "";
	console.log("herro from login");
	var socket = io.connect("http://localhost:8080");

	$scope.connect = function () {
		if(socket){
			socket.emit("adduser", $scope.username, function(available) {
				if (available){
					SocketService.setConnected(socket);
					SocketService.setUsername($scope.username);
					$location.path("/room/lobby");
				}
				else{
					$scope.message = "Your name is taken, please choose another name";
				}
				$scope.$apply();
			});
		}
	};
}]);
app.controller("RoomController", ["$scope", "$location", "$routeParams", "SocketService", function($scope, $location ,$routeParams, SocketService) {
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
				console.log(chatMsg[1]);
				socket.emit("joinroom", {room: chatMsg[1], pass: ""}, function(success, errorMessage){

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
		if($event.keyCode === 13) {
			$scope.send();
		}
	};
	
}]);