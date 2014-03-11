'use strict';

describe('Controller: Admin1Ctrl', function () {

  // load the controller's module
  beforeEach(module('skilaverkefni3App'));

  var Admin1Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Admin1Ctrl = $controller('Admin1Ctrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
