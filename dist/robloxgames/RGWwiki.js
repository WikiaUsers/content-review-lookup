// auto-zebra stripe for tables
function zebraStripe() {
if ($("table.zebra > tbody > tr").eq(1).css("background-color") == "transparent" && $("table.zebra > tbody > tr").eq(2).css("background-color") == "transparent") {
$("table.zebra > tbody > tr:nth-child(2n+1)").not(".nozebra").css("background-color","#2c2c2c");
$(".sortheader").bind("click", function() {
$("table.zebra > tbody > tr").not(".nozebra").css("background-color","transparent");
$("table.zebra > tbody > tr:nth-child(2n+1)").not(".nozebra").css("background-color","#2c2c2c");
});
}
}

addOnloadHook(zebraStripe);

function changePRlink() {
if (wgCanonicalNamespace == "Project_talk" && wgTitle.indexOf("ProblemReports") != -1) {
prnum = wgTitle.replace("ProblemReports/","");
$("#ca-nstab-project>a").attr("href","/Special:ProblemReports/"+prnum);
$("#ca-nstab-project").removeClass("new");
}
}
addOnloadHook(changePRlink);

function abpAlert() {
if ($(".content-ads:visible").length == 0 && getCookie("abpPrompt") != "true") {
alert('We noticed the main content portion of this page is not being displayed. This may be due to an AdBlock Plus filter which is preventing the page from being viewed.\n\nYou may wish to disable the "content-ads" filter in AdBlock Plus while we await a fix.\n\nAlternatively, you can use the Monaco skin (see Special:Preferences), which does not have this bug.\n\nWe apologize for the inconvenience.');
setCookie("abpPrompt","true");
}
}
$(function() { setTimeout("abpAlert();",5000); });

// See [[Help:Tooltips]]
// default setting to turn tooltips on
var tooltipsOn = true;

// allow users to specify an external db to change links to
var extDB = "http://www.wowwiki.com/";

var $tfb;
var $ttfb;
var $htt;

// hides the tooltip
function hideTip() {
$tfb.html("").removeClass("tooltip-ready").addClass("hidden").css("visibility","hidden"); 
}

// displays the tooltip
function displayTip(e) {
$htt.not(":empty").removeClass("hidden").addClass("tooltip-ready");
moveTip(e);
$htt.not(":empty").css("visibility","visible");
}

// moves the tooltip
function moveTip(e) {
var newTop = e.clientY + ((e.clientY > ($(window).height()/2)) ? -($htt.not(".hidden").innerHeight()+20):20);
var newLeft = e.clientX + ((e.clientX > ($(window).width()/2)) ? -($htt.not(".hidden").innerWidth()+20):20);
$htt.not(".hidden").css({"position":"fixed","top":newTop + "px","left":newLeft + "px"});
}

