'use strict';

describe('Controller: answerEvalController', function () {

  // load the controller's module
  beforeEach(module('skilaverkefni3App'));

  var evalCtrl, scope, q, deferred, mockService, rootScope, fakeModal, mockData, location; 

  beforeEach(function(){

    mockData = { data: {data1: 'data1', data2: 'data2'}};

    mockService = {
      getEvaluationById: function(id){
        deferred = q.defer();
        deferred.resolve(mockData);
        return deferred.promise;
      },
      getEvaluationTemplateByID: function(id){
        deferred = q.defer();
        deferred.resolve(mockData);
        return deferred.promise;
      }
    };

    module(function($provide){
      $provide.value('EvalService', mockService);
    });

    inject(function ($controller, $rootScope, $q, $location) {
    scope = $rootScope.$new();
    rootScope = $rootScope;
    q = $q;
    location = $location;

    
    evalCtrl = $controller('answerEvalController', {
      $scope: scope,
      $rootScope: rootScope

      });
    rootScope.$apply();
    });
});
    it('should be able to getEvaluationById', function(){

      expect(scope.evaluationTemplate).toEqual(mockData);
    })
    it('should be able to getEvaluationTemplateByID', function(){
      expect(scope.evaluation).toEqual(mockData);
    });
    it('should be able to call questionType', function(){
      var qtype = 'single';
      scope.questionType(qtype);
      //scope.$apply();
      //expect(scope.qType).toEqual('single');
    });
    it('should be able to call if statement of questionType', function(){
      var qtype = 'text';
      scope.questionType(qtype);

    });
    it('should be able to call else statement of questionType', function(){

      var qtype = 'multiple';
      scope.questionType(qtype);

    });


  
});