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
					console.log("true");
					return true;
				}
				
			}
			console.log("false");
			return false;
		}
		
	};
}]);
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

var ModalInstanceCtrl = function ($scope, $modalInstance, roomList, socket, SocketService) {

  $scope.roomName = "";
  $scope.roomList = roomList;
  $scope.input = {};
  
  $scope.createRoom = function (){
    
    console.log("Creating a new room");
    console.log($scope.input.abc);
    socket.emit("joinroom", { room: $scope.roomname, pass: "" }, function(success, errorMessage) {
      if(SocketService.roomExists($scope.input.abc) === false){
          SocketService.setRoom($scope.input.abc);
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
				/*resolve:{
					socket: function() {
						return SocketService.getSocket();

					}
				}*/
			
	});

					SocketService.setRoom("lobby");
					$location.path("/room/lobby");
				}
				else{
					$scope.message = "Your name is taken, please choose another name";
				}
				$scope.$apply();
			});
		}
	};
	$scope.keyPress = function($event) {
		if($event.keyCode === 13) {
			$scope.connect();
		}
	};
}]);
