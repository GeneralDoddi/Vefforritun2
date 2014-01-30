function Point(x,y){

	this.x = x;
	this.y = y;
}
//Pencil constructor and tools
function Pencil () {
	this.points = [];
}

Pencil.prototype.addPoint = function (point) {
	this.points.push(point);
}

Pencil.prototype.draw = function(ctx) {
	/*for (var i = 0; i < this.points.length; i++) {
		
		var current_point = this.points[i]
		/*if(i == 0){
			c.moveTo(current_point.x,current_point.y);
			c.fillRect(curren_point.x,curren_point.y, 3 , 3 );
		}
		else{
			c.fillRect(current_point.x,current_point.y,3,3);
			//c.lineTo(current_point.x,current_point.y);
			c.stroke();
		//}
	}*/
	ctx.beginPath();
	ctx.moveTo(this.points[0].x, this.points[0].y);
 
for (var i = 1; i < this.points.length - 2; i++) {
    var c = (this.points[i].x + this.points[i + 1].x) / 2;
    var d = (this.points[i].y + this.points[i + 1].y) / 2;
 
    ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, c, d);
}
 
// For the last 2 points
ctx.quadraticCurveTo(
    this.points[i].x,
    this.points[i].y,
    this.points[i + 1].x,
    this.points[i + 1].y
	);
	ctx.stroke();
}
//Rectangle constrctor and tools
function Rect (){
	this.start = undefined;
	this.end = undefined;
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
}

Rect.prototype.draw = function(c) {
	
	var width = this.end.x - this.start.x;
	var height = this.end.y - this.start.y;
	c.rect(this.start.x, this.start.y, width, height);
	c.stroke();
	
}

function Line (){
	this.start = undefined;
	this.end = undefined; 
}

Line.prototype.addPoint = function(point) {
	if(this.start === undefined){
		this.start = point;
	}
	else{
		this.end = point;
	}
}

Line.prototype.draw = function(c) {
	
	c.beginPath();
	c.moveTo(this.start.x,this.start.y);
	c.lineTo(this.end.x, this.end.y);
	c.stroke();
}

function Circle (point) {
	
	this.x = undefined;
	this.y = undefined;

}

Circle.prototype.addPoint = function(point) {
	if(this.start === undefined){
		this.start = point;
	}
	else{
		this.end = point;
	}

}
Circle.prototype.draw = function(c,test) {
	
	var centerX = ((this.end.x + this.start.x)/2);
	var centerY = ((this.end.y + this.start.y)/2);
	var w = Math.abs(this.end.x - this.start.x);
	var h = this.start.y - this.start.y;
	var r = (w/2);
	c.beginPath();
	c.lineWidth = this.lineWidth;
	c.arc(centerX,centerY,r,0,2*Math.PI,false);
	c.stroke();
	
}

function Text () {
	this.x = undefined;
	this.y = undefined;
	this.message = undefined;
}

Text.prototype.addPoint = function(point) {
	if(this.start===undefined){
		this.start = point;
		this.end = point;
		this.message = document.getElementById("textBox").value;
		
	}
}

Text.prototype.draw = function(c) {

	c.font = "50px serif";
	//c.fillStyle = "#FF0000";
	c.fillText (this.message,this.start.x , this.start.y);
	//c.stroke();

}
