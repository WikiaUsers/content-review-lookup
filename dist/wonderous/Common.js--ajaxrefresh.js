/* Any JavaScript here will be loaded for all users on every page load. */


/* ######################################################################## */
/* ### AJAX RC                                                          ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Automatically refresh "Recent changes" via AJAX     ### */
/* ### Credit:      User:pcj (http://www.wowpedia.org)                  ### */
/* ###              User:Porter21 (fallout.wikia.com)                   ### */
/* ######################################################################## */
 
var indicator = 'https://images.wikia.nocookie.net/infamous/images/d/de/Ajax-loader.gif';
var ajaxPages = new Array("Special:RecentChanges", "Special:WikiActivity", "Infamous Wiki:WikiActivity");
var ajaxTimer;
var ajaxRefresh = 60000;
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
   appTo = ($("#WikiaPageHeader").length)?$("#WikiaPageHeader > h1"):$(".firstHeading");
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
   if ($("#ajaxToggle").attr("checked") == true) {
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
 
 
 
importScriptPage('MediaWiki:Functions.js', 'starwars');
 
// onload stuff
var firstRun = true;
 
function loadFunc() {
	if( firstRun )
		firstRun = false;
	else
		return;
 
	initFunctionsJS();
 
	addHideButtons();
 
	substUsername();
}
 
function addHideButtons() {
	var hidables = getElementsByClass('hidable');
 
	for( var i = 0; i < hidables.length; i++ ) {
		var box = hidables[i];
		var button = getElementsByClass('hidable-button', box, 'span');
 
		if( button != null && button.length > 0 ) {
			button = button[0];
 
			button.onclick = toggleHidable;
			button.appendChild( document.createTextNode('[Hide]') );
 
			if( new ClassTester('start-hidden').isMatch(box) )
				button.onclick('bypass');
		}
	}
}
 
function toggleHidable(bypassStorage) {
	var parent = getParentByClass('hidable', this);
	var content = getElementsByClass('hidable-content', parent);
	var nowShown;
 
	if( content != null && content.length > 0 ) {
		content = content[0];
 
		if( content.style.display == 'none' ) {
			content.style.display = content.oldDisplayStyle;
			this.firstChild.nodeValue = '[Hide]';
			nowShown = true;
		} else {
			content.oldDisplayStyle = content.style.display;
			content.style.display = 'none';
			this.firstChild.nodeValue = '[Show]';
			nowShown = false;
		}
 
		if( window.storagePresent && ( typeof( bypassStorage ) == 'undefined' || bypassStorage != 'bypass' ) ) {
			var page = window.pageName.replace(/\W/g, '_');
			var items = getElementsByClass('hidable');
			var item = -1;
 
			for( var i = 0; i < items.length; i++ ) {
				if( items[i] == parent ) {
					item = i;
					break;
				}
			}
 
			if( item == -1 ) {
				return;
			}
 
			var storage = globalStorage[window.location.hostname];
			storage.setItem('hidableshow-' + item + '_' + page, nowShown);
		}
	}
}
 
addOnloadHook( loadFunc );
/* Test if an element has a certain class **************************************
  *
  * Description: Uses regular expressions and caching for better performance.
  * Taken from Wikipedia's Common.js.
  */
 
// <nowiki><pre>