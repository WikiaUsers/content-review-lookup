/* Any JavaScript here will be loaded for all users on every page load. */
if(document.getElementById('clockCanvas') !== null){

//if clockCanvas found do something

var container = document.getElementById("clockCanvas"),
    clockCanvas = document.createElement('canvas');
container.appendChild(clockCanvas);

var ctx = clockCanvas.getContext("2d");
var radius = clockCanvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90
setInterval(drawClock, 1000);

function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
  var grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
  grad.addColorStop(1, '#333');
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius*0.05;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.05, 0, 2*Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  var ang;
  var num;
  ctx.font = radius*0.20 + "px arial";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius*0.85);
    ctx.rotate(-ang);
	
	if(num==3||num==6|num==9|num==12){
	  ctx.font = radius*0.50 + "px arial";

	}else{
	  ctx.font = radius*0.40 + "px arial";

	}
    ctx.fillText("•", 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius*0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius){
    var now = new Date();
	
    var hour = now.getHours();
    var minute = now.getMinutes();
    var somMinute = now.getMinutes()-15;
    var second = now.getSeconds();
    //hour
    hour=hour%12;
    hour=(hour*Math.PI/6)+
    (minute*Math.PI/(6*60))+
    (second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);
    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07);
    
    
    // second
    second=(second*Math.PI/30);
    
         //Somminute
    somMinute=(somMinute*Math.PI/30)+(second*Math.PI/(30*60));
    drawSHand(ctx, somMinute, radius*0.8, radius*0.07);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

function drawSHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle="#FF0000";
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

   

window.onload = function() {

    var d = new Date();
	
	var h =  d.getHours(), m = d.getMinutes();
	
		var zero ="";
	if(sMinutes<10){
		zero = "0";
	}	
	
    var _time = (h > 12) ? (h-12 + ':' +zero+m +' PM') : (h + ':' + m +' AM');
		
	var sTime = new Date();
	sTime.setMinutes(sTime.getMinutes() - 15);
	
	
	var h2 =  sTime.getHours(), sMinutes = sTime.getMinutes();
	
	var zero ="";
	if(sMinutes<10){
		zero = "0";
	}	
	
    var _time2 = (h2 > 12) ? (h2-12 + ':' +zero+sMinutes +' PM') : (h2 + ':' + sMinutes +' AM');


document.getElementById("clockTime").innerHTML = _time +" (Greenwich Mean Time)"+"<br />"+_time2 +" (Somerset Mean Time)";

}

}else{
//If clockCanvas not found do nothing
console.log("Missing clockCanvas");

}

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AllPagesHideRedirect.js',
    ]
});