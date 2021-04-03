/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */
/* Any JavaScript here will be loaded for all users on every page load. */
/* Start of Tooltips Code */
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

function setStoredValue(key, value, expiredays) {
if (typeof(localStorage) == "undefined") {
setCookie(key, value, expiredays);
} else {
localStorage[key] = value;
}
}
function getStoredValue(key, defaultValue) {
if (typeof(localStorage) == "undefined") {
var value = getCookie(key);
return value == "" ? defaultValue : value;
}
return localStorage[key] == null ? defaultValue : localStorage[key];
}

// See [[Help:Tooltips]]
// default setting to turn tooltips on
var tooltipsOn = true;

var $tfb;
var $ttfb;
var $htt;
var activeHoverLink = null;
var tipCache = new Object();

// hides the tooltip
function hideTip() {
$tfb.html("").removeClass("tooltip-ready").addClass("hidden").css("visibility","hidden"); 
activeHoverLink = null;
}

// displays the tooltip
function displayTip(e) {
$htt.not(":empty").removeClass("hidden").addClass("tooltip-ready");
moveTip(e);
$htt.not(":empty").css("visibility","visible");
moveTip(e);
}

// moves the tooltip
function moveTip(e) {
$ct = $htt.not(":empty");
var newTop = e.clientY + ((e.clientY > ($(window).height()/2)) ? -($ct.innerHeight()+20):20);
var newLeft = e.clientX + ((e.clientX > ($(window).width()/2)) ? -($ct.innerWidth()+20):20);
$ct.css({"position":"fixed","top":newTop + "px","left":newLeft + "px"});
}

// AJAX tooltips
function showTip(e) {
var $t=$(this);
activeHoverLink = $t;
$p=$t.parent();
if ($p.hasClass("selflink")==false) {
$t.removeAttr("title");
$p.removeAttr("title");
var url = wgScript + "?title="+$t.data("tt").replace(/ /g,"_").replace(/\?/g,"%3F")+"&action=render div.tooltip-content";
if (tipCache[url] != null) {
 $tfb.html(tipCache[url]);
 displayTip(e);
 return;
}
$tfb.load(url,function () {
if ($t != activeHoverLink) return;
if ($tfb.html() == "") $tfb.html('<div class="tooltip-content" style="border:1px solid #F8F001;"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
$tfb.find(".tooltip-content").css("display","");
tipCache[url] = $tfb.html();
displayTip(e);
});
}
}

// quick tooltips
function hideTemplateTip() {
$ttfb.html("").removeClass("tooltip-ready").addClass("hidden"); 
}

function showTemplateTip(e) {
$ttfb.html('<div class="tooltip-content">' + $(this).next().html() + '</div>');
displayTip(e);
}

function bindTT() {
$t=$(this);
$p=$t.parent();
if ($p.hasClass("selflink") == false) {
$t.data("tt", $p.attr("title").replace(" (page does not exist)","").replace("?","%3F")).hover(showTip,hideTip).mousemove(moveTip);
}
}

// check to see if it is active then do it
function ttMouseOver() {
if (tooltipsOn && getCookie("wiki-tiploader") != "no") {
$("#bodyContent").append('<div id="tfb" class="htt"></div><div id="templatetfb" class="htt"><div>');
$tfb = $("#tfb");
$ttfb = $("#templatetfb");
$htt = $("#tfb,#templatetfb");
$("#bodyContent span.ajaxttlink").each(bindTT);
$("#bodyContent span.tttemplatelink").hover(showTemplateTip,hideTemplateTip).mousemove(moveTip);
}
}

$(ttMouseOver);
/* end of tooltips code */