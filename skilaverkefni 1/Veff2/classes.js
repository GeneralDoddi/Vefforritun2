//******************************************************************//
// Here are the classes needed for the drawing program controlled 	//
// in scripts.js. It is designed so that is easy to add features	//
//Written by Bjarnþór Sigurðarson and Þórður Þorsteinsson			//
//******************************************************************//					

//Constructor for each point made by drawing object
function Point(x,y){

	this.x = x;
	this.y = y;
}

//Pencil constructor and tools
function Pencil () {
	this.name = "Pencil";
	this.points = [];
	this.lineWidth = undefined;
	this.color = undefined;

}

Pencil.prototype.addPoint = function (point) {
	
	this.points.push(point);
	this.lineWidth = parseInt(document.getElementById("ble").value);
	this.colorStyle = "#"+document.getElementById("color").value;
	
}

Pencil.prototype.draw = function(ctx) {

	ctx.beginPath();
	ctx.moveTo(this.points[0].x, this.points[0].y);
 	
	for (var i = 1; i < this.points.length - 2; i++) {
    	
    	var c = (this.points[i].x + this.points[i + 1].x) / 2;
    	var d = (this.points[i].y + this.points[i + 1].y) / 2;
 		 
 		
 		ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, c, d);
	}
 
	ctx.strokeStyle = this.colorStyle;
	ctx.lineWidth = this.lineWidth;
	ctx.stroke();

}
//Eraser constructor and tools
function Eraser () {
	this.name = "Eraser";
	this.points = [];
	this.lineWidth = undefined;
	this.color = undefined;

}

Eraser.prototype.addPoint = function (point) {
	
	this.points.push(point);
	this.lineWidth = parseInt(document.getElementById("ble").value);
	this.colorStyle = "#FFFFFF";
	
}

Eraser.prototype.draw = function(ctx) {

	ctx.beginPath();
	ctx.moveTo(this.points[0].x, this.points[0].y);
 	
	for (var i = 1; i < this.points.length - 2; i++) {
    	
    	var c = (this.points[i].x + this.points[i + 1].x) / 2;
    	var d = (this.points[i].y + this.points[i + 1].y) / 2;
 		 
 		
 		ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, c, d);
	}
 
	ctx.strokeStyle = this.colorStyle;
	ctx.lineWidth = this.lineWidth;
	ctx.stroke();

}
//Rectangle constrctor and tools
function Rect (){
	this.name = "Rect";
	this.start = undefined;
	this.end = undefined;
	this.lineWidth = undefined;
	this.colorStyle = undefined;
}

Rect.prototype.addPoint = function(point) {
	if(this.start === undefined){
		this.start = point;
		console.log("Adding start point to rectangle");
		
	}
	else{
		this.end = point;
		console.log("Updating end point in rectangle");
	}
	this.lineWidth = parseInt(document.getElementById("ble").value);
	this.colorStyle = "#"+document.getElementById("color").value;
}
Rect.prototype.draw = function(ctx) {
	
	var width = this.end.x - this.start.x;
	var height = this.end.y - this.start.y;
	
	ctx.beginPath();
	ctx.rect(this.start.x, this.start.y, width, height);
	ctx.strokeStyle = this.colorStyle;
	ctx.lineWidth = this.lineWidth;
	ctx.stroke();
	
}
//Line constructor and tools
function Line (){
	this.name = "Line";
	this.start = undefined;
	this.end = undefined; 
	this.lineWidth = undefined;
	this.colorStyle = undefined;
}

Line.prototype.addPoint = function(point) {
	if(this.start === undefined){
		this.start = point;
	}
	else{
		this.end = point;
	}
	this.colorStyle = "#" + document.getElementById("color").value;
	this.lineWidth = parseInt(document.getElementById("ble").value);
}

Line.prototype.draw = function(c) {
	
	c.beginPath();
	c.moveTo(this.start.x,this.start.y);
	c.lineTo(this.end.x, this.end.y);
	
	c.lineWidth = this.lineWidth;
	c.strokeStyle = this.colorStyle;
	
	c.stroke();
}
//Circle constructor and tools
function Circle (point) {
	this.name = "Circle";
	this.x = undefined;
	this.y = undefined;
	this.lineWidth = undefined;
	this.colorStyle = undefined;
}

Circle.prototype.addPoint = function(point) {
	if(this.start === undefined){
		this.start = point;
		this.colorStyle = "#" + document.getElementById("color").value;
		console.log(this.colorStyle);
		this.lineWidth = parseInt(document.getElementById("ble").value);
		console.log(this.lineWidth);
	}
	else{
		this.end = point;
	}
	this.lineWidth = parseInt(document.getElementById("ble").value);
	this.colorStyle = "#" + document.getElementById("color").value;
}
Circle.prototype.draw = function(c) {
	
	var centerX = ((this.end.x + this.start.x)/2);
	var centerY = ((this.end.y + this.start.y)/2);
	var w = Math.abs(this.end.x - this.start.x);
	var h = this.start.y - this.start.y;
	var r = (w/2);
	c.beginPath();
	c.lineWidth = this.lineWidth;
	c.strokeStyle = this.colorStyle;
	c.arc(centerX,centerY,r,0,2*Math.PI,false);
	c.stroke();
	
}

function Text () {
	this.name = "Text";
	this.x = undefined;
	this.y = undefined;
	this.message = undefined;
	this.color = undefined;
	this.font = undefined; 
}

Text.prototype.addPoint = function(point) {
	if(this.start===undefined){
		this.start = point;
		this.end = point;
		this.message = document.getElementById("textBox").value;
		this.font = document.getElementById("font").value;
		this.color = document.getElementById("color").value;
		this.size = document.getElementById("ble").value;
	}
}

Text.prototype.draw = function(c) {
	
	c.font = this.size+"pt "+this.font;
	c.fillStyle = "#"+ this.color;
	c.fillText (this.message,this.start.x , this.start.y);
	

}
