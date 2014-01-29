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

Pencil.prototype.draw = function(c) {
	for (var i = 0; i < this.points.length; i++) {
		
		var current_point = this.points[i]
		if(i == 0){
			c.moveTo(current_point.x,current_point.y);
		}
		else{
			c.lineTo(current_point.x,current_point.y);
			c.stroke();
		}
	}
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
Circle.prototype.draw = function(c) {
	
	/*var height = c.y - this.y; 
	var width = Math.abs(c.x - this.x);
	var radius = width / 2;
	
	c.beginPath();
	c.arc(this.start.x,this.end.x,radius, 0, 2 * Math.Pi); 
	c.stroke();
	*/
	var centerX = ((this.end.x + this.start.x)/2);
	var centerY = ((this.end.y + this.start.y)/2);
	var w = Math.abs(this.end.x - this.start.x);
	var h = this.start.y - this.start.y;
	var r = (w/2);

				//tempcontext.clearRect(0,0,tempcanvas.width,tempcanvas.height);
	c.beginPath();
	c.arc(centerX,centerY,r,0,2*Math.PI,false);
	c.stroke();
	
	
}