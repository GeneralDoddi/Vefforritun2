app.service('HttpService', function Httpservice($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var username;
    var userobject = [];
    var socket = "http://dispatch.hir.is/h01/api/v1/"; //http://project3api.haukurhaf.net/api/v1/
    var courses = [];
    var token;
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
    	},
    	getToken: function(){
    		return userobject.Token;
    	},
    	setCourses: function(allcourses){
    		courses = allcourses;

    	},
    	getCourses: function(){
    		return courses;
    	}
    }
  });
