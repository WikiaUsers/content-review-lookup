/*<source lang="javascript">*/
/*
 * ADVANCED AJAX AUTO-REFRESHING ARTICLES
 * Code courtesy of "pcj" of Wowpedia.
 */
var indicator = 'https://images.wikia.nocookie.net/ninjagostories/images/2/29/Loader.gif';
if (!window.ajaxPages) ajaxPages = new Array("Special:NewPages");
if (!window.ajaxCallAgain) ajaxCallAgain = [];
var ajaxTimer;
var ajaxRefresh = 0;
var refreshText = 'Auto-Refresh';
if( typeof AjaxRCRefreshText == "string" ) {
	refreshText = AjaxRCRefreshText;
}
var refreshHover = 'Checking this box enables auto-refreshing of this page!';
if( typeof AjaxRCRefreshHoverText == "string" ) {
	refreshHover = AjaxRCRefreshHoverText;
}
var doRefresh = true;
function setCookie(c_name,value,expiredays) {
var exdate=new Date()
exdate.setDate(exdate.getDate()+expiredays)
document.cookie=c_name+ "=" +escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}
 
function getCookie(c_name) {
if (document.cookie.length>0) {
c_start=document.cookie.indexOf(c_name + "=")
if (c_start!=-1) { 
c_start=c_start + c_name.length+1 
c_end=document.cookie.indexOf(";",c_start)
if (c_end==-1) c_end=document.cookie.length
return unescape(document.cookie.substring(c_start,c_end))
} 
}
return ""
}
 
function preloadAJAXRL() {
ajaxRLCookie = (getCookie("ajaxload-"+wgPageName)=="on") ? true:false;
appTo = ($("#WikiaPageHeader").length)?$("#WikiaPageHeader"):$(".firstHeading");
appTo.append('&nbsp;<span style="font-size: xx-small; line-height: 100%;" id="ajaxRefresh"><span style="cursor: help;" id="ajaxToggleText" title="' + refreshHover + '">' + refreshText + ':</span><input type="checkbox" style="margin-bottom: 0;" id="ajaxToggle"><span style="display: none;" id="ajaxLoadProgress"><img src="' + indicator + '" style="vertical-align: bottom; margin-top: -1px; position: absolute; z-index: -1;" border="0" alt="Refreshing page" /></span></span>');
$("#ajaxLoadProgress").ajaxSend(function (event, xhr, settings){
if (location.href == settings.url) $(this).show();
}).ajaxComplete (function (event, xhr, settings){
if (location.href == settings.url) {$(this).hide(); for(i in ajaxCallAgain){ajaxCallAgain[i]()};}
});
$("#ajaxToggle").click(toggleAjaxReload);
$("#ajaxToggle").attr("checked", ajaxRLCookie);
if (getCookie("ajaxload-"+wgPageName)=="on") loadPageData();
}
 
function toggleAjaxReload() {
if ($('#ajaxToggle').attr('checked') == 'checked') {
setCookie("ajaxload-"+wgPageName, "on", 30);
doRefresh = true;
loadPageData();
} else {
setCookie("ajaxload-"+wgPageName, "off", 30);
doRefresh = false;
clearTimeout(ajaxTimer);
}
}
 
function loadPageData() {
var cC = ($("#WikiaArticle").length)?"#WikiaArticle":"#bodyContent";
$(cC).load(location.href + " " + cC + " > *", function (data) { 
if (doRefresh) ajaxTimer = setTimeout("loadPageData();", ajaxRefresh);
});
}
 
$(function () { 
for (x in ajaxPages) {
if (wgPageName == ajaxPages[x] && $("#ajaxToggle").length==0) preloadAJAXRL();
}
});
/*</source>*/