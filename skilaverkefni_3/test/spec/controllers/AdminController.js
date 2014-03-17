'use strict';

describe('Controller: AdminController', function () {

  // load the controller's module
  beforeEach(module('skilaverkefni3App'));

  var AdminCtrl, scope, q, deferred, mockService, rootScope, fakeModal, modal; 

  beforeEach(function(){

    fakeModal = {
    result: {
        then: function(confirmCallback, cancelCallback) {
            //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
            this.confirmCallBack = confirmCallback;
            this.cancelCallback = cancelCallback;
        }
    },
    close: function( item ) {
        //The user clicked OK on the modal dialog, call the stored confirm callback with the selected item
        this.result.confirmCallBack( item );
    },
    dismiss: function( type ) {
        //The user clicked cancel on the modal dialog, call the stored cancel callback
        this.result.cancelCallback( type );
    }

    
};

    mockService = {
      getAllEvaluations: function(){
        deferred = q.defer();
        return deferred.promise;
      },
      getAllEvaluationTemplates: function(){
        deferred = q.defer();
        return deferred.promise;
      },

    };

    module(function($provide){
      $provide.value('EvalService', mockService);
    });

    inject(function ($controller, $rootScope, $q, _$modal_) {
    scope = $rootScope.$new();
    rootScope = $rootScope;
    q = $q;

    
    AdminCtrl = $controller('AdminController', {
      $scope: scope,
      $rootScope: rootScope,
      $modal: _$modal_

      });
    rootScope.$apply();
    });

  });

  it('should get all evaluations', function(){

    var mockData = { data: {data1: 'data1', data2: 'data2'}};

    spyOn(mockService, 'getAllEvaluations').andCallFake(function(){
      return mockData;
    });
    var test = mockService.getAllEvaluations();
    deferred.resolve(mockData);
    rootScope.$apply();
    console.log('Get all evaluations '+ scope.evaluations);
    expect(scope.evaluations).toEqual(mockData);

  });

  it('should get all evaluationtemplates', function(){

    var mockData = { data: {data1: 'data1', data2: 'data2'}};

    spyOn(mockService, 'getAllEvaluationTemplates').andCallFake(function(){
      return mockData;
    });
    var test = mockService.getAllEvaluationTemplates();
    deferred.resolve(mockData);
    rootScope.$apply();
    console.log('get all evaluation templates ' + scope.evaluationtemplates);
    expect(scope.evaluationtemplates).toEqual(mockData);

  });

  it('should attach a show success when modal login returns success response', function () {
    //expect(scope.items).toEqual(['item1', 'item2', 'item3']);
    spyOn($modal, 'open').andReturn(fakeModal);
    // Mock out the modal closing, resolving with a selected item, say 1
    scope.open(); // Open the modal
    scope.modalInstance.close('item1');
    expect(scope.selected).toEqual('item1'); // No dice (scope.selected) is not defined accroding to Jasmine.
  });
  

  // Initialize the controller and a mock scope
  

  
}); // END OF FILE
