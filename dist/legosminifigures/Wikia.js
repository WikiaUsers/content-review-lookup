importScriptPage('User:Joeytje50/ChatPMs.js', 'c');

/* Most of this by ToaMeiko */
/* Import jQuery UI */
importScriptURI('http://code.jquery.com/ui/1.8.24/jquery-ui.js');
 
/* Chat modifications */
importScriptPage('User:ToaMeiko/chat-global.js', 'c');
 
/* Wikia Skin Tweaks */
importScriptPage( 'User:ToaMeiko/skin-mods.js', 'c' );
 
/* Tundra - by Matthew2602 */
if (mw.loader.getModuleNames().indexOf("tundra") < 0) {
    mw.loader.implement("tundra", ["http://matthew2602.github.io/tundra/tundra.min.js"], {}, {});
}
 
/* Add Editcount tab on all user pages and user talk pages */
$(function() {
    var wikiUrl = window.location.hostname;
    var olds = $(".tabs-container > ul.tabs").html();
    var address = "http://" + wikiUrl + "/wiki/Special:Editcount/" + wgTitle;
    var adds = "<li data-id='editcount'><a href='" + address + "'>Editcount</a></li>";
    var news = olds + adds;
    $(".tabs-container > ul.tabs").html(news);
});
 
/* Add a link to Recent Changes to the Wikia nav */
if (wgUserGroups.indexOf('sysop')==-1||wgUserGroups.indexOf('bureaucrat')==-1) {
        $('.WikiHeader nav ul li.marked ul').append('<li class="subnav-2-item"><a class="subnav-2a" href="/wiki/Special:RecentChanges">Recent Changes</a></li>');
}
 
/* Add a link to Logs to the Wikia nav */
$(function() {
        $('.WikiHeader nav ul li.marked ul').append('<li class="subnav-2-item"><a class="subnav-2a" href="/wiki/Special:Log">Log</a></li>');
});
 
/* Add contributions link to the user dropdown on the Wikia bar */
$(document).ready(function() {
    $('<li id="MyContribs"><a href="/wiki/Special:MyContributions">My&nbsp;contributions</a>  </li>').insertAfter('.AccountNavigation > li > .subnav > li:first-child');
});
 
$(document).ready(function() {
    if (mw.config.get('wgUserGroups') === null)
        $('<li id="YourContributions"><a href="/wiki/Special:MyContributions">My&nbsp;contributions</a>  </li>').insertBefore('.contribute ul li:first-child');
});
 
/* Add editcount link to the user dropdown on the Wikia bar */
$(document).ready(function() {
    $('<li id="MyEditcount"><a href="/wiki/Special:Editcount/' + wgUserName + '">My&nbsp;editcount</a>  </li>').insertAfter('.AccountNavigation > li > .subnav > li:nth-child(3)');
});
 
/* Add quicklink to Special:Statistics */
$(document).ready(function() {
    $('<li class="overflow"><a href="/wiki/Special:Statistics">Statistics</a>&nbsp;(<a href="/wiki/Special:WikiStats">Advanced</a>)  </li>').insertAfter('.toolbar > .tools > li:nth-child(3)');
});
 
/* Wikia API CP on all wikis */
$(document).ready(function() {
    if (wgDBname !== "api542") {
        $('<li id="api-accountnav"><a href="http://api.wikia.com/wiki/Special:ApiGate">API&nbsp;Control&nbsp;Panel</a>  </li>').insertAfter('.AccountNavigation > li > .subnav > li:nth-child(4)');
    }
});
 
/* Purge page */
$(document).ready(function() {
    var currentPageURL = window.location.href;
    $('<li class="overflow"><a href="' + currentPageURL + '?action=purge">Purge this page</a></li>').appendTo('.WikiaBarWrapper .toolbar .tools .tools-menu');
});
 
importScriptPage( 'MediaWiki:Purge.js', 'meikotest' );
 
/* Search wiki on WAM feature */
$(document).ready(function() {
    var wikiWAMsearch = window.location.hostname;
    $('<li class="overflow"><a href="http://www.wikia.com/WAM?verticalId=&date=&langCode=&searchPhrase=' + wikiWAMsearch + '" target="_blank">Search this wiki on WAM</a></li>').appendTo('.WikiaBarWrapper .toolbar .tools .tools-menu');
});
 
/* Search Google */
$(document).ready(function() {
    $('<li class="overflow"><a href="http://www.google.com/search?q=' + wgPageName + '" target="_blank">Search&nbsp;this&nbsp;title&nbsp;on&nbsp;Google</a></li>').appendTo('.WikiaBarWrapper .toolbar .tools .tools-menu');
});
 
/* Admin CP link in Wikia Bar */
if (wgUserGroups.indexOf('sysop')!=-1||wgUserGroups.indexOf('bureaucrat')!=-1) {
    $('.WikiHeader nav ul li.marked ul').append('<li class="subnav-2-item"><a class="subnav-2a" href="/wiki/Special:AdminDashboard">Admin CP</a></li>');
}
 
/* QQX */
$(document).ready(function() {
    var qqxPageURL = window.location.href;
    $('<li class="overflow"><a href="' + qqxPageURL + '?uselang=qqx">View QQX</a>  </li>').insertAfter('.toolbar > .tools > li:nth-child(5)');
});
 
/* Quicklink to Special:Contact */
$(document).ready(function() {
    $('<li class="overflow"><a href="/wiki/Special:Contact/general">Contact Wikia</a>&nbsp;(<a href="mailto:support@wikia.com">Email</a>)  </li>').insertAfter('.toolbar > .tools > li:nth-child(6)');
});
 
