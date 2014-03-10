var LoginModalCtrl = function ($scope, $modalInstance, $modal, items, $routeParams, $location) {
  console.log('hello from login');
  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };
  $scope.ok = function () {
    
    console.log($("#username").val());
    console.log($("#password").val());

    if($("#username").val() == "admin")
      {
        console.log("admin mode!");
        $location.path("/admin/");
        //$scope.$apply();
      }
    else if($("#username").val() == "user")
    {
      console.log("user mode!");
    }

    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};