

$(function() {
	
	var canvas = document.getElementById("c");
	var ctx = canvas.getContext("2d");
	var message = document.getElementById("textBox").value;
	var isDrawing = false;
	var isText = false;
	var test;
	var currentTool = undefined;
	var currentToolType = undefined;
	var undo = [];
	var shapes = [];
	var currentToolType = "Pen";

	function createNewTool(derp) {

		currentToolType = derp;		
	}

	$(".buttons").click(function(){
	
		var test = this.id;
		if(test === "Text")
		{
			isText = true;
		}
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
		
		if(isText){
			drawShapes();
			currentTool.draw(ctx);
			
		}
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

	function clearSlate() {
		for(var i = 0; i < shapes.length; i++) {
			shapes.splice(i);
		}
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.beginPath();
	}
	
	function clearWindow() {
		
		//console.log(shapes);
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.beginPath();

	}
	
	function drawShapes() {
		for(var i = 0; i < shapes.length; ++i) {
			shapes[i].draw(ctx);
		}
	}
	function textFillColorChanged(e) {
      var target = e.target;
      textFillColor = "#" + target.value;
      drawScreen();
   }
	
	$("#undo").on("click", function(e) {
		undo.push(shapes.pop());
		console.log(undo);
		clearWindow();
		drawShapes();
	});
	$("#clearButton").on("click", function(e) {
		clearSlate();
	});
	
	$("#drawShapes").on("click", function(e) {
		shapes.push(undo.pop());
		drawShapes();
	});


	
});