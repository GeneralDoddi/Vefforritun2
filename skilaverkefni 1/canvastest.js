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

		//temp canvas og context

	var container = canvas.parentNode;

	tempcanvas = document.createElement('canvas');


	tempcanvas.id = 'temppaint';
	tempcanvas.width = canvas.width;
	tempcanvas.height = canvas.height;

	container.appendChild(tempcanvas);

	tempcontext = tempcanvas.getContext('2d');

		//fylgist med eventum, ss mouse up, mouse down og mouse move
	tempcanvas.addEventListener('mousedown', onmousedown, false);
	tempcanvas.addEventListener('mousemove', onmousemove, false);
	tempcanvas.addEventListener('mouseup', onmouseup, false);

	canvas.style.cursor = 'crosshair';
	tempcanvas.style.cursor = 'crosshair';

	
}

function img_update() {

	context.drawImage(tempcanvas,0,0);
	tempcontext.clearRect(0,0,tempcanvas.width,tempcanvas.height);
	}

function tool_pencil() {
	var tool = this;
	started = false;

};


function onmousedown(ev) {

			tempcontext.beginPath();
			tempcontext.moveTo(ev.x, ev.y);
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
			ev.x = ev.offsetX + tempcanvas.offsetLeft ;
			ev.y = ev.offsetY + tempcanvas.offsetTop;
			tempcontext.lineTo(ev.x, ev.y);
			tempcontext.stroke();
			}
		
}

init();

 });