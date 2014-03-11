'use strict';

describe('Controller: EvaluationcontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('skilaverkefni3App'));

  var EvaluationcontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EvaluationcontrollerCtrl = $controller('EvaluationcontrollerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
