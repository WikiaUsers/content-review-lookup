/* Any JavaScript here will be loaded for all users on every page load. */
/* ######################################################################## */
/* ### AJAX RC                                                          ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Automatically refresh "Recent changes" via AJAX     ### */
/* ### Credit:      User:pcj (http://www.wowpedia.org)                  ### */
/* ###              User:Porter21 (fallout.wikia.com)                   ### */
/* ######################################################################## */
 
var indicator = 'https://images.wikia.nocookie.net/__cb20110724185410/prototype/images/d/de/Ajax-loader.gif';
var ajaxPages = new Array("Special:RecentChanges", "Special:WikiActivity", "Prototype Wiki:WikiActivity", "Special:NewFiles");
var ajaxTimer;
var ajaxRefresh = 30000;
var refreshText = 'Auto-refresh';
if( typeof AjaxRCRefreshText == "string" ) {
	refreshText = AjaxRCRefreshText;
}
var refreshHover = 'Enable auto-refreshing page loads';
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
   appTo = ($("#WikiaPageHeader").length)?$("#WikiaPageHeader > h1" ) : ( $( "#AdminDashboardHeader" ).length ? $( "#AdminDashboardHeader > h1" ):$(".firstHeading") );
   appTo.append('&#160;<span style="font-size: xx-small; line-height: 100%;" id="ajaxRefresh"><span style="border-bottom: 1px dotted; cursor: help;" id="ajaxToggleText" title="' + refreshHover + '">' + refreshText + ':</span><input type="checkbox" style="margin-bottom: 0;" id="ajaxToggle"><span style="display: none;" id="ajaxLoadProgress"><img src="' + indicator + '" style="vertical-align: baseline;" border="0" alt="Refreshing page" /></span></span>');
   $("#ajaxLoadProgress").ajaxSend(function (event, xhr, settings){
      if (location.href == settings.url) $(this).show();
   }).ajaxComplete (function (event, xhr, settings){
      if (location.href == settings.url) $(this).hide();
   });
   $("#ajaxToggle").click(toggleAjaxReload);
   $("#ajaxToggle").attr("checked", ajaxRLCookie);
   if (getCookie("ajaxload-"+wgPageName)=="on") loadPageData();
}
 
function toggleAjaxReload() {
   if ($("#ajaxToggle").prop("checked") == true) {
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
   cC = ($("#WikiaArticle").length)?"#WikiaArticle":"#bodyContent";
   $(cC).load(location.href + " " + cC + " > *", function (data) { 
      if (doRefresh) ajaxTimer = setTimeout("loadPageData();", ajaxRefresh);
   });
}
addOnloadHook(function(){ for (x in ajaxPages) { if (wgPageName == ajaxPages[x] && $("#ajaxToggle").length==0) preloadAJAXRL() } } );