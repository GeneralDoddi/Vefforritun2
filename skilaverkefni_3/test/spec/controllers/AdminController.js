'use strict';

describe('Controller: AdminController', function () {

  // load the controller's module
  beforeEach(module('skilaverkefni3App'));

  var AdminCtrl, scope, q, deferred, mockService, rootScope, fakeModal, mockData; 

  beforeEach(function(){

    mockData = { data: {data1: 'data1', data2: 'data2'}};

    mockService = {
      getAllEvaluations: function(){
        deferred = q.defer();
        deferred.resolve(mockData);
        return deferred.promise;
      },
      getAllEvaluationTemplates: function(){
        deferred = q.defer();
        deferred.resolve(mockData);
        return deferred.promise;
      },
      myCourses: function(){
        deferred = q.defer();
        deferred.resolve(mockData);
        return deferred.promise;
      },
      getEvaluationTemplateByID: function(id){
        deferred = q.defer();
        deferred.resolve(mockData);
        return deferred.promise;
      },
      postEvaluationTemplate: function(object){
        deferred = q.defer();
        deferred.resolve(mockData);
        return deferred.promise;
      },
      addEvaluation: function(){
        deferred = q.defer();
        deferred.resolve(mockData);
        return deferred.promise;
      }

    };

    module(function($provide){
      $provide.value('EvalService', mockService);
    });

    inject(function ($controller, $rootScope, $q) {
    scope = $rootScope.$new();
    rootScope = $rootScope;
    q = $q;

    
    AdminCtrl = $controller('AdminController', {
      $scope: scope,
      $rootScope: rootScope

      });
    rootScope.$apply();
    });

  });

  it('should get all evaluations', function(){

    spyOn(mockService, 'getAllEvaluations').andCallFake(function(){
      return mockData;
    });
    var test = mockService.getAllEvaluations();
    deferred.resolve(mockData);
    //rootScope.$apply();
    //console.log('Get all evaluations '+ scope.evaluations);
    expect(scope.evaluations).toEqual(mockData);

  });

  it('should get all evaluationtemplates', function(){

    spyOn(mockService, 'getAllEvaluationTemplates').andCallFake(function(){
      return mockData;
    });
    var test = mockService.getAllEvaluationTemplates();
    deferred.resolve(mockData);
    //rootScope.$apply();
    //console.log('get all evaluation templates ' + scope.evaluationtemplates);
    expect(scope.evaluationtemplates).toEqual(mockData);

  });

  it('should get all courses', function(){

    spyOn(mockService, 'myCourses').andCallFake(function(){
      console.log("MOCKDATA");
      return mockData;
    });
    var test = mockService.getAllEvaluationTemplates();
    deferred.resolve(mockData);
    rootScope.$apply();
    //console.log('get all courses ' + scope.courses);
    expect(scope.courses).toEqual(mockData);

  });

  it('should get all templateID', function(){
    scope.TESTCLICK();
    scope.$apply();
    expect(scope.evaluationtemplatesID).toEqual(mockData);
  });

  it('should post an evaluation template', function(){
    scope.TESTCLICK2();
    scope.$apply();
    expect(scope.evaluationtemplatesID).toEqual(mockData);
  });

  it('should add an evaluation', function(){
    scope.TESTCLICK3();
    scope.$apply();
    //console.log(scope.evaluationtemplatesID);
    expect(scope.evaluationtemplatesID).toEqual(mockData);
  });



  


  // Initialize the controller and a mock scope
  

  
}); // END OF FILE
