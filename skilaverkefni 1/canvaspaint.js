

//if(window.addEventListener) {

	//window.addEventListener('load', function () {

	var canvas;
	var tempcanvas;
	var tool;
	var context;
	var tempcontext;


function init () {

		//default penni til að byrja með

	tool = new tool_pencil();
		//canvasinn og context
	canvas = document.getElementById('paint');
		
	context = canvas.getContext('2d');

		//temp canvas og context

	var container = canvas.parentNode;

	tempcanvas = document.createElement('canvas');


	tempcanvas.id = 'temppaint';
	tempcanvas.width = canvas.width;
	tempcanvas.height = canvas.height;

	container.appendChild(tempcanvas);

	tempcontext = tempcanvas.getContext('2d');

		//fylgist med eventum, ss mouse up, mouse down og mouse move
	tempcanvas.addEventListener('mousedown', ev_canvas, false);
	tempcanvas.addEventListener('mousemove', ev_canvas, false);
	tempcanvas.addEventListener('mouseup', ev_canvas, false);

	canvas.style.cursor = 'crosshair';
	tempcanvas.style.cursor = 'crosshair';

	
}

	// Þegar HTML5 button er clicked er valið shape og pencil
function clicked(id) {
	if(id === 'pencil') {
		tool = new tool_pencil();
	}
	else if(id === 'rect') {
		tool = new tool_rect();
	}
	else if(id === 'line'){
		tool = new tool_line();
	}
	else if(id === 'triangle'){
		tool = new tool_triangle();
	}
	else if(id === 'rtriangle'){
		tool = new tool_rtriangle();
	}
	else if(id === 'circle'){
		tool = new tool_circle();
	}
	else if(id === 'eraser'){
		tool = new tool_eraser();
	}
};

	function img_update() {

	context.drawImage(tempcanvas,0,0);
	tempcontext.clearRect(0,0,tempcanvas.width,tempcanvas.height);
	}


	function tool_pencil() {
	var tool = this;
	this.started = false;



	this.mousedown = function (ev) {

		tempcontext.beginPath();
		tempcontext.moveTo(ev.x, ev.y);
		tool.started = true;

	};

	this.mouseup = function (ev) {

		if (tool.started ) {
			tool.mousemove(ev);
			tool.started = false;
			img_update();
		}
	};

	this.mousemove = function (ev) {

		if(tool.started) {
			ev.x = ev.offsetX + tempcanvas.offsetLeft ;
			ev.y = ev.offsetY + tempcanvas.offsetTop;
			tempcontext.lineTo(ev.x, ev.y);
			tempcontext.stroke();
			
		}
	};
	}
	
	//ferhyrningur
	
	function tool_rect() {

	var tool = this;
	this.started = false;

	this.mousedown = function (ev) {
		tool.started = true;
		tool.startX = ev.x;
		tool.startY = ev.y;
	};

	this.mousemove = function(ev) {

		if(tool.started){
			var x = Math.min(ev.x, tool.startX);
			var y = Math.min(ev.y, tool.startY);
			var w = Math.abs(ev.x - tool.startX);
			var h = Math.abs(ev.y - tool.startY);
			tempcontext.clearRect(0, 0, canvas.width, canvas.height);		// Þessi skipun þarf að vera til staðar til að ferhyrningurinn litar sig ekki endalaust á meðan maður velur stærð
			tempcontext.strokeRect(x,y,w,h);			// teiknifall fyrir ferhyrninginn

		}
		
	};

	this.mouseup = function (ev) {
      if (tool.started) {
        tool.mousemove(ev);
        tool.started = false;
        img_update();
      }
    };

	//console.log("herro");

	};

	function tool_line() {

		var tool = this;
		this.started = false;

		this.mousedown = function (ev) {
			tool.started = true;
			tool.startX = ev.x;
			tool.startY = ev.y;
		};

		this.mousemove = function (ev) {

			if(tool.started) {
				

				tempcontext.clearRect(0,0,tempcanvas.width,tempcanvas.height);

				tempcontext.beginPath();
				tempcontext.moveTo(tool.startX,tool.startY);
				tempcontext.lineTo(ev.x,ev.y);
				tempcontext.stroke();
				tempcontext.closePath();
			}
		};

		this.mouseup = function (ev) {
			if(tool.started){
				tool.mousemove(ev);
				tool.started = false;
				img_update();
			};
		};
	}

	function tool_triangle(ev) {

		var tool = this;
		this.started = false;

		this.mousedown = function (ev) {
			tool.started = true;
			tool.startX = ev.x;
			tool.startY = ev.y;
		}

		this.mousemove = function (ev) {

			if(tool.started){

				var x = Math.min(ev.x, tool.startX);
				var y = Math.min(ev.y, tool.startY);
				var w = ev.x - tool.startX;
				var h = ev.y - tool.startY;
				var p2X = tool.startX + w;
				var p2Y = tool.startY;
				var p3X = tool.startX + (w/2);
				var p3Y = tool.startY + h;  
				tempcontext.clearRect(0,0,tempcanvas.width,tempcanvas.height);

				tempcontext.beginPath();
				tempcontext.moveTo(tool.startX,tool.startY);
				tempcontext.lineTo(p3X,p3Y);
				tempcontext.lineTo(p2X,p2Y);
				tempcontext.lineTo(tool.startX,tool.startY);
				tempcontext.stroke();
				tempcontext.closePath();
			}
		}

		this.mouseup = function (ev) {

			if(tool.started){
				tool.mousemove(ev);
				tool.started = false;
				img_update();
			}
		}
	}

	function tool_rtriangle(ev) {

		var tool = this;
		tool.started = false;

		this.mousedown = function(ev) {
			tool.started = true;
			tool.startX = ev.x;
			tool.startY = ev.y;
		}
		this.mousemove = function(ev) {

			if(tool.started){

				var x = Math.min(ev.x, tool.startX);
				var y = Math.min(ev.y, tool.startY);
				var w = ev.x - tool.startX;
				var h = ev.y - tool.startY;
				var p2X = tool.startX + w;
				var p2Y = tool.startY;
				var p3X = tool.startX + w;
				var p3Y = tool.startY + h;  
				tempcontext.clearRect(0,0,tempcanvas.width,tempcanvas.height);

				tempcontext.beginPath();
				tempcontext.moveTo(tool.startX,tool.startY);
				tempcontext.lineTo(p3X,p3Y);
				tempcontext.lineTo(p2X,p2Y);
				tempcontext.lineTo(tool.startX,tool.startY);
				tempcontext.stroke();
				tempcontext.closePath();
			}

		}
		this.mouseup = function(ev) {

			if(tool.started){
				tool.mousemove(ev);	
				tool.started = false;
				img_update();
			}
		}
	}

	function tool_circle(ev){

		var tool = this;
		tool.started = false;

		this.mousedown = function(ev) {

			tool.started = true;
			tool.startX = ev.x;
			tool.startY = ev.y;

		}
		this.mousemove = function(ev) {

			if(tool.started){
				var centerx = ((ev.x + tool.startX)/2);
				var centery = ((ev.y + tool.startY)/2);
				var w = Math.abs(ev.x - tool.startX);
				var h = ev.y - tool.startY;
				var r = (w/2);

				tempcontext.clearRect(0,0,tempcanvas.width,tempcanvas.height);

				tempcontext.beginPath();
				tempcontext.arc(centerx,centery,r,0,2*Math.PI,false);
				tempcontext.stroke();
				tempcontext.closePath();
			}
		}
		this.mouseup = function(ev) {

			if(tool.started){
				tool.mousemove(ev);	
				tool.started = false;
				img_update();
			}

		}
	}

	function tool_eraser(ev){

		var tool = this;
		tool.started = false;

		this.mousedown = function(ev) {

			tempcontext.beginPath();
			tempcontext.moveTo(ev.x,ev.y);
			tool.started = true;

		}
		this.mousemove = function(ev) {
			if(tool.started){
				
				tempcontext.strokeStyle = 'white';
				tempcontext.lineWidth = 5;
				tempcontext.lineTo(ev.x, ev.y);
				tempcontext.stroke();
				
			}
		}
		this.mouseup = function(ev) {

			if(tool.started){
				tool.mousemove(ev);
				tool.started = false;
				img_update();
				tempcontext.strokeStyle = 'black';
				tempcontext.lineWidth = 1;
			}
		}
	}
	function tool_text(ev){

		var canvas = document.getElementById("canvas");
	    var ctx = canvas.getContext("2d");
	    var lastX;
	    var lastY;
	    var strokeColor = "red";
	    var strokeWidth = 2;
	    var canMouseX;
	    var canMouseY;
	    var canvasOffset = $("#canvas").offset();
	    var offsetX = canvasOffset.left;
	    var offsetY = canvasOffset.top;


	    function MouseDown(e){
	      canMouseX = parseInt(e.clientX-offsetX);
	      canMouseY = parseInt(e.clientY-offsetY);
	      $("#downlog").html("Down: "+ canMouseX + " / " + canMouseY);

	      // Put your mousedown stuff here
	      var text=document.getElementById("text").value;
	      ctx.font = 'italic 20px sans-serif';
	      ctx.fillText(text,canMouseX,canMouseY);
	    }

	    $("#canvas").mousedown(function(e){handleMouseDown(e);});

	}

	function ev_canvas(ev) {
		var x, y;

		
		var rect = canvas.getBoundingClientRect();
		

			x = ev.offsetX + canvas.offsetLeft ;
    		y = ev.offsetY + canvas.offsetTop ;

			//x = ev.layerX;
			//y = ev.layerY;
		

		

		var func = tool[ev.type];
		if (func) {
			func(ev);
		}

	}

init();
//}, false) //}