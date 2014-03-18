'use strict';

describe('Controller: UserController', function () {

  // load the controller's module
  beforeEach(module('skilaverkefni3App'));

  // Initialize the controller and a mock scope
  var UserCtrl, scope, q, deferred, mockService, rootScope, fakeModal, mockData, httpBackend, location; 

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
      },
      getCourseTeacher: function(course, semester){
        deferred = q.defer();
        deferred.resolve(mockData);
        return deferred.promise;
      },
      postCourseEvaluation: function(course, semester){
        deferred = q.defer();
        deferred.resolve(mockData);
        return deferred.promise;
      },
      getCourseEvaluation: function(course, semester){
        deferred = q.defer();
        deferred.resolve(mockData);
        return deferred.promise;
      },

    };

    module(function($provide){
      $provide.value('EvalService', mockService);
    });

    inject(function ($controller, $rootScope, $q, $httpBackend, $location) {
    scope = $rootScope.$new();
    rootScope = $rootScope;
    q = $q;
    location = $location;
    httpBackend = $httpBackend;
    httpBackend.when("GET", "http://dispatch.hir.is/h01/api/v1/my/evaluations").respond({data: {data1: 'data1', data2: 'data2'}});
    //httpBackend.when("GET", "http://dispatch.hir.is/h01/api/v1/my/evaluations").respond(404,'error object');
    httpBackend.when("GET", "http://dispatch.hir.is/h01/api/v1/my/courses").respond({data: {data1: 'data1', data2: 'data2'}});
    
    
    UserCtrl = $controller('UserController', {
      $scope: scope,
      $rootScope: rootScope

      });
    rootScope.$apply();
    });

    

  });
  it('should get all evaluations', function(){
    expect(scope.evaluations).toEqual(mockData);
  });
  it('should get course evaluations', function(){
    expect(scope.teachers).toEqual(mockData);
  });

  it('should post evaluations', function(){
    scope.posteval();
    scope.$apply();
    expect(scope.evaluations1).toEqual(mockData);
  });

  it('should get evaluations', function(){
    scope.geteval();
    scope.$apply();
    expect(scope.evaluations).toEqual(mockData);
  });

  it('should get all evaluations for student', function(){
    httpBackend.flush();
    expect(scope.myEval).toEqual(mockData);
  });

  it('should get all courses for student', function(){
    httpBackend.flush();
    expect(scope.courses).toEqual(mockData);
  });

  it('should redirect to an evaluation', function(){
    scope.answerEval(1);
    expect(location.path()).toBe('/answerEval/1');
  })

});
