app.factory("SocketService", ["$http", function($http) {
	var username = "";
	var socket;
	var rooms = [];
	var privChat = [];
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
		},
		roomExists: function(theRoom){
			for (var i = rooms.length - 1; i >= 0; i--) {
				//console.log(rooms);
				if(rooms[i] === theRoom)
				{
					//console.log("true");
					return true;
				}
				
			}
			//console.log("false");
			return false;
		},
		getPrivchat: function(){
			return privChat;
		},
		setPrivchat: function(theUser){
			privChat.push(theUser);
		},
		exitChat: function(theUser){
			privChat.splice(privChat.indexOf(theUser),1);
		},
		chatExists: function(theUser){
			for (var i = privChat.length - 1; i >= 0; i--) {
				//console.log(rooms);
				if(privChat[i] === theUser)
				{
					//console.log("true");
					return true;
				}
				
			}
			//console.log("false");
			return false;
		},
	};
}]);