// AJAX tooltips
function showTip(e) {
$t=$(this);
$p=$t.parent();
if ($p.hasClass("selflink")==false) {
$t.removeAttr("title");
$p.removeAttr("title");
$tfb.load("/"+$t.data("tt").replace(/ /g,"_").replace(/\?/g,"%3F")+"?action=render div.tooltip-content",function () {
if ($tfb.html() == "") $tfb.html('<div class="tooltip-content"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
$tfb.find(".tooltip-content").css("display","");
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

// add the tooltip calls to the page
function eLink(db,nm) {
dbs = new Array("http://www.wowarmory.com/search.xml?searchType=items&searchQuery=","http://www.wowhead.com/?search=","http://www.thottbot.com/?s=","http://wow.allakhazam.com/search.html?q=");
dbTs = new Array("Armory","Wowhead","Thottbot","Allakhazam");
dbHs = new Array("&real; ","&omega; ","&tau; ","&alpha;");
el = '<a href="'+ dbs[db]+nm + '" target="_blank" title="'+ dbTs[db] +'">'+ dbHs[db] + '</a>';
return el;
}

function bindTT() {
$t=$(this);
$p=$t.parent();
if ($p.hasClass("selflink") == false) {
$t.data("tt", $p.attr("title").replace(" (page does not exist)","").replace("?","%3F")).mouseover(showTip).mouseout(hideTip).mousemove(moveTip);
if ($p.hasClass("new")) {
els = '<sup><span class="plainlinks">';
y=($t.hasClass("itemlink"))?0:1;
z=($t.hasClass("achievementlink"))?3:4;
for (x=y;x<z;x++) els += eLink(x,$t.data("tt").replace("Quest:",""));
$p.after(els+'</span></sup>');
}
if (extDB != "http://www.wowwiki.com/") { 
fullextURL = extDB + $t.data("tt");
$p.attr("href",fullextURL);
}
}
}

// check to see if it is active then do it
function ttMouseOver() {
if (tooltipsOn && getCookie("wiki-tiploader") != "no") {
$("#bodyContent").mouseover(hideTip);
$("#bodyContent").append('<div id="tfb" class="htt"></div><div id="templatetfb" class="htt"><div>');
$tfb = $("#tfb");
$ttfb = $("#templatetfb");
$htt = $("#tfb,#templatetfb");
$("#bodyContent span.ajaxttlink").each(bindTT);
$("#bodyContent span.tttemplatelink").mouseover(showTemplateTip).mouseout(hideTemplateTip).mousemove(moveTip);
}
}


// add scribblemap processing
function wwScribbleMaps() {
$("#bodyContent div.wwSM").each(function () {
mapID = $(this).attr("class").replace("wwSM map-","");
if (mapID.length > 20) mapID = "";
$(this).html('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="550" height="400" id="smwidget" align="middle"><param name="allowFullScreen" value="true" /><param name="FlashVars" value="id='+mapID+'&p=true&mt=false&d=true&z=true" /><param name="movie" value="http://widgets.scribblemaps.com/wowsmwidget.swf"/><param name="quality" value="high" /><param name="bgcolor" value="#000000" /><embed src="http://widgets.scribblemaps.com/wowsmwidget.swf" FlashVars="id='+mapID+'&p=true&mt=false&d=true&z=true" "quality="high" bgcolor="#000000" width="550" height="400" name="smwidget" align="middle" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></object>');
});
}

function aCharLoad() {
$("#bodyContent .aChar").each(function () {
data = $(this).text().split(";");
realm = data[0];
loc = (data[1].toLowerCase()=="eu")?"eu":"www";
character = data[2];
height = (data[3])?588:444;
$(this).html('<iframe src="http://'+loc+'.wowarmory.com/character-model-embed.xml?r='+realm+'&amp;cn='+character+'&amp;rhtml=true" scrolling="no" height="'+height+'" width="321" frameborder="0"></iframe>');
});
$("#bodyContent .aChar").css("display","block");
}


// AJAX tables
ahClass = new RegExp('class="ajaxHide"', "gim");
crlf = new RegExp("\r\n", "g")

function getTableData(tablePage, tableNum) {
$("body").bind("ajaxSend", function (){
$(this).css("cursor","wait");
}).bind("ajaxComplete", function (){
$(this).css("cursor","auto");
});
$.get('http://' + location.hostname + '/' + tablePage + '?action=render', function (data) {
if (data) {
data = data.replace(crlf, "").replace(ahClass, 'class="ajaxHide-active"').replace('class="darktable"', "");
$("#ajaxTable" + tableNum).find("td").eq(0).html(data);
$("#ajaxTable" + tableNum).find("td").eq(0).find("table.sortable").each(function (i) {
ts_makeSortable($(this));
zebraAJAX = $(this).find("tr");
if (zebraAJAX.eq(2).css("background-color") == "transparent" && zebraAJAX.eq(3).css("background-color") == "transparent") {
zebraAJAX.find(".sortheader").click(function () {
$("#bodyContent table.zebra > tbody > tr").css("background-color","transparent");
ac = (skin=="monobook")?"#e9e9ff":"#2c2c2c";
$("#bodyContent table.zebra > tbody > tr:nth-child(2n+1)").css("background-color",ac);
});
}
});
zebraAJAX = $("#bodyContent .ajax td > table.zebra > tbody > tr");
if (zebraAJAX.eq(1).css("background-color") == "transparent" && zebraAJAX.eq(2).css("background-color") == "transparent") {
$("#bodyContent .ajax td > table.zebra > tbody > tr:nth-child(2n+1)").css("background-color","#2c2c2c");
if (skin == "monobook") $("#bodyContent .ajax td > table.zebra > tbody > tr:nth-child(2n+1)").css("background-color","#e9e9ff");
}
$("#stl" + tableNum).html('[<a href="/'+tablePage+'?action=edit">edit</a>]&nbsp;[<a href="javascript:;" id="htl' + tableNum + '" onClick="hideTable(' + tableNum + ');">hide</a>]');
ttMouseOver();
}
});
}

function hideTable(tableNum) {
$("#ajaxTable" + tableNum).find("tr").eq(1).hide();
$("#htl" + tableNum).click(function() {
showTable(tableNum);
});
$("#htl" + tableNum).text("show");
}

function showTable(tableNum) {
$("#ajaxTable" + tableNum).find("tr").eq(1).show();
$("#htl" + tableNum).click(function() {
hideTable(tableNum);
});
$("#htl" + tableNum).text("hide");
}

function loadTableData(tableNum) {
thisTable = document.getElementById("ajaxTable" + tableNum);
loadPage = thisTable.className.substring(thisTable.className.indexOf("targetPage-") + 11);
getTableData(loadPage, tableNum);
}

function addAjaxDisplayLink() {
$("#bodyContent table.ajax").each(function (i) {
$(this).attr("id", "ajaxTable" + i);
$(this).find("td").eq(1).parent().hide();
$(this).find("td").eq(0).parent().show();
if (this.getElementsByTagName("th").length > 0) this.getElementsByTagName("th")[0].innerHTML = '<span style="float:right;" id="stl' + i + '"></span>' + this.getElementsByTagName("th")[0].innerHTML;
if ($(this).find("td").eq(0).hasClass("showLinkHere")) {
$(this).find("td").eq(0).html($(this).find("td").eq(0).html().replace("[link]", '<a href="javascript:;" onClick="loadTableData(' + i + ')">').replace("[/link]","</a>"));
} else {
$("#stl" + i).html('[<a href="javascript:;" onClick="loadTableData(' + i + ')">show data</a>]');
}
});
}

function toggleSMWFacts() {
if ($("#SMWFactToggle").text() == "hide") {
$("#mw-data-after-content table.smwfacttable tr").hide();
setCookie("hideSMWFacts","true");
$("#SMWFactToggle").text("show");
} else {
$("#mw-data-after-content table.smwfacttable tr").show();
setCookie("hideSMWFacts","false");
$("#SMWFactToggle").text("hide");
}
}

$(function () {
if ($("#mw-data-after-content table.smwfacttable tr").length == 0) {
$("#mw-data-after-content div.smwfact").hide();
} else {
$("#mw-data-after-content span.smwrdflink").after('<span style="float:right;">[<a href="javascript:;" onClick="toggleSMWFacts();" id="SMWFactToggle">hide</a>] &nbsp;</span>');
}
if (getCookie("hideSMWFacts") == "true") toggleSMWFacts();
ttMouseOver();
addAjaxDisplayLink();
wwScribbleMaps();
aCharLoad();
$("#bodyContent .quote").prepend("<span class='quotemark' style='float:right;'>&#8221;</span><span class='quotemark' style='float:left;'>&#8220;</span>").css("max-width","75%").after("<br clear='left' />");
});