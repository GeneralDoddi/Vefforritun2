
var ModalInstanceCtrl = function ($scope, $modalInstance, roomList, socket, SocketService) {

  $scope.roomName = "";
  $scope.roomList = roomList;
  $scope.input = {};
  
  $scope.createRoom = function (){
    
    console.log("Creating a new room");
    console.log($scope.input.abc);
    socket.emit("joinroom", { room: $scope.roomname, pass: "" }, function(success, errorMessage) {
      if(SocketService.roomExists($scope.input.abc) === false){
          SocketService.setRoom($scope.input.abc);
          console.log("accepted");
          $location.path("/room/"+chatMsg[1]);
        }
      $modalInstance.dismiss();
    });
  };
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};
