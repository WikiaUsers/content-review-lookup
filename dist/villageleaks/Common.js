
// ===============================================================
// Add and store UTC date publish to Global Navigation header bar.
// ===============================================================
var UTCDateTime;
//todo: add localization
Date.prototype.getMonthName = function() {
          var monthNames = [ "Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.","Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec." ];
          return monthNames[this.getMonth()];
     };
Date.prototype.getDow = function() {
          var dayNames = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          return  dayNames[this.getDay()];
};
 
function refreshUTCDateTime() {
    var now = new Date();
    var now_utc = new Date(now.getUTCFullYear(),now.getUTCMonth(),now.getUTCDate(),now.getUTCHours(),now.getUTCMinutes(),now.getUTCSeconds());
    UTCDateTime = now_utc.getDow() + " " +  now_utc.getMonthName() + " " + now_utc.getDate() + " " + now_utc.getFullYear() + " " + ("00" + now_utc.getHours()).substr(-2) + ":" + ("00" + now_utc.getMinutes()).substr(-2) + ":" + ("00" + now_utc.getSeconds()).substr(-2) + " (UTC)";

    $('#idUTCDateTime').empty().append('<span align="center" style="font-size: 12px; font-weight: bold; text-transform: none; text-align=center"><a style="color:white;" title="Refresh with cache purge" href="' + wgArticlePath.replace('$1', wgPageName.replace(/ /g, '_')) + '?action=purge">' + UTCDateTime + '</a></span>');
    window.clearTimeout(timerUTCDateTime);
    timerUTCDateTime = window.setTimeout(refreshUTCDateTime, 1000);
}
 
$(document).ready(function() {
$('<li id="liUTDDateTime"><span align="center" id="idUTCDateTime"></span></li><li><img src="https://images.wikia.nocookie.net/tribez/images/9/9c/Settler%5E.jpg" width="25" height="25" align="bottom"></img></li>').appendTo('#GlobalNavigation');
    timerUTCDateTime = window.setTimeout(refreshUTCDateTime, 1000);
    refreshUTCDateTime();
});

/* Any JavaScript here will be loaded for all users on every page load. */
addOnloadHook(crystalTree);
addOnloadHook(embedSwf);
addOnloadHook(dinoAnimations);



