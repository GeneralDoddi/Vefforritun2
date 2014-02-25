
var ModalInstanceCtrl = function ($scope, $modalInstance, roomList, socket, SocketService) {

  $scope.roomName = "";
  $scope.roomList = SocketService.getRoom();
  $scope.input = {};

  $scope.createRoom = function (){
    

    socket.emit("joinroom", { room: $scope.roomname, pass: "" }, function(success, errorMessage) {
      if(SocketService.roomExists($scope.input.roomName) === false){
          SocketService.setRoom($scope.input.roomName);
          $location.path("/room/"+$scope.input.roomName);

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
