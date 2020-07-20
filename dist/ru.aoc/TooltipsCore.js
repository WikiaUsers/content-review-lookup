/*
Derived from http://www.wowwiki.com/index.php?title=Help:Tooltips/core.js&oldid=1315217

Defines universal variables and functions for hover tooltip generation.
<pre>
*/

var ttDebug = false;
var ctn = "";
var noCache = false;
var ttHTMLStart = '<div style="font-size: 1em; color:#fff; width: auto; max-width:20em; background-color:black;">';
var cr = new RegExp("\r", "g");
var lf = new RegExp("\n", "g");
var ttLoading = ttHTMLStart + "<b>Loading...</b><br>Please wait.</div>";
var pagename = new Array();

function $A(a) {
var r = [];
for (var i = 0, len = a.length; i < len; ++i) r.push(a[i]);
return r;
}

Function.prototype.bind = function() {
var __method = this, args = $A(arguments), object = args.shift();
return function() { return __method.apply(object, args.concat($A(arguments))) };
}

// Empty variables to hold the mouse position and the window size
var mousePos = null;
var winSize = null;

// Set events to catch mouse position and window size
document.onmousemove = mouseMove;
window.onresize = windowResize;

// The mouseMove and mouseCoords function track the mouse position for us
function mouseMove(ev) {
ev = ev || window.event;
mousePos = mouseCoords(ev);
}

function mouseCoords(ev) {
if(ev.pageX || ev.pageY) return {x:ev.pageX, y:ev.pageY};
if (document.documentElement && document.documentElement.scrollTop) {
// IE6 +4.01 and user has scrolled
dbSleft = document.documentElement.scrollLeft;
dbStop = document.documentElement.scrollTop;
dbCleft = document.documentElement.clientLeft;
dbCtop = document.documentElement.clientTop;
} else {
// IE5 or DTD 3.2
dbSleft = document.body.scrollLeft;
dbStop = document.body.scrollTop;
dbCleft = document.body.clientLeft;
dbCtop = document.body.clientTop;
}if (ev.screenX) { return {x:ev.screenX, y:ev.screenY}; } else {
return {x:ev.clientX + dbSleft - dbCleft, y:ev.clientY + dbStop  - dbCtop}; }
}

function ttError(type) {
extraText = "";
noCache = true;
return ttHTMLStart + "<b>Error</b><br>This " + type + " either has no tooltip<br>or was not intended to have one.</div>";
}

// The windowResize function keeps track of the window size for us
function windowResize() {
if (document.documentElement && document.documentElement.clientWidth) {
// IE6 +4.01
dbCwidth = document.documentElement.clientWidth;
dbCheight = document.documentElement.clientHeight;
} else {
// IE5 or DTD 3.2
dbCwidth = document.body.clientWidth;
dbCheight = document.body.clientHeight;
}
winSize = {x:(dbCwidth) ? dbCwidth:window.innerWidth, y:(dbCheight) ? dbCheight:window.innerHeight}
}

//Determine what XmlHttpRequest object we will use.
function getXmlHttpRequestObject() {
if (window.XMLHttpRequest) {
return new XMLHttpRequest(); //Not Internet Explorer
} else if(window.ActiveXObject) {
return new ActiveXObject("Microsoft.XMLHTTP"); //Internet Explorer
} else {
//fail silently
}
}

var getRequest = getXmlHttpRequestObject();

function hideTip() {
if (ctn == "") {
getRequest.onreadystatechange = function () {}
getRequest.abort();
var tip = document.getElementById('tfb');
tip.innerHTML = "";
} else {
var tip = document.getElementById(ctn);
ctn = "";
}
tip.style.display = "none";
}

function hideTipNonCache() {
var tip = document.getElementById('tfb');
tip.innerHTML = "";
tip.style.display = "none";
}

function getInfo(pgname, type) {
cacheName = pgname + "-cache";
if (document.getElementById(cacheName)) {
displayCacheTip(cacheName);
} else {
pnArr = pagename.length;
pagename[pnArr] = pgname;
//Checks to see if XmlHttpRequest object is ready.
if (getRequest.readyState == 4 || getRequest.readyState == 0) {
getRequest.open("GET", "http://" + location.hostname + "/index.php?title=" + pgname + '&action=render', true);
switch (type) {
case 1: //item
getRequest.onreadystatechange = function() {
parseText(new Array(pgname, pnArr));
}
break;
case 2: //feat
getRequest.onreadystatechange = function() {
parseText_Feat(new Array(pgname, pnArr));
}
break;
case 3: //spell
getRequest.onreadystatechange = function() {
parseText_Spell(new Array(pgname, pnArr));
}
break;
default:
getRequest.onreadystatechange = function() {
parseText_Feat(new Array(pgname, pnArr));
}
}
//Makes the request.
getRequest.send(null);
}
}
}

function displayTip() {
var tip = document.getElementById('tfb');
tip.style.position = "absolute";
tip.style.visibility = "hidden";
tip.style.display = "block";
tip.style.zIndex = "999";
moveTip();
tip.style.visibility = "visible";
}

function displayCacheTip(cachename) {
ctn = cachename;
var tip = document.getElementById(ctn);
tip.style.position = "absolute";
tip.style.visibility = "hidden";
tip.style.display = "block";
tip.style.zIndex = "999";
moveTip();
tip.style.visibility = "visible";
}

function createCache(cpagename, pnArr) {
if (!noCache) {
if (cpagename == pagename[pnArr]) {
cacheName = cpagename + "-cache";
cacheDiv = document.createElement("div");
cacheDiv.setAttribute("id", cacheName);
contentstart.insertBefore(cacheDiv , contentstart.childNodes[0]);
cache = document.getElementById(cacheName);
cache.style.display = "none";
var tip = document.getElementById('tfb');
cache.innerHTML = tip.innerHTML;
}
}
}

// This function moves the tool-tips when our mouse moves
function moveTip() {
if (document.documentElement && document.documentElement.scrollTop) {
// IE6 +4.01 and user has scrolled
dbSleft = document.documentElement.scrollLeft;
dbStop = document.documentElement.scrollTop;
} else {
// IE5 or DTD 3.2
dbSleft = document.body.scrollLeft;
dbStop = document.body.scrollTop;
}

if (ctn == "") {
tip = document.getElementById('tfb');
} else {
tip = document.getElementById(ctn);
}
var newTop = mousePos.y-15;
var newLeft = mousePos.x+12;
if (tip.childNodes) {
if (tip.firstChild === tip.lastChild) { newTop = mousePos.y-15; } else {
if (hasClass(tip.firstChild.firstChild,"feat")) {
newTop += 45;
newLeft -= 12; } } }
tip.style.left = newLeft + "px";
tip.style.top = newTop + "px";

}


windowResize();
ttfdiv = document.createElement("div");
ttfdiv.setAttribute("id", "tfb");
contentstart = document.getElementsByTagName("body")[0];
contentstart.insertBefore(ttfdiv , contentstart.childNodes[0]);
document.body.onmouseover = hideTipNonCache;
/*
</pre>
*/