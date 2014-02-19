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