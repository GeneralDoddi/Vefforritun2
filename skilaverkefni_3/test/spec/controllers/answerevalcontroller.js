'use strict';

describe('Controller: AnswerevalcontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('skilaverkefni3App'));

  var AnswerevalcontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AnswerevalcontrollerCtrl = $controller('AnswerevalcontrollerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
