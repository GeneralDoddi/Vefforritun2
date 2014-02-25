
var ModalInstanceCtrl = function ($scope, $modalInstance,$location, roomList, socket, SocketService) {

  $scope.roomName = "";
  $scope.roomList = roomList;
  $scope.input = {};
  
  $scope.createRoom = function (){
    
    console.log("Creating a new room");
    console.log($scope.input.roomName);
    socket.emit("joinroom", { room: $scope.roomname, pass: "" }, function(success, errorMessage) {
      if(SocketService.roomExists($scope.input.roomName) === false){
          SocketService.setRoom($scope.input.roomName);
          console.log("accepted");
          $location.path("/room/"+$scope.input.roomName);

        }
      $modalInstance.dismiss();
    });
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};
