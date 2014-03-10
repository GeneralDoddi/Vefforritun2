'use strict';

describe('Controller: Admin2Ctrl', function () {

  // load the controller's module
  beforeEach(module('skilaverkefni3App'));

  var Admin2Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Admin2Ctrl = $controller('Admin2Ctrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
