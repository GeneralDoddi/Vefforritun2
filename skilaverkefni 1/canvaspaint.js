if(window.addEventListener) {

	window.addEventListener('load', function () {

	var canvas;
	var tool;
	var context;

function init () {

	

		//penni
	tool = new tool_pencil();
		//canvasinn
	canvas = document.getElementById('paint');
		//2d canvas context
	context = canvas.getContext('2d');
		//fylgist med eventum, ss mouse up, mouse down og mouse move
	canvas.addEventListener('mousedown', ev_canvas, false);
	canvas.addEventListener('mousemove', ev_canvas, false);
	canvas.addEventListener('mouseup', ev_canvas, false);
}

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
}, false) }