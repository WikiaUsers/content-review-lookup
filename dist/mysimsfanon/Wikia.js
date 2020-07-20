importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('InactiveUsers/code.js', 'dev');

/* change wiki activity to recent changes */
function WikiActivity2RecentChanges() {
	$('.wikia-button[data-id$="wikiactivity"]').replaceWith('<a data-id="recentchanges" class="wikia-button secondary" accesskey="g" title="Special:RecentChanges" href="/wiki/Special:RecentChanges"><img height="0" width="0" class="sprite activity" src="https://images.wikia.nocookie.net/common/skins/common/blank.gif">Recent Changes</a>');
}
   
addOnloadHook(WikiActivity2RecentChanges);
/* auto refresh */
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

/** Timers; imported from CoD wiki**********************************************
var rate = 10;
var revealDate = new Date('June 5 12:00:00 2012');
 
function initLoadTimer() {
 updateTimer();
}
 
function whenZero(){
 clearTimeout(t);
 $("#timer h4").hide();
 $("#timer h3").toggleClass('hidden');
}
 
function updateTimer() {
 var currDate = (new Date()).getTime();
 var endDate = revealDate.getTime();
 var diff_sec = (Math.floor((endDate - currDate) / rate)/100).toFixed(2);
 if (diff_sec < 0) {
 whenZero();
 } else {
 var t = setTimeout("updateTimer()",rate);
 }
 var ttt = ("0000000000" + diff_sec).slice(-10);
 $("#timer h4").html(ttt);
}
 
$(document).ready(function() {
 initLoadTimer();
});

/* add a button that increases the content size and hides the rail */
function CreateContentResizeButton() {
	var contentWidth = $('#WikiaMainContent').width();
	var catlinksWidth = $('#catlinks').width();
	var html = '<ul class="wikia-menu-button" id="resizeButton" style="margin-left:10px"><a onclick="ExpandContent(' + contentWidth + ', ' + catlinksWidth + ');" data-id="resizeButton" style="color:#fff;" title="Expands the content area. Note that this will hide the side rail."> Expand <--> </a></ul>';
	if(contentWidth < 1000) {
		if($('#WikiHeader .wikia-menu-button').length > 0) {$('#WikiHeader .wikia-menu-button').after(html);}
		if($('#WikiHeader .wikia-button').length > 0) {$('#WikiHeader .wikia-button').after(html);}
		if($('#WikiHeader .view-source').length > 0) {$('#WikiHeader .view-source').after(html);}
		if(wgCanonicalNamespace == 'User_blog') {$('#WikiaUserPagesHeader .wikia-button').after(html);}
	}
}
addOnloadHook(CreateContentResizeButton);
 
function ExpandContent(contentWidth, catlinksWidth) {
	document.getElementById('WikiaMainContent').style.width = '1000px';
	document.getElementById('catlinks').style.width = '1000px';
	document.getElementById('WikiaRail').style.display = 'none';
	$('#resizeButton a').replaceWith('<a onclick="CompressContent(' + contentWidth + ', ' + catlinksWidth + ');" data-id="resizeButton" style="color:#fff;" title="Compress the content area back to its original width, and restore the side rail."> Compress >--< </a>');
}

function CompressContent(contentWidth, catlinksWidth) {
	document.getElementById('WikiaMainContent').style.width = contentWidth;
	document.getElementById('catlinks').style.width = catlinksWidth;
	document.getElementById('WikiaRail').style.display = 'block';
	$('#resizeButton a').replaceWith('<a onclick="ExpandContent(' + contentWidth + ', ' + catlinksWidth + ');" data-id="resizeButton" style="color:#fff;" title="Expands the content area. Note that this will hide the side rail."> Expand <--> </a>');
}

/* Snow */
importScriptPage('MediaWiki:Snow.js');