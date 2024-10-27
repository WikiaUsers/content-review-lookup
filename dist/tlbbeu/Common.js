function setCookie(c_name,value,expiredays) {
var exdate=new Date();
exdate.setDate(exdate.getDate()+expiredays);
document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

function getCookie(c_name) {
if (document.cookie.length>0) {
c_start=document.cookie.indexOf(c_name + "=");
if (c_start!=-1) { 
c_start=c_start + c_name.length+1;
c_end=document.cookie.indexOf(";",c_start);
if (c_end==-1) c_end=document.cookie.length;
return unescape(document.cookie.substring(c_start,c_end));
}
}
return "";
}

// collapsible tables
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
 
function collapseTable(i) {
var Button = $("#collapseButton" + i);
var Table = $("#collapsibleTable" + i);
if (Table.length<1 || Button.length<1) return false;
if (Button.text() == collapseCaption) {
Table.find("tr").not(":has('#collapseButton"+i+"')").hide();
setCookie("hideTable-" + wgArticleId + "-" + i,1,30);
Button.text(expandCaption);
} else {
Table.find("tr").not(":has('#collapseButton"+i+"')").show();
setCookie("hideTable-" + wgArticleId + "-" + i,0,30);  
Button.text(collapseCaption);
}
}
 
function createCollapseButtons() {
var tch = $("table.collapsible tr th");
tch.each(function (i) {
$(this).closest("table").attr("id", "collapsibleTable" + i);
$(this).prepend('<span style="float:right; font-weight:normal; text-align:right; width:6em">[<a href="javascript:collapseTable('+i+');" style="color:'+$(this).css("color")+';" id="collapseButton'+i+'">'+collapseCaption+'</a>]</span>');
if ($(this).closest("table").hasClass("collapsed") || (getCookie("hideTable-" + wgArticleId + "-" + i) == 1) || (tch.length >= autoCollapse && $(this).closest("table").hasClass("autocollapse"))) collapseTable(i);
});
}

var nbh = '['+collapseCaption+']';
var nbs = '['+expandCaption+']';
function toggleNavigationBar(i) {
var NavToggle = $("#NavToggle" + i);
var NavFrame = $("#NavFrame" + i);
if (NavFrame.length<1 || NavToggle.length<1) return false; 
ncd=(NavToggle.text()==nbh)?'none':'block';
NavFrame.children(".NavPic,.NavContent").css("display",ncd);
nct=(NavToggle.text()==nbh)?nbs:nbh;
NavToggle.text(nct);
}
 
// adds show/hide-button to navigation bars
function createNavigationBarToggleButton() {
$("div.NavFrame").each(function (i) {
NavToggleText = ($(this).children(".NavPic:visible,.NavContent:visible").length>0)?nbh:nbs;
$(this).children(".NavHead").append('<a href="javascript:toggleNavigationBar('+i+');" id="NavToggle'+i+'" class="NavToggle">'+NavToggleText+'</a>');
$(this).attr("id","NavFrame"+i);
});
}

//TOOLTIP

var contentstart;

//ttBgStyle = "background: transparent url(picture.png);";
var ttBgStyle = "background-color:black;";
var ttHTMLStart = '<div style="font-size:1em; width: auto; max-width:20em; ' + ttBgStyle + '">';

// prototype functions
/*function $A(a) {
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
// Set events to catch mouse position and window size
document.onmousemove = mouseMove;
window.onresize = windowResize;

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
qttfdiv = document.createElement("div");
qttfdiv.setAttribute("id", "simpletfb");
contentstart.insertBefore(qttfdiv, contentstart.childNodes[0]);
var Spans = document.getElementsByTagName("span");
for (i=0;i<Spans.length;i++) {
if ($(Spans[i]).hasClass("ttlink")) {
Spans[i].nextSibling.setAttribute("id", "tttc" + i);
Spans[i].onmouseover = showTemplateTip.bind(Spans[i],i);
Spans[i].onmouseout = hideTip;
Spans[i].onmousemove = moveTip;
}
}
}

tooltips = true;

$(function () {
createCollapseButtons();
createNavigationBarToggleButton();
if (tooltips) performTooltips();
});


// Zebra Table

var ts_alternate_row_colors = true;

///pre-load sidebar images

var preload_image_object=new Array();
var image_url=new Array();
      image_url[0] = "https://images.wikia.nocookie.net/__cb20100713131421/tlbbeu/images/7/71/Assassin_sidebar2.png";
      image_url[1] = "https://images.wikia.nocookie.net/__cb20100713132929/tlbbeu/images/d/d0/Beggars_Alliance_sidebar2.png";
      image_url[2] = "https://images.wikia.nocookie.net/__cb20100713133031/tlbbeu/images/d/dc/Lotus_Order_sidebar2.png";
      image_url[3] = "https://images.wikia.nocookie.net/__cb20100713133943/tlbbeu/images/8/8c/Minstrel_sidebar2.png";
      image_url[4] = "https://images.wikia.nocookie.net/__cb20100713134233/tlbbeu/images/7/7e/Pyromancer_sidebar2.png";
      image_url[5] = "https://images.wikia.nocookie.net/__cb20100713134247/tlbbeu/images/b/b4/Royalty_sidebar2.png";
      image_url[6] = "https://images.wikia.nocookie.net/__cb20100713134323/tlbbeu/images/5/51/Shaolin_sidebar2.png";
      image_url[7] = "https://images.wikia.nocookie.net/__cb20100713134343/tlbbeu/images/3/3b/Taoist_sidebar2.png";
      image_url[8] = "https://images.wikia.nocookie.net/__cb20100713134349/tlbbeu/images/a/a3/Voodoo_sidebar2.png";

var i=0;
for(i=0;i<=8;i++){
   preload_image_object[i]=new Image();
   preload_image_object[i].src=image_url[i];
 }

// non-sortable zebra striping tables

$(document).ready(function(){

$(".nonsortzebra tr").mouseover(function() {$(this).addClass("over");}).mouseout(function() {$(this).removeClass("over");});
$(".nonsortzebra tr:even").addClass("alt");
});