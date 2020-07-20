////////////////////////////////////////////////////////////////
// ADVANCED AJAX AUTO-REFRESHING ARTICLES
// Code courtesy of "pcj" of WoWWiki.
////////////////////////////////////////////////////////////////
 
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
 
article = "";
 
// AJAX RC
var ajaxPages = new Array("Wikia discussies", "Speciaal:Volglijst", "Speciaal:Logboeken", "Speciaal:Bijdragen", "Speciaal:RecenteWijzigingen", "Forum:Index");
var ajaxRCOverride = false;
var rcTimer;
var doRefresh = true;
var rcRefresh = 60000;
ajaxRCCookie = (getCookie("ajaxRC")=="on"||ajaxRCOverride) ? true:false;
 
function ajaxRC() {
appTo = ($("#WikiaPageHeader").length)?$("#WikiaPageHeader"):$(".firstHeading");
appTo.append(' <span style="font-size: xx-small; border-bottom: 1px dotted; cursor:help;" title="Enable auto-refreshing page loads">AJAX:</span><input type="checkbox" id="ajaxToggle"><span style="position:relative; top:5px; left:5px;" id="ajaxRCprogress"><img src="https://images.wikia.nocookie.net/__cb20080505054258/wowwiki/images/0/0e/Progressbar.gif" border="0" alt="AJAX operation in progress" /></span>');
$("#ajaxRCprogress").bind("ajaxSend", function (){
$(this).show();
}).bind("ajaxComplete", function (){
$(this).hide();
});
$("#ajaxToggle").click(toggleRC);
$("#ajaxRCprogress").hide();
$("#ajaxToggle").attr("checked", ajaxRCCookie);
if (ajaxRCCookie) loadRCData();
}
 
function toggleRC() {
if ($("#ajaxToggle").attr("checked") == true) {
setCookie("ajaxRC", "on", 30);
doRefresh = true;
loadRCData();
} else {
setCookie("ajaxRC", "off", 30);
doRefresh = false;
clearTimeout(rcTimer);
}
}
 
function loadRCData() {
$(article).load(location.href + " "+article, function (data) { 
if (doRefresh) rcTimer = setTimeout("loadRCData();", rcRefresh);
});
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
$(article+" table.zebra > tbody > tr").css("background-color","transparent");
ac = (skin=="monobook")?"#e9e9ff":"#2c2c2c";
$(article+" table.zebra > tbody > tr:nth-child(2n+1)").css("background-color",ac);
});
}
});
zebraAJAX = $(article+" .ajax td > table.zebra > tbody > tr");
if (zebraAJAX.eq(1).css("background-color") == "transparent" && zebraAJAX.eq(2).css("background-color") == "transparent") {
$(article+" .ajax td > table.zebra > tbody > tr:nth-child(2n+1)").css("background-color","#2c2c2c");
if (skin == "monobook") $("#bodyContent .ajax td > table.zebra > tbody > tr:nth-child(2n+1)").css("background-color","#e9e9ff");
}
$("#stl" + tableNum).html('[<a href="/'+tablePage+'?action=edit">edit</a>] [<a href="javascript:;" id="htl' + tableNum + '" onClick="hideTable(' + tableNum + ');">hide</a>]');
ttMouseOver();
}
});
}
 
function addAjaxDisplayLink() {
$(article+" table.ajax").each(function (i) {
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
article = ($("#WikiaArticle").length)?"#WikiaArticle":"#bodyContent";
 
for (x in ajaxPages) { if (wgPageName == ajaxPages[x] && $("#ajaxToggle").length==0) ajaxRC(); }
if (wgCanonicalNamespace == "Portal") doPortals();
$(window).error(function(){ return true; });
if ($("#mw-data-after-content table.smwfacttable tr").length == 0) {
$("#mw-data-after-content div.smwfact").hide();
} else {
$("#mw-data-after-content span.smwrdflink").after('<span style="float:right;">[<a href="javascript:;" onClick="toggleSMWFacts();" id="SMWFactToggle">hide</a>]  </span>');
}
if (getCookie("hideSMWFacts") == "true") toggleSMWFacts();
ttMouseOver();
addAjaxDisplayLink();
createCollapseButtons();
createNavigationBarToggleButton();
changeTS();
wwScribbleMaps();
requireImageLicense();
aCharLoad();
loadGSList();
if ($("#mw-dupimages").length) findDupImages();
if (wgUserName != null) $("span.insertusername").html(wgUserName);
$(article+" .quote").prepend("<span class='quotemark' style='float:right;'>”</span><span class='quotemark' style='float:left;'>“</span>").css("max-width","75%").after("<br clear='left' />");
$(".mw-mpt-link").html("<a href='/Special:WhatLinksHere/"+$(".firstHeading").text().replace("Move ","").replace(/'/g,"%27")+"'>Links to the old page title</a>");
});
 
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// END OF AJAX AUTO-REFRESH
///////////////////////////////////////////////////////////////////////////////////////////////////////////