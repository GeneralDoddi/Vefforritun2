'use strict';

describe('Service: HttpService', function () {

  // load the service's module
  beforeEach(module('skilaverkefni3App'));

  
  // instantiate service
  var Httpservice, mockData, mockService ;
  beforeEach(inject(function (_HttpService_) {
      Httpservice = _HttpService_
    }));

  

  it('should be possible to get and set username',function(){

    var rasstest = {User: 'data2'};
    Httpservice.setUserobj(rasstest);
    expect(Httpservice.getUserobj()).toBe('data2');
  });

  it('should be possible to get and set username', function(){
    var rasstest = {Username: 'data2'};
    Httpservice.setUserobj(rasstest);
    expect(Httpservice.getUsername()).toBe('data2');
  });

  it('should be possible to get and set courses', function(){

    var rasstest = 'drasl';
    Httpservice.setCourses(rasstest);
    expect(Httpservice.getCourses()).toBe('drasl');

  });

});

/*it('should get myEval', inject(function (StudentFactory, $httpBackend, API) {
    $httpBackend.expect('GET', API + '/my/evaluations').respond(404, 'Error');

    StudentFactory.getMyEval().then(function(data) {
      expect(data.status).toBe(404);
    });

    $httpBackend.flush();

    mockData = { data: {Username: 'data1', User: 'data2', Token: 'data3'}};
  }));*/