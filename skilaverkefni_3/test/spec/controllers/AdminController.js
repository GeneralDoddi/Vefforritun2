'use strict';

describe('Controller: AdminController', function () {

  // load the controller's module
  beforeEach(module('skilaverkefni3App'));

  var AdminCtrl, scope, q, deferred, mockService, rootScope, fakeModal, modal; 

  beforeEach(function(){

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


  // Initialize the controller and a mock scope
  

  
}); // END OF FILE
