$(document).ready(function() {

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

	
} });