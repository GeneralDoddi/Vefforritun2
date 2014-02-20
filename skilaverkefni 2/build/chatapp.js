var app = angular.module("ChatApp",["ngRoute","ui.bootstrap"]);



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
		getUsername: function() {
			return username;
		},
		getSocket: function() {
			return socket;
		}
		
	};
}]);

var ModalInstanceCtrl = function ($scope, $modalInstance, userList) {

  console.log(userList);
  $scope.userList = userList;

  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};

app.controller("LoginController", ["$scope","$location", "SocketService", function($scope, $location,SocketService) {
	$scope.username = "";
	$scope.message = "";

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
			console.log("I sent a message to " + $scope.roomName + ": " + $scope.currentMessage);
			socket.emit("sendmsg", { roomName: $scope.roomName, msg: $scope.currentMessage });
			$scope.currentMessage = "";
		}
	};
	$scope.disconnect = function() {
		if(socket){
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