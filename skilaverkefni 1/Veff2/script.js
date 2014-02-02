

$(function() {
	
	function init() {

		//Upphafsstillingar síðunnar skilgreindar, penni gerður að byrjunartólinu, svartur litur staðfestur og sóttar allar vistaðar teikningar.

		currentTool = eval('Pencil');
		createNewTool(currentTool);

		ctx.lineWidth = 1;
		ctx.color = 'black';
		c.style.cursor = 'crosshair';
		document.getElementById("color").value="000000";

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

	//global breytur skilgreindar

	var canvas = document.getElementById("c");
	var ctx = canvas.getContext("2d");
	//var message = document.getElementById("textBox").value;
	var isDrawing = false;
	var isText = false;
	var test;
	var currentTool = undefined;
	var currentToolType = undefined;
	var undo = [];
	var shapes = [];
	var currentToolType = "Pen";
	
	// hjálparfall Jquery kóðans til að skilgreina currentToolType, ef þetta er ekki til staðar vistast ekki tólið sem er í notkun

	function createNewTool(derp) {

		currentToolType = derp;		
	}

	//Jquery skipun til að sækja gildi tólsins sem valið er eftir mouseclick á viðeigandi button.

	$(".buttons").click(function(){
	
		var test = this.id;
		if(test === "Text")
		{
			isText = true;
		}
		var currentToolType = eval(test);
		createNewTool(currentToolType);
	});

	// teiknar á canvasinn með mouse down skipun
	
	canvas.onmousedown = function(e) {
		
		currentTool = new currentToolType();
		
		
		isDrawing = true;
		
		var x = e.clientX - this.offsetLeft;
		var y = e.clientY - this.offsetTop;
		
		var point = new Point(x, y);
		currentTool.addPoint(point);
		
		//sér tilgreint ef um texta er að ræða (texti er notaður sem stimpill)

		if(isText){
			drawShapes();
			currentTool.draw(ctx);
			
		}
	}

		// sér um að teikna og uppfæra hnit þegar músin hreyfist
	
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
		// vistar teikningu inni í fylki þegar músartakkanum er lyft.
	
	canvas.onmouseup = function(e) {
		isDrawing = false;
		shapes.push(currentTool);
		
	}

		//Reset fall fyrir canvasinn. Þetta tæmir öll array og byrjar upp á nýtt

	function clearSlate() {
		for(var i = 0; i < shapes.length; i++) {
			shapes.splice(i);
			undo.splice(i);
		}
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.beginPath();
	}

		//sér um að eyða út gömlum lituðum hnitum til að tryggja að shapeið verði ekki litað mörgum sinnum á meðan viðeigandi stærð er fundin á shapeinu
	
	function clearWindow() {
		
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.beginPath();

	}

		//Teiknar formin sem eru vistuð í arrayinu
	
	function drawShapes() {
		for(var i = 0; i < shapes.length; ++i) {
			shapes[i].draw(ctx);

		}
	}

		// Jquery skipun sem annast undo, með jaðartilviki ef ekkert er í arrayinu, ef arrayið er ekki tómt þá er flutt úr shapes arrayinu yfir í undo arrayið og teiknað upp á nýtt

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

		//Jquery með clear canvas

	$("#clearButton").on("click", function(e) {
		clearSlate();
	});

		//Jquery skipun fyrir redraw, með jaðartilviki ef undo arrayið er tómt, pushar staki úr undo yfir í shapes til að redoa
	
	$("#drawShapes").on("click", function(e) {
		if(!undo[0]){
			console.log('draw first');
		}
		else{
			shapes.push(undo.pop());
			drawShapes();
		}
	});


	// startar initialise fallinu
	init();

	// Jquery skipun sem annast vistun, kóði úr sýnidæmi í verkefninu er nýttur 

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
				},
				error: function (xhr, err) {
					// Something went wrong...
					console.log('failed');
				}
			});

	});

	// Jquery skipun sem annast að teikna upp vistaða mynd. Clearar canvasinn af því sem teiknað hefur verið fyrir, bitar niður stringified strenginn, redefinear prototype af objectinu sem sent er til baka
	// og hleður því inn í array og teiknar svo.

	$("#load").on("click", function(e){
			var param = {  
				"id": $('#drawings').val()
			}
		$.ajax({

			type: "GET",
			url: "http://whiteboard.apphb.com/Home/GetWhiteboard",
			data: param,
			dataType: "jsonp",
			crossDomain: true,
			success: function(data){
				clearSlate();
				var items = JSON.parse(data.WhiteboardContents);
				for (var i = 0; i < items.length; i++){

						var testing = eval(items[i].name);
						console.log(testing);
						items[i].__proto__ = testing.prototype;
						shapes.push(items[i]);
						drawShapes();

				}
				
			},
			error: function(){
				console.log('fail');
			}
		})
	});
});