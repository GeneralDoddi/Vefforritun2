'use strict';

describe('Controller: EvaluationController', function () {

  // load the controller's module
  beforeEach(module('skilaverkefni3App'));

  var EvalCtrl, scope, q, deferred, mockService, rootScope, fakeModal, mockData, routeParams, element; 

  beforeEach(function(){

    mockData = { data: {data1: 'data1', data2: 'data2'}};

    mockService = {
    	getEvaluationById: function(evalid){
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

    }

    module(function($provide){
      $provide.value('EvalService', mockService);
    });

    inject(function ($controller, $rootScope, $q, $compile) {
    scope = $rootScope.$new();
    rootScope = $rootScope;
    q = $q;
    routeParams = {};
    element = $compile('<input id="cQ" type="radio" name="teacherOrCourse" value="course">')($rootScope);

    
    EvalCtrl = $controller('EvaluationController', {
      $scope: scope,
      $rootScope: rootScope,
      $routeParams: routeParams

      });
    rootScope.$apply();
    });

  });

  it('should test all scope variables', function(){
  	routeParams.evaluationID = undefined;
  	expect(scope.templateid).toBe(1);
  	expect(scope.isWordQuestion).not.toBeTruthy();
  	expect(scope.isSingleQuestion).not.toBeTruthy();
  	expect(scope.isMultiQuestion).not.toBeTruthy();
  	expect(scope.addWordQuestion).not.toBeTruthy();
  	expect(scope.addSingleQuestion).not.toBeTruthy();
  	expect(scope.addMultiQuestion).not.toBeTruthy();
  	expect(scope.showHeaderQ).not.toBeTruthy();
  	expect(scope.showAdditionalInfo).not.toBeTruthy();
  	expect(scope.courses).toBeDefined();
  	expect(scope.userinfo).not.toBeDefined();
  });
  it('should get template by id', inject(function($controller) {

    routeParams.evaluationID = 1;
    EvalCtrl = $controller('EvaluationController', {
      $scope: scope,
      $routeParams: routeParams

    });
    mockService.getEvaluationById(1);
    scope.$apply();
    expect(scope.evaluation).toBe(mockData);
  }));

  it('should resolve addQ if statement', function(){
  	scope.isWordQuestion = true;
  	scope.addQ();
  	expect(scope.showHeaderQ).toBeTruthy();
  	expect(scope.showAdditionalInfo).not.toBeTruthy();
  });
  it('should resolve addQ else if statement', function(){
  	scope.isSingleQuestion = true;
  	scope.addQ();
  	expect(scope.showHeaderQ).toBeTruthy();
  	expect(scope.showAdditionalInfo).toBeTruthy();
  });
  it('should resolve addQ else if statement', function(){
  	scope.isMultiQuestion = true;
  	scope.addQ();
  	expect(scope.showHeaderQ).toBeTruthy();
  	expect(scope.showAdditionalInfo).toBeTruthy();
  });
  it('should resolve addQ else statement', function(){
  	
  	scope.addQ();
  	expect(scope.showHeaderQ).not.toBeTruthy();
  	expect(scope.showAdditionalInfo).not.toBeTruthy();
  });

  it('should resolve addImage', function(){
  	scope.addImage();
  	expect(scope.img).not.toBeDefined();
  });

  it('should resolve submitQ', function(){
  	scope.addWordQuestion = true;
  	scope.submitQ();
  	expect(scope.xType).toEqual('text');
  });
  it('should resolve submitQ', function(){
  	scope.addSingleQuestion = true;
  	scope.submitQ();
  	expect(scope.xType).toEqual('single');
  });

  it('should resolve submitQ', function(){
  	scope.addMultiQuestion = true;
  	scope.submitQ();
  	expect(scope.xType).toEqual('multiple');
  });

 it('should resolve saveTemplate', function(){

 	scope.saveTemplate();
	mockService.postEvaluationTemplate({});
    scope.$apply();
    expect(scope.evaluationtemplatesID).toBe(mockData);
 });

 it('should resolve saveEvaluation', function(){
 	scope.saveEvaluation();
 	mockService.addEvaluation({});
    scope.$apply();
    expect(scope.addedEvaluation).toBe(mockData);
 });
  


}); //END OF FILE

		//var evaluationID = $routeParams.evaluationID;

		/*$scope.templateid = 1;

		$scope.isWordQuestion = false;
		$scope.isSingleQuestion = false;
		$scope.isMultiQuestion = false;

		$scope.addWordQuestion = false;
		$scope.addSingleQuestion = false;
		$scope.addMultiQuestion = false;

		$scope.showHeaderQ = false;
		$scope.showAdditionalInfo = false;
		$scope.courses = [];

		$scope.userinfo = HttpService.getUserobj();*/

