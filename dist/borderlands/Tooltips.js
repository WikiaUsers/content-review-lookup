var contentstart;

//ttBgStyle = "background: transparent url(picture.png);";
var ttBgStyle = "background-color:black;";
var ttHTMLStart = '<div style="font-size:1em; width: auto; max-width:20em; ' + ttBgStyle + '">';

var hasClass = (function () {
var reCache = {};
return function (element, className) {
return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
};
})();

// prototype functions
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

function mouseMove(ev) {
if (ev) {
if (ev.clientX) var mouseX = ev.clientX;
if (ev.clientY) var mouseY = ev.clientY;
} else if (typeof(window.event) != "undefined") {
var mouseX = window.event.clientX;
var mouseY = window.event.clientY;
}
mousePos = {x:mouseX, y:mouseY};
}


function getDBC() {
dbc = new Array();
docBase = document.documentElement || document.body;
dbc[0] = docBase.clientWidth || 0;
dbc[1] = docBase.clientHeight || 0;
return dbc;
}

// The windowResize function keeps track of the window size for us
function windowResize() {
dbC = getDBC();
winSize = {x:(dbC[0])? dbC[0]:window.innerWidth, y:(dbC[1])? dbC[1]:window.innerHeight}
}

windowResize();

function getDBS() {
dbs = new Array();
docBase = document.documentElement || document.body;
dbs[0] = docBase.scrollLeft || 0;
dbs[1] = docBase.scrollTop || 0;
return dbs;
}

// displays the tooltip
function displayTip() {
var tip = document.getElementById("simpletfb");
tip.style.position = "absolute";
tip.style.visibility = "hidden";
tip.style.display = "block";
tip.style.zIndex = "999";
moveTip();
tip.style.visibility = "visible";
}

// This function moves the tooltips when our mouse moves
function moveTip() {
skinAdjust = new Array();
dbS = getDBS();
tip = document.getElementById("simpletfb");
var showTTAtTop   = mousePos.y > (winSize.y / 2);
var showTTAtLeft  = mousePos.x > (winSize.x / 2);
var newTop  = mousePos.y + (showTTAtTop  ? - (tip.clientHeight + 20) : 20);
var newLeft = mousePos.x + (showTTAtLeft ? - (tip.clientWidth  + 20) : 20);
tip.style.position = 'fixed';
tip.style.top = newTop + "px";
tip.style.left = newLeft + "px";
}

// hides the tip
function hideTip() {
var tip = document.getElementById("simpletfb");
if (typeof(tip.style) == "undefined") return false;
$(tip).html("");
tip.style.display = "none";
}

// quick tooltips
function showTemplateTip(i) {
var Span = document.getElementById("tttc" + i);
tooltip = ttHTMLStart + Span.innerHTML + '</div>';
document.getElementById("simpletfb").innerHTML = tooltip;
displayTip();
}

function performTooltips() {
contentstart = document.getElementById("bodyContent");
if(contentstart){
qttfdiv = document.createElement("div");
qttfdiv.setAttribute("id", "simpletfb");
contentstart.insertBefore(qttfdiv, contentstart.childNodes[0]);
var Spans = document.getElementsByTagName("div");
for (i=0;i<Spans.length;i++) {
if (hasClass(Spans[i], "ttlink")) {
Spans[i].nextSibling.setAttribute("id", "tttc" + i);
Spans[i].onmouseover = showTemplateTip.bind(Spans[i],i);
Spans[i].onmouseout = hideTip;
Spans[i].onmousemove = moveTip;
}
}
}
}

tooltips = true;
function loadTooltips() {
if (tooltips) performTooltips();
}

addOnloadHook(loadTooltips);