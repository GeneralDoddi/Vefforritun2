
var ModalInstanceCtrl = function ($scope, $modalInstance, roomList, socket, SocketService) {

  $scope.roomName = "";
  $scope.roomList = SocketService.getRoom();
  $scope.input = {};

  $scope.createRoom = function (){
    
    console.log("Creating a new room");
    console.log($scope.input.abc);
    socket.emit("joinroom", { room: $scope.roomname, pass: "" }, function(success, errorMessage) {
      if(SocketService.roomExists($scope.input.abc) === false){
          SocketService.setRoom($scope.input.abc);

          console.log("accepted");
          $scope.$apply();
        }
      $modalInstance.dismiss();
    });
  };
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};
