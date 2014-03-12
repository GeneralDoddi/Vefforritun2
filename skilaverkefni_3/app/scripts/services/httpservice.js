app.service('HttpService', function Httpservice() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var username;
    var userobject = [];
    var socket = "http://project3api.haukurhaf.net/api/v1/";
    return {
    	getUsername: function(){
    		return userobject.Username;
    	},
    	getSocket: function(){
    		return socket;
    	},
    	setUserobj: function(userobj){	
    		userobject = userobj;
    	},
    	getUserobj: function(){
    		return userobject.User;
    	}
    }
  });
