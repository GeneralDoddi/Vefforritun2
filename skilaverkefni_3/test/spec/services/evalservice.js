'use strict';

describe('Service: Evalservice', function () {

  // load the service's module
  beforeEach(module('skilaverkefni3App'));

  // instantiate service
  var Evalservice;
  beforeEach(inject(function (_Evalservice_) {
    Evalservice = _Evalservice_;
  }));

  it('should do something', function () {
    expect(!!Evalservice).toBe(true);
  });

});