/* DISABLED: Wiki Creation policy in footer */
/*
$(document).ready(function() {
    $('<li><a href="http://www.wikia.com/Wiki_Creation_Policy">Wiki Creation Policy</a></li>').insertAfter('.CorporateFooter ul li:nth-of-type(8)');
});
*/
 
/* Add link to my test wiki */
$(document).ready(function() {
    if (wgDBname !== "tonguesmiley") {
        $('<li id="TestWiki"><a href="http://tonguesmiley.wikia.com">Test&nbsp;Wiki</a>  </li>').insertAfter('.AccountNavigation > li > .subnav > li:nth-child(5)');
    }
});
 
/* Remove "Wiki Activity" from the contribute button since it's redundant to have it there and in the Wikia Bar */
$(document).ready(function() {
    $('.contribute .WikiaMenuElement li a[data-id="wikiactivity"]').remove();
    $('.contribute .WikiaMenuElement li:empty').remove();
});
 
/* View history link in edit window */
$(document).ready(function() {
    if ( wgNamespaceNumber == "0" ) {
         $('<span class="cke_toolbar_expand" style="padding-left: 10px; border-left: 1px solid #ccc;"><a class="expand" href="/wiki/' + wgTitle + '?action=history" target="_blank" style="display: inline;"><label>view history</label><span>⌚</span></a></span>').insertAfter('.cke_toolbar_expand:first-of-type');
    } else {
        $('<span class="cke_toolbar_expand" style="padding-left: 10px; border-left: 1px solid #ccc;"><a class="expand" href="/wiki/' + wgCanonicalNamespace + ':' + wgTitle + '?action=history" target="_blank" style="display: inline;"><label>view history</label><span>⌚</span></a></span>').insertAfter('.cke_toolbar_expand:first-of-type');
    }
});

/* By LUModder - used with permission */

 /* add a button that increases the content size and hides the rail - 2/1/11 */
function CreateContentResizeButton() {
	var headerWidth = $('header#WikiaPageHeader.WikiaPageHeader details').width();
	var contentWidth = $('article#WikiaMainContent.WikiaMainContent').width();
	var catlinksWidth = $('div#catlinks.catlinks').width();
	if(contentWidth < 1000) {
		$('section article header ul.wikia-menu-button').after('<ul class="wikia-menu-button" id="resizeButton" style="margin-left:10px"><a onclick="ExpandContent(' + headerWidth + ', ' + contentWidth + ', ' + catlinksWidth + ');" data-id="resizeButton" style="color:black;" title="Expands the content area. Note that this will hide the side rail."> Expand </a></ul>');
		$('section article header a.wikia-button').after('<ul class="wikia-menu-button" id="resizeButton" style="margin-left:10px"><a onclick="ExpandContent(' + headerWidth + ', ' + contentWidth + ', ' + catlinksWidth + ');" data-id="resizeButton" style="color:black;" title="Expands the content area. Note that this will hide the side rail."> Expand </a></ul>');
		$('section article header a.view-source').after('<ul class="wikia-menu-button" id="resizeButton" style="margin-left:10px"><a onclick="ExpandContent(' + headerWidth + ', ' + contentWidth + ', ' + catlinksWidth + ');" data-id="resizeButton" style="color:black;" title="Expands the content area. Note that this will hide the side rail."> Expand </a></ul>');
		if(wgCanonicalNamespace == 'User_blog') {
			$('section article div#WikiaUserPagesHeader a.wikia-button').after('<ul class="wikia-menu-button" id="resizeButton" style="margin-left:10px"><a onclick="ExpandContent(' + headerWidth + ', ' + contentWidth + ', ' + catlinksWidth + ');" data-id="resizeButton" style="color:black;" title="Expands the content area. Note that this will hide the side rail."> Expand </a></ul>');
		}
	}
}
 
addOnloadHook(CreateContentResizeButton);
 
function ExpandContent(headerWidth, contentWidth, catlinksWidth) {
	$('header#WikiaPageHeader.WikiaPageHeader details').css({"width": '980px'});
	$('article#WikiaMainContent.WikiaMainContent').css({"width": '1000px'});
	$('div#catlinks.catlinks').css({"width": '1000px'});
	$('div#WikiaRail.WikiaRail').css({"display": 'none'});
	$('ul#resizeButton').replaceWith('<ul class="wikia-menu-button" id="resizeButton" style="margin-left:10px"><a onclick="CompressContent(' + headerWidth + ', ' + contentWidth + ', ' + catlinksWidth + ');" data-id="resizeButton" style="color:black;" title="Compress the content area back to its original width, and restore the side rail."> Compress </a></ul>');
}
 
function CompressContent(headerWidth, contentWidth, catlinksWidth) {
	$('header#WikiaPageHeader.WikiaPageHeader details').css({"width": headerWidth});
	$('article#WikiaMainContent.WikiaMainContent').css({"width": contentWidth});
	$('div#catlinks.catlinks').css({"width": catlinksWidth});
	$('div#WikiaRail.WikiaRail').css({"display": 'block'});
	$('ul#resizeButton').replaceWith('<ul class="wikia-menu-button" id="resizeButton" style="margin-left:10px"><a onclick="ExpandContent(' + headerWidth + ', ' + contentWidth + ', ' + catlinksWidth + ');" data-id="resizeButton" style="color:black;" title="Expands the content area. Note that this will hide the side rail."> Expand </a></ul>');
}