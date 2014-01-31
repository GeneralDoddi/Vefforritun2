

$(function() {
	
	function init() {

		currentTool = eval('Pencil');
		createNewTool(currentTool);

		ctx.lineWidth = 1;
		ctx.color = 'black';

		var param = {
            "user": "thordurt12",
            "template": true
        };

        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            url: "http://whiteboard.apphb.com/Home/GetList",
            data: param,
            dataType: "jsonp",
            crossDomain: true,
            success: function (data) {
            	var drawings = document.getElementById('drawings');

            	for(var i = 0; i < data.length; ++i){
                	var loaditems = data[i].ID;
                	var selectname = document.createTextNode(data[i].WhiteboardTitle);
                	var newoption = document.createElement('option');
                	newoption.value = loaditems;

                	drawings.appendChild(newoption);
                	newoption.appendChild(selectname);

                }
            },
            error: function (xhr, err) {
                alert("error:\n" + xhr + "\n" + err);
            }
        });
	}

	var canvas = document.getElementById("c");
	var ctx = canvas.getContext("2d");
	var message = document.getElementById("textBox").value;
	var isDrawing = false;
	var isText = false;
	var test;
	var currentTool = undefined;
	var currentToolType = undefined;

	var undo = [];
	var redo = []; 
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
			undo.splice(i);
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
			//shapes[i].draw(ctx);
			console.log(shapes[i].name)
		}
	}
	function updateText (e) {
		// body...function textBoxChanged(e) {
		Text.addPoint()
	
	}

	function setSize(size) {


		ctx.lineWidth = size; 
	}
	
	$("#undo").on("click", function(e) {
		if(!shapes[0] && undo[0]){
			console.log('draw first');
		}
		else{
			undo.push(shapes.pop());
			console.log(undo);
			clearWindow();
			drawShapes();
		}
	});
	$("#clearButton").on("click", function(e) {
		clearSlate();
	});
	
	$("#drawShapes").on("click", function(e) {
		if(!undo[0]){
			console.log('draw first');
		}
		else{
			shapes.push(undo.pop());
			drawShapes();
		}
	});


	$(".size").change(function(){

		setSize(this.value);
	});
	init();

	$("#save").on("click", function(e){
			var title = prompt('Name your painting');
			var stringifiedArray = JSON.stringify(shapes);
			var param = { "user": "thordurt12", // You should use your own username!
				"name": title,
				"content": stringifiedArray,
				"template": true
			}
			console.log(param);

 			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8",
				url: "http://whiteboard.apphb.com/Home/Save",
				data: param,
				dataType: "jsonp",
				crossDomain: true,
				success: function (data) {
					// The save was successful...
					console.log(data);
				},
				error: function (xhr, err) {
					// Something went wrong...
					console.log('failed');
				}
			});

	});
	$("#load").on("click", function(e){
			var param = {  
				"id": $('#drawings').val()
			}
			console.log(param);
		$.ajax({

			type: "GET",
			url: "http://whiteboard.apphb.com/Home/GetWhiteboard",
			data: param,
			dataType: "jsonp",
			crossDomain: true,
			success: function(data){
				var items = JSON.parse(data.WhiteboardContents);
				for (var i = 0; i < items.length; i++){
						items[i].name
						console.log(testing);
						shapes.push(items[i]);
						drawShapes();
						console.log(shapes)

				}
				
			},
			error: function(){
				console.log('fail');
			}
		})
		

	});
	
});