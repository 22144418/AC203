
console.log("test");
var canvas;
var ctx;
var x = 300;
var y = 300;
var size = 30;
var mx = 0;
var my = 0;
var WIDTH = 600;
var HEIGHT = 600;
var gameover = false;
var score = 0;

var circleX;
var circleY;

var circleC = false;
var score = 0;

var ghostX;
var ghostY;
var ghostC;

function drawBob(x,y,s){
	ctx = document.getElementById("A1").getContext('2d');
	ctx.fillStyle = "rgb(0,200,200)";
	ctx.fillRect(x,y,s,s);
}
function drawCircle(){
	ctx = document.getElementById("A1").getContext('2d');
	ctx.beginPath();
	ctx.arc(circleX,circleY,20,0, 6.28);
	ctx.closePath();
	ctx.stroke();
	ctx.fillStyle = "red";
	ctx.fill(circleX,circleY,40,40);
}
function init(){
	canvas = document.getElementById("A1");
	ctx = canvas.getContext('2d');
	ghostX = Math.floor(Math.random()*(WIDTH-40));
	ghostY = Math.floor(Math.random()*(HEIGHT-40));
	circleX = Math.floor(Math.random()*(WIDTH-40));
	circleY = Math.floor(Math.random()*(HEIGHT-40));
	window.onkeydown = keydownControl;
	return setInterval(draw,10);
}
function keydownControl(e){
	if(e.keyCode == 70){
		mx= -5;
		my= 0;
	}
	else if(e.keyCode == 71){
		mx= 0;
		my= -5;
	}
	else if(e.keyCode == 72){
		mx= -5;
		my= 0;
	}
	else if(e.keyCode == 84){
		mx= 0;
		my= 5;
	}
	else if(e.keyCode == 69){
		mx= 10;
		my= 0;
	}
}
function clear() {
	ctx.clearRect(0,0,WIDTH,HEIGHT);
}
function draw(){
	clear();
	if(gameover == false){
		drawBob(x,y,size);
		drawCircle();
		drawGhost()
		if(x+mx>WIDTH-size || x+mx <0){
			mx= -mx;
		} else if(y+my>HEIGHT-size || y+my <0){
			my= -my;
		}
		x += mx;
		y += my;
		followPacman();
		collisionCheck();
		collisionHandle();

	}
}

function collisionCheck() {
	if( x>circleX-40 && x<circleX+40 && y>circleY-40 && y<circleY+50 ) {
		circleC = true;
	} else {
		circleC = false;
	}
}

function collisionHandle() {
	if(circleC){
		circleX = Math.floor(Math.random()*(WIDTH-50));
		circleY = Math.floor(Math.random()*(HEIGHT-50));
		score += 1;
		document.getElementById("score").innerHTML = "Score: " + score;
	}
}

function drawGhost(){
	ctx = document.getElementById("A1").getContext('2d');
	ctx.beginPath();
	ctx.arc(ghostX,ghostY,20,0, 6.28);
	ctx.closePath();
	ctx.stroke();
	ctx.fillStyle = "red";
	ctx.fill(circleX,circleY,40,40);
}

function followPacman(){
	if(ghostX < x){
		ghostX += 1;
	}
	if(ghostX > x){
	ghostX -= 1;
	} 
	if(ghostY > y){
		ghostY -= 1;
	}
	if(ghostY < y){
	ghostY += 1;
	}
}

init();
