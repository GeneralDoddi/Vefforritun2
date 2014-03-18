app.controller('MainCtrl', function ($scope,$modal,$log) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
	
    $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function () {
  	console.log("hello from modal");
    $scope.modalInstance = $modal.open({

      templateUrl: 'views/login.html',
      controller: "LoginModalCtrl",
      backdrop: "static",
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });
    $scope.modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $scope.canceled = true;
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
});
  
