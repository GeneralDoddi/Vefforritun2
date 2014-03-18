'use strict';

describe('Service: EvalService', function () {

  // load the service's module
  beforeEach(module('skilaverkefni3App'));

  // instantiate service
  var EvalService, socket;

  //socket = "http://dispatch.hir.is/h01/api/v1/";
  beforeEach(inject(function (_EvalService_) {
    EvalService = _EvalService_,
    socket = "http://dispatch.hir.is/h01/api/v1/"
  }));

  /*it('should do something', function () {
    expect(!!EvalService).toBe(true);
  });*/

  it('should get get all evaluations', inject(function(EvalService, $httpBackend){

    $httpBackend.expect('GET', socket + 'evaluations').respond({data: 200});

    EvalService.getAllEvaluations().then(function(data){
        expect(data.data).toBe(200);
    });
    $httpBackend.flush();

  }));
  it('should get fail all evaluations', inject(function(EvalService, $httpBackend){

    $httpBackend.expect('GET', socket + 'evaluations').respond(404,'Error');

    EvalService.getAllEvaluations().then(function(data){
        expect(data.status).toBe(404);
    });
    $httpBackend.flush();

  }));

  it('should get get all getEvaluationById', inject(function(EvalService, $httpBackend){

    $httpBackend.expect('GET', socket + 'evaluations/1').respond({data: 200});

    EvalService.getEvaluationById(1).then(function(data){
        expect(data.data).toBe(200);
    });
    $httpBackend.flush();

  }));
  it('should get fail all getEvaluationById', inject(function(EvalService, $httpBackend){

    $httpBackend.expect('GET', socket + 'evaluations/1').respond(404,'Error');

    EvalService.getEvaluationById(1).then(function(data){
        expect(data.status).toBe(404);
    });
    $httpBackend.flush();

  }));

  it('should get post addEvaluation', inject(function(EvalService, $httpBackend){

    $httpBackend.expect('POST', socket + 'evaluations').respond({data: 200});

    EvalService.addEvaluation({}).then(function(data){
        expect(data.data).toBe(200);
    });
    $httpBackend.flush();

  }));
  it('should get fail addEvaluation', inject(function(EvalService, $httpBackend){

    $httpBackend.expect('POST', socket + 'evaluations').respond(404,'Error');

    EvalService.addEvaluation({}).then(function(data){
        expect(data.status).toBe(404);
    });
    $httpBackend.flush();

  }));

  it('should get getAllEvaluationTemplates', inject(function(EvalService, $httpBackend){

    $httpBackend.expect('GET', socket + 'evaluationtemplates').respond({data: 200});

    EvalService.getAllEvaluationTemplates().then(function(data){
        expect(data.data).toBe(200);
    });
    $httpBackend.flush();

  }));
  it('should get getAllEvaluationTemplates', inject(function(EvalService, $httpBackend){

    $httpBackend.expect('GET', socket + 'evaluationtemplates').respond(404,'Error');

    EvalService.getAllEvaluationTemplates().then(function(data){
        expect(data.status).toBe(404);
    });
    $httpBackend.flush();

  }));

  it('should get getEvaluationTemplateByID', inject(function(EvalService, $httpBackend){

    $httpBackend.expect('GET', socket + 'evaluationtemplates/1').respond({data: 200});

    EvalService.getEvaluationTemplateByID(1).then(function(data){
        expect(data.data).toBe(200);
    });
    $httpBackend.flush();

  }));
  it('should get getEvaluationTemplateByID', inject(function(EvalService, $httpBackend){

    $httpBackend.expect('GET', socket + 'evaluationtemplates/1').respond(404,'Error');

    EvalService.getEvaluationTemplateByID(1).then(function(data){
        expect(data.status).toBe(404);
    });
    $httpBackend.flush();

  }));

  it('should get post postEvaluationTemplate', inject(function(EvalService, $httpBackend){

    $httpBackend.expect('POST', socket + 'evaluationtemplates').respond({data: 200});

    EvalService.postEvaluationTemplate({}).then(function(data){
        expect(data.data).toBe(200);
    });
    $httpBackend.flush();

  }));
  it('should get fail postEvaluationTemplate', inject(function(EvalService, $httpBackend){

    $httpBackend.expect('POST', socket + 'evaluationtemplates').respond(404,'Error');

    EvalService.postEvaluationTemplate({}).then(function(data){
        expect(data.status).toBe(404);
    });
    $httpBackend.flush();

  }));

  it('should get getCourseTeacher', inject(function(EvalService, $httpBackend){

    $httpBackend.expect('GET', socket + 'courses/T-WEPO-1337/S2014/teachers').respond({data: 200});

    EvalService.getCourseTeacher('T-WEPO-1337', 'S2014').then(function(data){
        expect(data.data).toBe(200);
    });
    $httpBackend.flush();

  }));
  it('should get getCourseTeacher', inject(function(EvalService, $httpBackend){

    $httpBackend.expect('GET', socket + 'courses/T-WEPO-1337/S2014/teachers').respond(404,'Error');

    EvalService.getCourseTeacher('T-WEPO-1337', 'S2014').then(function(data){
        expect(data.status).toBe(404);
    });
    $httpBackend.flush();

  }));

  it('should get getCourseEvaluation', inject(function(EvalService, $httpBackend){

    $httpBackend.expect('GET', socket + 'courses/T-WEPO-1337/S2014/evaluations/1').respond({data: 200});

    EvalService.getCourseEvaluation('T-WEPO-1337', 'S2014', 1).then(function(data){
        expect(data.data).toBe(200);
    });
    $httpBackend.flush();

  }));
  it('should get getCourseEvaluation', inject(function(EvalService, $httpBackend){

    $httpBackend.expect('GET', socket + 'courses/T-WEPO-1337/S2014/evaluations/1').respond(404,'Error');

    EvalService.getCourseEvaluation('T-WEPO-1337', 'S2014', 1).then(function(data){
        expect(data.status).toBe(404);
    });
    $httpBackend.flush();

  }));

  it('should get post postCourseEvaluation', inject(function(EvalService, $httpBackend){

    $httpBackend.expect('POST', socket + 'courses/T-WEPO-1337/S2014/evaluations/1').respond({data: 200});

    EvalService.postCourseEvaluation('T-WEPO-1337', 'S2014', 1,{}).then(function(data){
        expect(data.data).toBe(200);
    });
    $httpBackend.flush();

  }));
  it('should get fail postCourseEvaluation', inject(function(EvalService, $httpBackend){

    $httpBackend.expect('POST', socket + 'courses/T-WEPO-1337/S2014/evaluations/1').respond(404,'Error');

    EvalService.postCourseEvaluation('T-WEPO-1337', 'S2014', 1,{}).then(function(data){
        expect(data.status).toBe(404);
    });
    $httpBackend.flush();

  }));

  it('should get myCourses', inject(function(EvalService, $httpBackend){

    $httpBackend.expect('GET', socket + 'my/courses').respond({data: 200});

    EvalService.myCourses().then(function(data){
        expect(data.data).toBe(200);
    });
    $httpBackend.flush();

  }));
  it('should get myCourses', inject(function(EvalService, $httpBackend){

    $httpBackend.expect('GET', socket + 'my/courses').respond(404,'Error');

    EvalService.myCourses().then(function(data){
        expect(data.status).toBe(404);
    });
    $httpBackend.flush();

  }));

});

/*it('should get myEval', inject(function (StudentFactory, $httpBackend, API) {
    $httpBackend.expect('GET', API + '/my/evaluations').respond(404, 'Error');

    StudentFactory.getMyEval().then(function(data) {
      expect(data.status).toBe(404);
    });

    $httpBackend.flush();

    mockData = { data: {Username: 'data1', User: 'data2', Token: 'data3'}};
  }));*/