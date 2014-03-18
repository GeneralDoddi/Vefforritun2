'use strict';

describe('LoginModalCtrl', function () {

  // load the controller's module
  beforeEach(module('skilaverkefni3App'));

  var LoginCtrl,scope, q, deferred, rootScope, mockData, mockService, modalInstance, Modal;

  beforeEach(function(){

  	mockData = { data: {data1: 'data1', data2: 'data2'}};

  	inject(function ($controller, $rootScope, items) {
    scope = $rootScope.$new();
    rootScope = $rootScope;
    //Modal = $injector.get('modalInstance');
    //q = $q;
    //modalInstance = $modalInstance;
    
    //modalInstance = $modalInstance;

    LoginCtrl = $controller('LoginModalCtrl', {
      $scope: scope,
      $rootScope: rootScope,
      items: items
      //$modal: Modal,
      //$modalInstance: $modalInstance

  	 });
      rootScope.$apply();
    }); // end of before
  });

  


}); // 