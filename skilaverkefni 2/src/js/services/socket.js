app.factory("SocketService", ["$http", function($http) {

	// Socket service, maintaining arrays, names, socket etc between scopes
	// Getters, setters and deleters and an added in boolean function for 
	// looking through the array

	var username = "";
	var socket;
	var rooms = [];
	var privChat = {users: [], chatitem: []};
	var chatitem = [];
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
				if(rooms[i] === theRoom)
				{
					return true;
				}
				
			}
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
		setChatitem: function(chat){
			chatitem.push(chat);
		},
		getChatitem: function(){
			return chatitem;
		},
		chatExists: function(theUser){
			for (var i = privChat.length - 1; i >= 0; i--) {
				if(privChat[i] === theUser)
				{
					return true;
				}
				
			}
			return false;
		},
	};
}]);