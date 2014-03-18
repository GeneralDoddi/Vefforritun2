'use strict';

describe('Controller: MainCtrl', function () {

// load the controller's module
beforeEach(module('skilaverkefni3App'));

var MainCtrl,
  scope;

var fakeModal = {
    result: {
        then: function(confirmCallback, cancelCallback) {
            //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
            this.confirmCallBack = confirmCallback;
            this.cancelCallback = cancelCallback;
        }
    },
    close: function( item ) {
        //The user clicked OK on the modal dialog, call the stored confirm callback with the selected item
        this.result.confirmCallBack( item );
    },
    dismiss: function( type ) {
        //The user clicked cancel on the modal dialog, call the stored cancel callback
        this.result.cancelCallback( type );
    }

    
};

beforeEach(inject(function($modal) {
    spyOn($modal, 'open').andReturn(fakeModal);
}));


// Initialize the controller and a mock scope
beforeEach(inject(function ($controller, $rootScope, _$modal_) {
  scope = $rootScope.$new();
  MainCtrl = $controller('MainCtrl', {
    $scope: scope,
    $modal: _$modal_
  });
}));

it('should attach a show success when modal login returns success response', function () {
    expect(scope.items).toEqual(['item1', 'item2', 'item3']);

    // Mock out the modal closing, resolving with a selected item, say 1
    scope.open(); // Open the modal
    scope.modalInstance.close('item1');
    expect(scope.selected).toEqual('item1'); // No dice (scope.selected) is not defined accroding to Jasmine.
  });


it("should cancel the dialog when dismiss is called, and $scope.canceled should be true", function () {
    expect( scope.canceled ).toBeUndefined();

    scope.open(); // Open the modal
    scope.modalInstance.dismiss("cancel"); //Call dismiss (simulating clicking the cancel button on the modal)
    expect( scope.canceled ).toBe( true );
});

}); // END OF FILE

