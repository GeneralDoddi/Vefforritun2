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
		partRoom: function(theRoom){
			rooms.splice(rooms.indexOf(theRoom),1);
		}
	};
}]);