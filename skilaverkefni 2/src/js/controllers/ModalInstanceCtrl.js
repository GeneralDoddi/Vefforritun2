
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
