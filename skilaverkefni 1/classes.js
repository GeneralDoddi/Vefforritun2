function Point(x,y){

	this.x = x;
	this.y = y;
}
//Pencil constructor and tools
function tool_pencil () {
	this.points = [];
}

tool_pencil.prototype.addPoint = function (point) {
	this.points.push(p);
}

tool_pencil.prototype.draw = function(context) {
	for (var i = 0; i >= this.points.length; i++) {
		
		var current_point = this.points[i]
		if(i = 0){
			context.moveTo(current_point.x,current_point.y);
		}
		else{
			context.lineTo(current_point.x,current_point.y);
			context.stroke();
		}
	}
}
//Rectangle constrctor and tools
function tool_rect (){
	this.start = undefined;
	this.end = undefined;
}

tool_rect.prototype.addPoint = function(point) {
	if(this.start = undefined){
		this.start = point;
	}
	else{
		this.end = point;
	}
}

tool_rect.prototype.draw = function(context) {
	
	var width = this.end.x - this.start.x;
	var height = this.end.y - this.start.y;
	context.Rect(this.start.x, this.start.y, height, width);
	context.stroke();
	context.clear();
}

function tool_line (){
	this.start = undefined;
	this.end = undefined; 
}

tool_line.prototype.addPoint = function(point) {
	if(this.start = undefined){
		this.start = point;
	}
	else{
		this.end = p;
	}
}

tool_line.prototype.draw = function(context) {
	context.lineTo(this.start, this.end);
	context.stroke();
}

function tool_circle (point) {
	
	this.x = x;
	this.y = y;
}

tool_circle.prototype.addPoint = function(point) {
	
	context.arc(this.x,this.y,?, 0, 2 * Math.Pi)
};