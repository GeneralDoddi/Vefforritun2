$(document).ready(function() {

	var canvas;
	var tempcanvas;
	var tool;
	var context;
	var tempcontext;
	var started;


function init () {

		//default penni til að byrja með

	tool = new tool_pencil();
		//canvasinn og context
	canvas = document.getElementById('paint');
		
	context = canvas.getContext('2d');


		//fylgist med eventum, ss mouse up, mouse down og mouse move
	canvas.addEventListener('mousedown', onmousedown, false);
	canvas.addEventListener('mousemove', onmousemove, false);
	canvas.addEventListener('mouseup', onmouseup, false);

	canvas.style.cursor = 'crosshair';
	

	
}

function img_update() {

	context.drawImage(tempcanvas,0,0);
	//tempcontext.clearRect(0,0,tempcanvas.width,tempcanvas.height);
	}

function tool_pencil() {
	var tool = this;
	started = false;

};


function onmousedown(ev) {

			context.beginPath();
			context.moveTo(ev.x, ev.y);
			started = true;
}

function onmouseup(ev){

		if(started){
			onmousemove(ev);
			started = false;
			img_update();
		}
}

function onmousemove(ev){

		if(started){
			ev.x = ev.offsetX + canvas.offsetLeft ;
			ev.y = ev.offsetY + canvas.offsetTop;
			context.lineTo(ev.x, ev.y);
			context.stroke();
			}
		
}

init();

 });