/*=======================================================================*/
/*==========================animate dinos================================*/
/*=======================================================================*/
var adino = function(spanId)
{
//global vars
var i = 0;
var isSitting = false;
var flipFrame = false;
var frames = new Array();
var frameCount = 0; 
var t;
var speed = 111;
var lastx = 0;
var lasty = 0;
var maxCanvasX = 0;
var maxCanvasY = 0;

//parse the dino anchor PLIST
var dino = document.getElementById(spanId); //this is the span anchor to host the animation
dino.style.display = 'none'; //just in case this wasn't hidden, hide it
var tDinoPlist = dino.innerHTML;


//wikia xml encodes the xml angle brackets...
var tDinoPlist2 = tDinoPlist.replace(/&gt;/g,">").replace(/&lt;/g,"<");
//var dinoPlist = tDinoPlist2.replace('<!--?xmlversion="1.0" encoding="UTF-8"?--><plistversion="1.0">',"");
var dinoPlist = tDinoPlist2;
alert('plist:' + dinoPlist);

//if (window.DOMParser)
//  {
  parser =new DOMParser();
  plist = parser.parseFromString(dinoPlist,"text/xml");

/*
  }
else // Internet Explorer die!die!die!
  {
  plist = new ActiveXObject("Microsoft.XMLDOM");
  plist.async=false;
  plist.loadXML(dinoPlist); 
  }
*/

alert('plist len:' + plist.querySelectorAll('dict').length);

var dinoTextureName = 'http://' + plist.querySelector('dinotexture').firstChild.nodeValue;
var dinoSitName = 'http://' + plist.querySelector('dinosit').firstChild.nodeValue;
var dict = plist.querySelectorAll('dict');

alert(dinoTextureName);
  
dino.innerHTML = ''; //clear out the plist and show the span
dino.style.display = '';

var canvas = document.createElement('canvas');
canvas.id = 'canvas_' + dino.id;
var ctx;

//this is the canvas from which I will clip animation frames
var textureCanvas = document.createElement('canvas');
textureCanvas.id = 'textureCanvas_' + dino.id;
var rawCtx;// = textureCanvas.getContext('2d')
//textureCanvas.style.display = 'none';  //optionally hidden


//this is the canvas to which I will write the frame image data, and convert to PNG
//this is not really necessary but is done so I can "flip" the image easy
//otherwise I would have to invery the imageData array which could be more cpu intense
var frameCanvas = document.createElement('canvas');
frameCanvas.id = 'frameCanvas';
//frameCanvas.style.display = 'none';


//load some assets
var sitFrame = new Image();
sitFrame.src = dinoSitName;
var xi = document.createElement('img');  //this seems to help the async load
xi.src = dinoSitName;
//dino.appendChild(xi);

var texture = new Image();
texture.src = dinoTextureName;
var xt = document.createElement('img');
xt.src = dinoTextureName;
//dino.appendChild(xt);

texture.onload = beginApplication();


//this will redraw the animation area with the next frame
function playFrame(index)
{
	if (!isSitting)
	{
	i++;
	if (i%frameCount==0)
		flipFrame = !flipFrame;
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.save();
	if (flipFrame)
		{
		ctx.translate(canvas.width,0);
		ctx.scale(-1,1);
		}

//	ctx.putImageData(frames[i%frameCount].id,0,0);
	ctx.drawImage(frames[i%frameCount].image,0,0);
	ctx.restore();
		t = setTimeout(playFrame,speed);
	}
}	


function beginApplication()
{
alert('beginAnimation');

dino.appendChild(canvas);		//animation Canvas
dino.appendChild(textureCanvas);		//raw animation frames
dino.appendChild(frameCanvas);		//scratch area to write a clipped frame to convert to png


//thank you IE9 for being different from every other browser
ctx = canvas.getContext('2d');
alert(ctx.toString());
ctx.drawImage(sitFrame,0,0);

rawCtx = textureCanvas.getContext('2d');

frameCanvas.width = 250;
frameCanvas.height = 250;

textureCanvas.width = texture.width;
textureCanvas.height = texture.height;
rawCtx.drawImage(texture,0,0);


//throw all my canvases to the screen for demo.  These can be hidden but for educational purposes I display them all


//add some mouse listeners. 
canvas.addEventListener('mousemove',updatePx);  //make the tiger follow the mouse
canvas.addEventListener('mousedown',sitDino);	//make the tiger sit or move again on click


var frame = function(index,arrayData,rotate)
{
this.arrayFixed = arrayData.replace(/{/g,"").replace(/}/g,"");
this.tArray = this.arrayFixed.split(",");

this.x1 = parseInt(this.tArray[0]);
this.y1 = parseInt(this.tArray[1]);
this.x2 = parseInt(this.tArray[2]);
this.y2 = parseInt(this.tArray[3]);

if (this.x2 > maxCanvasX)
	maxCanvasX = this.x2;
if (this.y2 > maxCanvasY)
	maxCanvasY = this.y2;


if (rotate)
{
t = this.x2;
this.x2 = this.y2;
this.y2 = t;
}

frameCount++;
this.index = index;
this.image = new Image();

frameCanvas.width = this.x2;
frameCanvas.height = this.y2;
var rCtx = textureCanvas.getContext('2d');
this.id = rCtx.getImageData(this.x1,this.y1,this.x2,this.y2);
this.fCtx = frameCanvas.getContext('2d');
this.fCtx.clearRect(0,0,frameCanvas.width,frameCanvas.height);
this.fCtx.putImageData(this.id,0,0);

this.image.src = frameCanvas.toDataURL("image/png");
if (rotate)
{
frameCanvas.width = this.y2;
frameCanvas.height = this.x2;
this.fCtx.save();
this.fCtx.translate(0,this.x2);
this.fCtx.rotate(-Math.PI/2);
this.fCtx.drawImage(this.image,0,0);
this.fCtx.restore();
this.image.src = frameCanvas.toDataURL("image/png");
}

}

//clip some frames and put them in the stack
//dict[0] = plist container
//dict[1] = frames, Metadata
//dict[n] = metadata sub

for (var ff=2;ff < dict.length-1;ff++)
{
	s = dict[ff].querySelector('string').firstChild.nodeValue;
	if (dict[ff].querySelector('true'))
		r = true;
	else
		r = false;
		
	frames.push(new frame(1,s,r));
}

if (maxCanvasX < sitFrame.width)
	maxCanvasX = sitFrame.width;
if (maxCanvasY < sitFrame.height)
	maxCanvasY = sitFrame.height;
canvas.width = maxCanvasX;
canvas.height = maxCanvasY;



t = setTimeout(playFrame,speed);
}

//--------------------------------------------------------------------------//
//this is the frame object.  it will handle clipping the frame from the raw frames image and place them into a stack


//flip the sit command
function sitDino(ev)
{
if (isSitting)
{
	isSitting = false;
	t = setTimeout(playFrame,speed);
}
else	
{
	isSitting = true;
	clearTimeout(t);
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.drawImage(sitFrame,0,0);


}
}

//just display the mouse position to screen for debug
function updatePx(ev)
{

if (ev.layerX || ev.layerX ==0){
mx = ev.layerX;
my = ev.layerY;
}
else if (ev.offsetX || ev.offsetX == 0)
{
mx = ev.offsetX;
my = ev.offsetY;
}

//for some reason there is a re-poll of mouse position even if there isn't
//an actual MOVE event.  detect if the mouse *really* moved since last poll;
if (lastx != mx || lasty != my)
{
if (mx < (canvas.width/2))
	flipFrame = true;
else
	flipFrame = false;
}
lastx = mx;
lasty = my;
	
}

}

