'use strict';

describe('Service: Httpservice', function () {

  // load the service's module
  beforeEach(module('skilaverkefni3App'));

  // instantiate service
  var Httpservice;
  beforeEach(inject(function (_Httpservice_) {
    Httpservice = _Httpservice_;
  }));

  it('should do something', function () {
    expect(!!Httpservice).toBe(true);
  });

});
