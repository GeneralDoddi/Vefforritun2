

$(function() {
	
	var canvas = document.getElementById("c");
	var ctx = canvas.getContext("2d");
	
	var isDrawing = false;
	
	var test = '';
	var currentTool = undefined;
	var currentToolType = undefined;

	var undo = [];
	var redo = []; 
	var shapes = [];


	function createNewTool(derp) {

		currentToolType = derp;		
	}

	$(".buttons").click(function(){
	
		var test = this.id;
		var currentToolType = eval(test);
		createNewTool(currentToolType);

		

	});
	
	canvas.onmousedown = function(e) {
		currentTool = new currentToolType();


	
		isDrawing = true;
		
		var x = e.clientX - this.offsetLeft;
		var y = e.clientY - this.offsetTop;
		
		var point = new Point(x, y);
		currentTool.addPoint(point);
	}
	
	canvas.onmousemove = function(e) {
		if(isDrawing) {
			var x = e.clientX - this.offsetLeft;
			var y = e.clientY - this.offsetTop;
			
			var point = new Point(x, y);
			currentTool.addPoint(point);
		
			clearWindow();
			drawShapes();
			currentTool.draw(ctx);
		}
	}
	
	canvas.onmouseup = function(e) {
		isDrawing = false;
		shapes.push(currentTool);
		console.log(shapes);
	}
	
	function clearWindow() {
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.beginPath();
	}
	
	function drawShapes() {
		for(var i = 0; i < shapes.length; ++i) {
			shapes[i].draw(ctx);
		}
	}
	
	$("#undo").on("click", function(e) {
		shapes.pop();
		clearWindow();
		drawShapes();
	});
	$("#clearButton").on("click", function(e) {
		clearWindow();
	});
	
	$("#drawShapes").on("click", function(e) {
		drawShapes();
	});
});