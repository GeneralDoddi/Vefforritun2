var EvaluationCtrl = function($scope, modalInstance, $modal, items){
	console.log('Creating a new evaluation!');

	$scope.addQ = function(){
	console.log('addQ');
	$("#questions").load("app/qHeader.html");

	}
};

$scope.finish = function(){


};

function addQ (){
	console.log('addQ');
	$("#questions").load("app/qHeader.html");

	}