function dinoAnimations()
{

var testspans = getElementsByClassName(document,'span','dinoAnimation');
for (var i in testspans)
{
    var a = new adino('dino');
}

}





function embedSwf()
{
var testspans = getElementsByClassName(document, 'span', 'embedSwf');

for(var i in testspans)
  testspans[i].innerHTML = 'disabled: ' + testspans[i].firstChild.nodeValue + '';
}

function test1()
{
var testspans = getElementsByClassName(document, 'span', 'testjs');
for(var i in testspans) 
  testspans[i].innerHTML = testspans[i].innerHTML + ' there';
}

function crystalTree()
{
var testspans = getElementsByClassName(document, 'span', 'testjs');
for(var i in testspans) 
  testspans[i].innerHTML = '<canvas id="crystalTree">no HTML5</canvas>';

var assetCount = 0;
var assetTarget = 2;

var pcount = 8;
var pp = new Array();

var particleImg = new Image();
particleImg.src ='https://images.wikia.nocookie.net/villageleaks/images/c/c9/CastleParticle.png';
particleImg.onload = assetTracker;

var treeImg = new Image();
treeImg.src = "https://images.wikia.nocookie.net/villageleaks/images/1/1f/Castle.png";
treeImg.onload = assetTracker;

function assetTracker()
{
assetCount += 1;
if (assetCount >= assetTarget)
{
	setTimeout(buildObjects,10);
}

function buildObjects()
{
var canvas1 = document.getElementById('crystalTree');
canvas1.width = treeImg.width;
canvas1.height = treeImg.height;

for (var i = 0; i < pcount; i++)
	pp[i] = new particle();
	setTimeout(beginAnimation,10);
}

}

function point(x , y)
{
this.X = x;
this.Y = y;
this.radius = Math.sqrt((this.X * this.X) + (this.Y * this.Y));
this.radians = Math.atan(this.Y/this.X);
this.degrees = this.radians * 180 / Math.PI;

this.movePolar = function (deltaRadius, deltaRadians)
		{
		var newX = Math.cos(this.radians + deltaRadians) * (this.radius + deltaRadius);
		var newY = Math.sin(this.radians + deltaRadians) * (this.radius + deltaRadius);
		this.X = newX;
		this.Y = newY;
		this.radius = Math.sqrt((this.X * this.X) + (this.Y * this.Y));
		this.radians = Math.atan(this.Y/this.X);
		this.degrees = this.radians * 180 / Math.PI;
		};
}
function d2r (degrees)
{
return (degrees * Math.PI / 180);
}
function particle()
{
this.p = new point(Math.random() * treeImg.width, Math.random() * treeImg.height /2 );
this.sx = 1 - + Math.random() * .2;
this.sd = .2;
this.alpha = 1;
this.pv = 3 + (Math.random() * 3);

this.dradius = 2;
this.dradians =  -.01; //-1 * d2r(2); //2 degree increments

this.advance = function()
	{

	//this.p.Y += this.pv;
	this.p.movePolar(this.dradius,this.dradians);
	this.sx -+ this.sd;
	this.alpha = 1.2 - (this.p.Y / treeImg.height);
	
	if (this.p.Y > treeImg.height || this.p.X > treeImg.width || this.p.Y < 0 || this.p.X < 0)
		{
		this.p = new point(Math.random() * treeImg.width, Math.random() * treeImg.height);
		this.sx = 1 - + Math.random() * .2;
		this.alpha = 1;
		}
	
	
	var canvas1 = document.getElementById('crystalTree');
	var context1 = canvas1.getContext('2d');
	context1.save();
	context1.globalAlpha = this.alpha;
	context1.drawImage(particleImg,this.p.X, this.p.Y,particleImg.width * this.sx * 1.2,particleImg.height * this.sx * 1.2);
	context1.restore();
	
	};
}


function beginAnimation()
{
var canvas1 = document.getElementById('crystalTree');
var context1 = canvas1.getContext('2d');

context1.clearRect(0,0,canvas1.width,canvas1.height);
context1.drawImage(treeImg,0,0,treeImg.width,treeImg.height);

for (var i = 0; i < pcount; i++)
	pp[i].advance();


setTimeout(beginAnimation,50);
}

}