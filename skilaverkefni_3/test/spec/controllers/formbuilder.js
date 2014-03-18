'use strict';

describe('Controller: FormBuilderController', function () {

  // load the controller's module
  beforeEach(module('skilaverkefni3App'));

  var FormBuilderController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FormBuilderController = $controller('FormBuilderController', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
