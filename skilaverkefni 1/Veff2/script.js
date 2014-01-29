$(function() {
	
	var canvas = document.getElementById("c");
	var ctx = canvas.getContext("2d");
	
	var isDrawing = false;

	var undo = [];
	var redo = []; 
	var shapes = [];
	var currentTool = undefined;

	// Pen = 0, Rectangle = 1
	var currentToolType = 0;

	$("#penTool").on("click", function() {
		currentToolType = 0;
		console.log("Selecting pen tool!");
	})

	$("#rectangleTool").on("click", function() {
		currentToolType = 1;
		console.log("Selecting rectangle tool!");
	})
	
	$("#lineTool").on("click", function() {
		currentToolType = 2;
		console.log("Selecting line tool!");
	})
	
	$("#circleTool").on("click", function() {
		currentToolType = 3;
		console.log("Selecting circle tool!");
	})

	function createNewTool() {
		if(currentToolType === 0) {
			return new Pencil();
		}
		else if(currentToolType === 1) {
			return new Rect();
		}
		else if(currentToolType === 2) {
			return new Line();
		}
		else if(currentToolType === 3) {
			return new Circle();
		}
	}
	
	canvas.onmousedown = function(e) {
		currentTool = createNewTool();
	
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