var LoginModalCtrl = function ($scope, $modalInstance, $modal, HttpService ,items, $routeParams, $location, $http) {
  console.log('hello from login');
  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };
  $scope.ok = function () {

    $http.post(HttpService.getSocket() + 'login', {"user": $("#username").val(),
  "pass": $("#password").val() }).
    success(function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      
      console.log("success");

      HttpService.setUserobj(data);
      if($("#username").val() == "admin")
      {
        console.log("admin mode!");
        $location.path("/admin/");
        //$scope.$apply();
      }
    else 
    {
      console.log("user mode!");
        $location.path("/user/");
    }
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log("No such User");
    }); 


    
    console.log($("#username").val());
    console.log($("#password").val());

    

    

    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.keyPress = function($event) {
    if($event.keyCode === 13) {
      $scope.ok();
    }
    
  }
};