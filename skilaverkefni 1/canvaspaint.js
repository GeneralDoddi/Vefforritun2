

//if(window.addEventListener) {

	//window.addEventListener('load', function () {

	var canvas;
	var tool;
	var tool_default = 'pencil'
	var context;
	var button;

function init () {

		//penni
	tool = new tool_pencil();
		//canvasinn
	canvas = document.getElementById('paint');

	button = document.getElementById('rect');
		//2d canvas context
	context = canvas.getContext('2d');
		//fylgist med eventum, ss mouse up, mouse down og mouse move
	canvas.addEventListener('mousedown', ev_canvas, false);
	canvas.addEventListener('mousemove', ev_canvas, false);
	canvas.addEventListener('mouseup', ev_canvas, false);

	//button.addEventListener('mouseclick', clicked, false)
}

function clicked(id) {
	if(id === 'pencil') {
		tool = new tool_pencil();
	}
	else if(id === 'rect') {
		tool = new tool_rect();
	}
};



function tool_pencil() {
	var tool = this;
	this.started = false;

	this.mousedown = function (ev) {

		context.beginPath();
		context.moveTo(ev.x, ev.y);
		tool.started = true;

	};

	this.mouseup = function (ev) {

		if (tool.started ) {
			tool.mousemove(ev);
			tool.started = false;
		}
	};

	this.mousemove = function (ev) {

		if(tool.started) {
			context.lineTo(ev.x, ev.y);
			context.stroke();
		}
	};
}

function tool_rect() {

	var tool = this;
	this.started = false;

	this.mousedown = function (ev) {
		tool.started = true;
		tool.startX = ev.x;
		tool.startY = ev.y;
	};

	this.mousemove = function(ev) {

		var x = Math.min(ev.x, tool.startX);
		var y = Math.min(ev.y, tool.startY);
		var h = Math.abs(ev.x - tool.startX);
		var w = Math.abs(ev.y - tool.startY);

		context.strokeRect(x,y,h,w);
	};

	this.mouseup = function (ev) {
      if (tool.started) {
        tool.mousemove(ev);
        tool.started = false;
      }
    };

	//console.log("herro");

};

	function ev_canvas(ev) {
		var x, y;

		if (ev.layerX || ev.layerX == 0) {
			x = ev.layerX;
			y = ev.layerY;
		}

		

		var func = tool[ev.type];
		if (func) {
			func(ev);
		}

	}

	init();
//}, false) //}