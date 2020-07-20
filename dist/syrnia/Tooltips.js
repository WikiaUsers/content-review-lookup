// See [[Help:Tooltips]]

// default setting to turn tooltips on
var tooltipsOn = true;

// individual tooltip controls, defaulted to on
var itemTooltips = true;
var npcTooltips = true;
var questTooltips = true;
var quickTooltips = true;
var achievementTooltips = true;
var abilityTooltips = true;
var otherTooltips = true;

// allow users to specify an external db to change links to
var extDB = "http://www.wowwiki.com/";

// error handling
window.onerror = handleError;

function handleError(msg,url,l) {
if ($("#jsErrors").html() == null) $("#bodyContent").append("<textarea id='jsErrors'></textarea>");
errorText="Error: " + msg + "\n";
if (typeof(url) != "undefined") errorText+="URL: " + url + "\n";
if (typeof(l) != "undefined") errorText+="Line: " + l + "\n\n";
$("#jsErrors").append(errorText + "\n\n");
return true;
}

// hides the tooltip
function hideTip() {
$("#tfb").html("");
$("#tfb").css("display","none"); 
}

// displays the tooltip
function displayTip(e) {
$(".htt:not(:empty)").css("visibility","hidden");
$(".htt:not(:empty)").css("display","block");
$(".htt:not(:empty)").css("zIndex","999");
moveTip(e);
$(".htt:not(:empty)").css("visibility","visible");
}

// This function moves the tool-tips when our mouse moves
function moveTip(e) {
var newTop = e.clientY + ((e.clientY > ($(window).height()/2)) ? -($(".htt:visible").innerHeight()+20):20);
var newLeft = e.clientX + ((e.clientX > ($(window).width()/2)) ? -($(".htt:visible").innerWidth()+20):20);
$(".htt:visible").css("position","fixed");
$(".htt:visible").css("top",newTop + "px");
$(".htt:visible").css("left",newLeft + "px");
}

// AJAX tooltips
function showTip(e) {
var ttLink = $(this).parent();
if (ttLink.hasClass("selflink")==false) {
$(this).removeAttr("title");
ttLink.removeAttr("title");
$("#tfb").load("/"+$(this).data("tt").replace(/ /g,"_").replace("?","%3F")+"?action=render .tooltip-content",function () {
if ($("#tfb").html() == "") $("#tfb").html('<div class="tooltip-content"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
$("#tfb .tooltip-content").css("display","");
displayTip(e);
});
}
}

// quick tooltips
function hideTemplateTip() {
$("#templatetfb").html("");
$("#templatetfb").css("display","none"); 
}

function showTemplateTip(e) {
$("#templatetfb").html('<div class="tooltip-content">' + $(this).next().html() + '</div>');
displayTip(e);
}

// add the tooltip calls to the page
function eLink(db,nm) {
el = document.createElement("a");
el.setAttribute("target","_blank");
dbs = new Array("http://www.wowarmory.com/search.xml?searchType=items&searchQuery=","http://www.wowhead.com/?search=","http://www.thottbot.com/?s=","http://wow.allakhazam.com/search.html?q=");
dbTs = new Array("Armory","Wowhead","Thottbot","Allakhazam");
dbHs = new Array("&real; ","&omega; ","&tau; ","&alpha;");
el.href = dbs[db]+nm;
el.setAttribute("title",dbTs[db]);
el.innerHTML = dbHs[db];
return el;
}

function bindTT() {
if ($(this).parent().hasClass("selflink") == false) {
$(this).data("tt", $(this).parent().attr("title").replace(" (not yet written)",""));
$(this).mouseover(showTip);
$(this).mouseout(hideTip);
$(this).mousemove(moveTip);
if ($(this).parent().hasClass("new")) {
$(this).parent().after('<sup><span class="plainlinks"></span></sup>');
y=($(this).hasClass("itemlink"))?0:1;
z=($(this).hasClass("achievementlink"))?3:4;
for (x=y;x<z;x++) {
eval('elink'+x+'=new eLink('+x+',"'+$(this).data("tt")+'");');
eval("$(this).parent().parent().find('sup>span.plainlinks').append(elink"+x+");");
}
}
if (extDB != "http://www.wowwiki.com/") { 
fullextURL = extDB + $(this).data("tt");
$(this).parent().attr("href",fullextURL);
}
}
}

// check to see which ones are active then do it
function ttMouseOver() {
if (tooltipsOn && wgCanonicalNamespace != "Special" && (itemTooltips || npcTooltips || questTooltips || quickTooltips || abilityTooltips || otherTooltips)) {
$("body").mouseover(hideTip);
$("#bodyContent").append('<div id="tfb" class="htt"></div><div id="templatetfb" class="htt"><div>');
if (itemTooltips) $("span.itemlink,span.setlink").each(bindTT);
if (npcTooltips) $("span.npclink").each(bindTT);
if (questTooltips) $("span.questlink").each(bindTT);
if (achievementTooltips) $("span.achievementlink").each(bindTT);
if (abilityTooltips) $("span.abilitylink").each(bindTT);
if (otherTooltips) $("span.ajaxttlink").each(bindTT);
if (quickTooltips) $("span.tttemplatelink").each(function () {
$(this).mouseover(showTemplateTip);
$(this).mouseout(hideTemplateTip);
$(this).mousemove(moveTip);
});
}
}

$(ttMouseOver);