/* Any JavaScript here will be loaded for all users on every page load. */

/************************************************************/
/* HIGHLIGHT EFFECT FOR IMAGES                              */
/************************************************************/
 
$(function() {
	$('div.fadein img').css('opacity','0.7');
	$('div.fadein img').mouseover(function() {
		$(this).animate({opacity:1},800);
	}).mouseout(function() {
		$(this).animate({opacity:0.7},800);
	});
});
 
 
/************************************************************/
/* FADE-IN FADE-OUT EFFECT FOR IMAGES                       */
/************************************************************/
$(document).ready(function() {
	$('div.fadeout img').mouseenter(function(){
		$(this).animate({opacity:0.2},800);
	}).mouseleave(function(){
		$(this).animate({opacity:1},800);
	});
});

// ============================================================
// BEGIN JavaScript title rewrite -- jQuery version and new wikia skin fixes by Grunny
 
function rewriteTitle() {
	if( typeof( window.SKIP_TITLE_REWRITE ) != 'undefined' && window.SKIP_TITLE_REWRITE ) {
		return;
	}
 
	if( $('#title-meta').length == 0 ) {
		return;
	}
 
	var newTitle = $('#title-meta').html();
	if( skin == "oasis" ) {
		$('header.WikiaPageHeader > h1').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
		$('header.WikiaPageHeader > h1').attr('style','text-align:' + $('#title-align').html() + ';');
	} else {
		$('.firstHeading').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
		$('.firstHeading').attr('style','text-align:' + $('#title-align').html() + ';');
	}
}
 
function showEras(className) {
	if( skin == 'oasis' ) {
		return;
	}
 
	if( typeof( SKIP_GAMES ) != 'undefined' && SKIP_GAMES )
		return;
 
	var titleDiv = document.getElementById( className );
 
	if( titleDiv == null || titleDiv == undefined )
		return;
 
	var cloneNode = titleDiv.cloneNode(true);
	var firstHeading = getFirstHeading();
	firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
	cloneNode.style.display = "block";
}
// END JavaScript title rewrite
 
function initVisibility() {
	var page = window.pageName.replace(/\W/g,'_');
	var show = localStorage.getItem('infoboxshow-' + page);
 
	if( show == 'false' ) {
		infoboxToggle();
	}
 
	var hidables = getElementsByClass('hidable');
 
	for(var i = 0; i < hidables.length; i++) {
		show = localStorage.getItem('hidableshow-' + i  + '_' + page);
 
		if( show == 'false' ) {
			var content = getElementsByClass('hidable-content', hidables[i]);
			var button = getElementsByClass('hidable-button', hidables[i]);
 
			if( content != null && content.length > 0 &&
				button != null && button.length > 0 && content[0].style.display != 'none' )
			{
				button[0].onclick('bypass');
			}
		} else if( show == 'true' ) {
			var content = getElementsByClass('hidable-content', hidables[i]);
			var button = getElementsByClass('hidable-button', hidables[i]);
 
			if( content != null && content.length > 0 &&
				button != null && button.length > 0 && content[0].style.display == 'none' )
			{
				button[0].onclick('bypass');
			}
		}
	}
}
 
function onArticleNavClick() {
	var div = document.getElementById('mp3-nav');
 
	if( div.style.display == 'block' )
		div.style.display = 'none';
	else
		div.style.display = 'block';
}
 
function addAlternatingRowColors() {
	var infoboxes = getElementsByClass('infobox', document.getElementById('content'));
 
	if( infoboxes.length == 0 )
		return;
 
	for( var k = 0; k < infoboxes.length; k++ ) {
		var infobox = infoboxes[k];
 
		var rows = infobox.getElementsByTagName('tr');
		var changeColor = false;
 
		for( var i = 0; i < rows.length; i++ ) {
			if(rows[i].className.indexOf('infoboxstopalt') != -1)
			break;
 
			var ths = rows[i].getElementsByTagName('th');
 
			if( ths.length > 0 ) {
				continue;
			}
 
			if(changeColor)
				rows[i].style.backgroundColor = '#f9f9f9';
			changeColor = !changeColor;
		}
	}
}

function initVisibility() {
	var page = window.pageName.replace(/\W/g,'_');
	var show = localStorage.getItem('infoboxshow-' + page);
 
	if( show == 'false' ) {
		infoboxToggle();
	}
 
	var hidables = getElementsByClass('hidable');
 
	for(var i = 0; i < hidables.length; i++) {
		show = localStorage.getItem('hidableshow-' + i  + '_' + page);
 
		if( show == 'false' ) {
			var content = getElementsByClass('hidable-content', hidables[i]);
			var button = getElementsByClass('hidable-button', hidables[i]);
 
			if( content != null && content.length > 0 &&
				button != null && button.length > 0 && content[0].style.display != 'none' )
			{
				button[0].onclick('bypass');
			}
		} else if( show == 'true' ) {
			var content = getElementsByClass('hidable-content', hidables[i]);
			var button = getElementsByClass('hidable-button', hidables[i]);
 
			if( content != null && content.length > 0 &&
				button != null && button.length > 0 && content[0].style.display == 'none' )
			{
				button[0].onclick('bypass');
			}
		}
	}
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

/**
 * Dynamic Navigation Bars. See [[Wikipedia:NavFrame]]
 * 
 * Based on script from en.wikipedia.org, 2008-09-15.
 *
 * @source www.mediawiki.org/wiki/MediaWiki:Gadget-NavFrame.js
 * @maintainer Helder.wiki, 2012–2013
 * @maintainer Krinkle, 2013
 */
( function () {
 
// Set up the words in your language
var collapseCaption = 'hide';
var expandCaption = 'show';
 
var navigationBarHide = '[' + collapseCaption + ']';
var navigationBarShow = '[' + expandCaption + ']';
 
/**
 * Shows and hides content and picture (if available) of navigation bars.
 *
 * @param {number} indexNavigationBar The index of navigation bar to be toggled
 * @param {jQuery.Event} e Event object
 */
function toggleNavigationBar( indexNavigationBar, e ) {
	var navChild,
		navToggle = document.getElementById( 'NavToggle' + indexNavigationBar ),
		navFrame = document.getElementById( 'NavFrame' + indexNavigationBar );
 
	// Prevent browser from jumping to href "#"
	e.preventDefault();
 
	if ( !navFrame || !navToggle ) {
		return false;
	}
 
	// If shown now
	if ( navToggle.firstChild.data == navigationBarHide ) {
		for ( navChild = navFrame.firstChild; navChild != null; navChild = navChild.nextSibling ) {
			if ( hasClass( navChild, 'NavPic' ) ) {
				navChild.style.display = 'none';
			}
			if ( hasClass( navChild, 'NavContent' ) ) {
				navChild.style.display = 'none';
			}
		}
		navToggle.firstChild.data = navigationBarShow;
 
	// If hidden now
	} else if ( navToggle.firstChild.data == navigationBarShow ) {
		for ( navChild = navFrame.firstChild; navChild != null; navChild = navChild.nextSibling ) {
			if ( $( navChild ).hasClass( 'NavPic' ) || $( navChild ).hasClass( 'NavContent' ) ) {
				navChild.style.display = 'block';
			}
		}
		navToggle.firstChild.data = navigationBarHide;
	}
}
 
/**
 * Adds show/hide-button to navigation bars.
 *
 * @param {jQuery} $content
 */
function createNavigationBarToggleButton( $content ) {
	var i, j, navFrame, navToggle, navToggleText, navChild,
		indexNavigationBar = 0,
		navFrames = $content.find( 'div.NavFrame' ).toArray();
 
	// Iterate over all (new) nav frames
	for ( i = 0; i < navFrames.length; i++ ) {
		navFrame = navFrames[i];
		// If found a navigation bar
		indexNavigationBar++;
		navToggle = document.createElement( 'a' );
		navToggle.className = 'NavToggle';
		navToggle.setAttribute( 'id', 'NavToggle' + indexNavigationBar );
		navToggle.setAttribute( 'href', '#' );
		$( navToggle ).on( 'click', $.proxy( toggleNavigationBar, null, indexNavigationBar ) );
 
		navToggleText = document.createTextNode( navigationBarHide );
		for ( navChild = navFrame.firstChild; navChild != null; navChild = navChild.nextSibling ) {
			if ( $( navChild ).hasClass( 'NavPic' ) || $( navChild ).hasClass( 'NavContent' ) ) {
				if ( navChild.style.display == 'none' ) {
					navToggleText = document.createTextNode( navigationBarShow );
					break;
				}
			}
		}
 
		navToggle.appendChild( navToggleText );
		// Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
		for ( j = 0; j < navFrame.childNodes.length; j++ ) {
			if ( $( navFrame.childNodes[j] ).hasClass( 'NavHead' ) ) {
				navFrame.childNodes[j].appendChild( navToggle );
			}
		}
		navFrame.setAttribute( 'id', 'NavFrame' + indexNavigationBar );
	}
}
 
mw.hook( 'wikipage.content' ).add( createNavigationBarToggleButton );
 
}());

CSS

/* Standard Navigationsleisten, aka box hiding thingy
   from .de.  Documentation at [[Wikipedia:NavFrame]]. */
div.NavFrame {
    margin: 0;
    padding: 4px;
    border: 1px solid #aaa;
    text-align: center;
    border-collapse: collapse;
    font-size: 95%;
}
div.NavFrame + div.NavFrame {
    border-top-style: none;
    border-top-style: hidden;
}
div.NavPic {
    background-color: #fff;
    margin: 0;
    padding: 2px;
    /* @noflip */
    float: left;
}
div.NavFrame div.NavHead {
    height: 1.6em;
    font-weight: bold;
    background-color: #ccf;
    position: relative;
}
div.NavFrame p,
div.NavFrame div.NavContent,
div.NavFrame div.NavContent p {
    font-size: 100%;
}
div.NavEnd {
    margin: 0;
    padding: 0;
    line-height: 1px;
    clear: both;
}
a.NavToggle {
    position: absolute;
    top: 0;
    /* @noflip */
    right: 3px;
    font-weight: normal;
    font-size: 90%;
}


Avatar Wiki

    On the Wiki
        Wiki Activity
        Random page
        Videos
        New images
        Forum
        Random article
        Parent Page
    Universe
    Media
    Community
    Network

Contribute
Watchlist	Random page	Recent changes
Common.js
Edit
Talk3
10,007pages on
this wiki
MediaWiki page

Note: After saving, you have to bypass your browser's cache to see the changes.

    Internet Explorer: hold down the Ctrl key and click the Refresh or Reload button, or press Ctrl+F5.
    Firefox: hold down the Shift key while clicking Reload; alternatively press Ctrl+F5 or Ctrl-Shift-R.
    Opera users have to clear their caches through Tools→Preferences
    Konqueror and Safari users can just click the Reload button.
    Chrome: press Ctrl+F5 or Shift+F5 

importArticles({
	type: "script",
	articles: [
		"w:dev:ShowHide/code.js", /* Collapsible elements and tables */
		"w:dev:PurgeButton/code.js", /* Add "purge" option to page controls */
		"w:dev:DisableArchiveEdit/code.js", /* Discourage/disable the editing of talk page archives */
		"w:dev:Countdown/code.js", /* Countdown clock */
                "w:dev:ReferencePopups/code.js", /* Reference Popups */
		"MediaWiki:Common.js/imports.js", /* UserTags and AjaxRC */
                "MediaWiki:Common.js/randompagelink.js", /* Special:Random/main link appended to the "On the Wiki" navigation menu */
                "MediaWiki:Common.js/parentpage.js", /* Parent page link appended to the "On the Wiki" navigation menu */
		"MediaWiki:Common.js/insertusername.js", /* User name replace for Template:USERNAME */
		"MediaWiki:Common.js/disableforumedit.js", /* Discourage/disable the editing of forum archives */
		"MediaWiki:Common.js/disablecommentsblogs.js", /* Disable blog comments on old blog posts */
		"MediaWiki:Common.js/disablecomments.js", /* Disable comments for specified pages at discretion */
		"MediaWiki:Common.js/wallgreetingbutton.js", /* Add a button to edit Message Wall Greeting */
		"MediaWiki:Common.js/socialmedia.js", /* Add social media buttons to blog posts */
//		"MediaWiki:Common.js/addnavlinks.js", /* Add "about us" and IRC links to "On the Wiki" menu */
		"MediaWiki:Common.js/icons.js", /* Adds icons to page header bottom border */
		"MediaWiki:Common.js/filluploadform.js", /* Fills the summary field in upload form with imagebox */
		"MediaWiki:Common.js/hubfix.js", /* Temporary fix for Wikia hubs: Gaming > Entertainment */
		"MediaWiki:Common.js/customizeforums.js", /* Wikia forum feature changes (possibly more to come) */
		"MediaWiki:Common.js/fanonmodule.js", /* Create WikiaRail element to advertise the fanon portal */
                "MediaWiki:Common.js/votesfordeletion.js", /* Javascript for the VfD page */
                "MediaWiki:Common.js/fanonsubscriptionmodule.js", /* Tool used to automate mass-posting on message walls with an easy UI. */
                "MediaWiki:Common.js/fanonwordmarklink.js", /* Wordmark in fanon namespace links to the fanon main page */
                "MediaWiki:Common.js/createfanonfix.js", /* Fixes problems with the "Create fanon main page" feature on [[Avatar Wiki:Create fanon page]] */
                "MediaWiki:Common.js/slider.js", /* "Slider" header for main page */
                "MediaWiki:Common.js/masterblogprepend.js", /* Trial system for prepending blogs on the listing for Avatar news */
                "MediaWiki:Common.js/JsTabs.js", /* Used for the function of [[Template:JsTabs]] */
	]
});

// ============================================================
// BEGIN Dynamic Navigation Bars (experimental)
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
 
/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */
 
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();
 
 /** Dynamic Navigation Bars (experimental) *************************************
  *
  *  Description: See [[Wikipedia:NavFrame]].
  *  Maintainers: UNMAINTAINED
  */
 
  // set up the words in your language
  var NavigationBarHide = '[' + collapseCaption + ']';
  var NavigationBarShow = '[' + expandCaption + ']';
 
  // set up max count of Navigation Bars on page,
  // if there are more, all will be hidden
  // NavigationBarShowDefault = 0; // all bars will be hidden
  // NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
  var NavigationBarShowDefault = autoCollapse;
 
 
  // shows and hides content and picture (if available) of navigation bars
  // Parameters:
  //     indexNavigationBar: the index of navigation bar to be toggled
  function toggleNavigationBar(indexNavigationBar)
  {
     var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
     var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
     if (!NavFrame || !NavToggle) {
         return false;
     }
 
     // if shown now
     if (NavToggle.firstChild.data.substring(0,NavigationBarHide.length) == NavigationBarHide) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild !== null;
                 NavChild = NavChild.nextSibling
             ) {
             if ( hasClass( NavChild, 'NavPic' ) ) {
                 NavChild.style.display = 'none';
             }
             if ( hasClass( NavChild, 'NavContent') ) {
                 NavChild.style.display = 'none';
             }
         }
     NavToggle.firstChild.data = NavigationBarShow + ' ' + NavToggle.firstChild.data.substring(NavigationBarHide.length);
 
     // if hidden now
     } else if (NavToggle.firstChild.data.substring(0,NavigationBarShow.length) == NavigationBarShow) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild !== null;
                 NavChild = NavChild.nextSibling
             ) {
             if (hasClass(NavChild, 'NavPic')) {
                 NavChild.style.display = 'block';
             }
             if (hasClass(NavChild, 'NavContent')) {
                 NavChild.style.display = 'block';
             }
         }
     NavToggle.firstChild.data = NavigationBarHide + ' ' +NavToggle.firstChild.data.substring(NavigationBarShow.length);
     }
  }
 
  // adds show/hide-button to navigation bars
  function createNavigationBarToggleButton()
  {
     var indexNavigationBar = 0;
     // iterate over all < div >-elements 
     var divs = document.getElementsByTagName("div");
     for(
             var i=0; 
             NavFrame = divs[i]; 
             i++
         ) {
         // if found a navigation bar
         if (hasClass(NavFrame, "NavFrame")) {
             indexNavigationBar++;
             // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked) 
             for(var j=0;j < NavFrame.childNodes.length;j++) {
               if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                 var NavToggle = document.createElement("a");
                 NavToggle.className = 'NavToggle';
                 NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
                 NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
                 var NavToggleText = document.createTextNode(NavigationBarHide);
                 NavToggle.appendChild(NavToggleText);
                 NavFrame.childNodes[j].appendChild(NavToggle);
               }
               // This is a hack particular to help.wikia for having the title clickable, meh
               if (hasClass(NavFrame.childNodes[j], "NavHeadToggle")) {
                 var NavToggle = document.createElement("a");
                 NavToggle.className = 'NavToggleTitle';
                 NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
                 NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
                 var NavToggleText = document.createTextNode(NavigationBarHide + ' ' + NavFrame.childNodes[j].firstChild.nodeValue);
                 NavToggle.appendChild(NavToggleText);
                 NavFrame.childNodes[j].appendChild(NavToggle);
                 NavFrame.childNodes[j].firstChild.nodeValue='';
               }
 
             }
             NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
         }
     }
     // if more Navigation Bars found than Default: hide all
     if (NavigationBarShowDefault < indexNavigationBar) {
         for(var i=1;i<=indexNavigationBar;i++) {
             toggleNavigationBar(i);
         }
     }
 
  } 
  addOnloadHook( createNavigationBarToggleButton );
 
// END Dynamic Navigation Bars (experimental)
// ============================================================
// ============================================================
 
// *************************************************
// Pagetitle rewrite
//
// Rewrites the page's title, used by Template:Title
// *************************************************
 
$(function(){
	var newTitle = $("#title-meta").html();
	if (!newTitle) return;
	var edits = $("#user_masthead_since").text();
	$(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
	$("#user_masthead_head h2").html(newTitle + "<small id='user_masthead_since'>" + edits + "</small>");
});
 
 
// ********************
// IRC AND CVNIRC LOGIN
// ********************
 
$(function() {
    if ($('#IRClogin').length || $('#CVNIRClogin').length) {
        var nick = '';
        if (mw.config.get('wgUserName') === null) {
            nick = 'Wikian' + Math.floor(Math.random() * 100);
        } else {
            nick = mw.config.get('wgUserName').replace(/ /g, "_");
        }
 
        $('#IRClogin').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=reddit-mlp&prompt=true" width="660" height="400" style="border:0;"></iframe>');
 
        $('#CVNIRClogin').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=cvn-wikia-mlp&prompt=true" width="660" height="400" style="border:0;"></iframe>');
    }
});
 
// ****************
// Duplicate images
// ****************
if (mw.config.get('wgPageName') === "My_Little_Pony_Friendship_is_Magic_Wiki:Duplicate_images"){
  importScriptPage('DupImageList/code.js', 'dev'); //please for the love of Celestia someone fix this darn thing (see talk page)
}
 
// ***************
// Chat appearance
// ***************
 
// Change chat description
if ($('section.ChatModule').length > 0){
	$.get("/wiki/MediaWiki:Chat-headline?action=raw", function(result){
		if ($('p.chat-name').length > 0){
			$('p.chat-name').html(result);
		}else{
			var chatDescInt = setInterval(function() {
				if ($('p.chat-name').length > 0){
					$('p.chat-name').html(result);
					clearInterval(chatDescInt);
				}
			}, 50);
		}
	});
}
 
//**********************************
// Support for [[Template:USERNAME]]
//**********************************
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
 
// *** Custom user rights icons on userpages ***
if ({'User':1, 'User_blog':1, 'User_talk':1}[mw.config.get('wgCanonicalNamespace')] || mw.config.get('wgPageName').indexOf('Special:Contributions') !== -1){
    importScript('MediaWiki:Common.js/userRightsIcons.js');
}
 
// Auto-insert link from anchor on [[Help:Red links]]
// Please report anything that still doesn't work right, it may need more exceptions
$(document).ready(function(){
    var redlink = window.location.hash;
    if (mw.config.get('wgPageName') === 'Help:Red_links' && redlink !== '') {
        redlink = redlink.slice(1);
        if (redlink.charAt(0) === ':') { redlink = redlink.substring(1); }
        if (redlink.substr(0, 5) !== 'File:') {
            redlink = redlink.replace(/\./g, '%');
        } else {
            var head = redlink.substring(0, redlink.lastIndexOf('.'));
            var tail = redlink.substring(redlink.lastIndexOf('.'));
            redlink = head.replace(/\./g, '%') + tail;
        }
        $("#insertredlink a").attr("href", "/wiki/" + decodeURIComponent(redlink) + "?action=history");
        $("#insertredlink a").css("font-weight", "bold");
    }
});
 
// Automatically uncheck "Leave a redirect behind" on files
if (mw.config.get('wgPageName').indexOf('Special:MovePage/File:') !== -1) {
    $('input#wpLeaveRedirect').removeAttr('checked');
}
 
// Support for multicolumn TOCs
// Usage: <div class="toc-multicol">__TOC__</div>
//needs updating whenever Wikia gets around to fixing the new TOC at least partially
//  changing all #toc ul to #toc ol doesn't quite work
$(window).load(function(){
  if ($(".toc-multicol #toc").size() !== 0) {
    $(function(){
		var x, tdToAppend, listToAppend, showtext = 'show', hidetext = 'hide';
		$("#toc").css("width","100%"); //need to subtract 12px from this for padding for some reason
		$("#toc ul").html("<table><tr><td>" + $("#toc ul").html() + "</td></tr></table>");
		var liList = $("#toc ul li").toArray();
 
		$('table#toc ul').remove();
		if (liList.length % 3 === 0) {
			x = 0;
		}else{
			x = 3 - (liList.length % 3);
		}
		var perCol = (liList.length + x) / 3;
 
		for (var colNum=0; colNum < 3; colNum++){
			listToAppend = "";
			for (var i=0+(colNum*perCol); i<(perCol*(colNum+1)); i++){
				if (typeof(liList[i]) == "undefined"){break;}
				tempElement = document.createElement("div");
				tempElement.appendChild(liList[i]);
				listToAppend += tempElement.innerHTML;
			}
			tdToAppend += '<td style="vertical-align: top; width: 33%;"><ul><table><tbody><tr><td><table><tbody><tr><td><table><tbody><tr><td>'+listToAppend+'</td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></ul></td>';
		}
 
		$('#toc tbody').append('<tr>'+tdToAppend+'</tr>');
		$('#toc tbody tr:eq(0) td').attr("colspan", "3");
		var indentFactor = 10;
		$("head").append("<style>.toclevel-1{padding-left: "+(indentFactor*1)+"px !important}.toclevel-2{padding-left: "+(indentFactor*2)+"px !important}.toclevel-3{padding-left: "+(indentFactor*3)+"px !important}.toclevel-4{padding-left: "+(indentFactor*4)+"px !important}</style>");
		$("#togglelink").off("click").click(function(e){e.preventDefault(); $('#toc ul').slideToggle("fast");
			if ($(this).text() === showtext) { $(this).text(hidetext); } else { $(this).text(showtext); } });
		if (!$('#toc ul').is(':hidden') && $('#togglelink').text() === showtext) {
			$('#togglelink').text(hidetext);
		}
    });
  }
});
 
 
// Alert contributors when they are editing with their bot flag set
if ((mediaWiki.config.get("wgAction") === "edit" || mediaWiki.config.get("wgAction") === "submit") && mediaWiki.config.get("wgUserGroups").indexOf("bot") !== -1){
   $("#EditPageHeader").after('<div id="botWarning" style="background-color: red; display:block; padding: 5px 0px; text-align: center; font-weight: bold; font-size: 110%;">NOTE: You are currently editing with your bot flag set.</div>');
}
 
//Add a "view source" button when the Edit button goes to Special:SignUp
$(document).ready(function() {
    var $a = $('a[data-id="edit"]');
    if ($a.length && $a.attr('href').indexOf('Special:SignUp') !== -1) {
        $a.parent().children('ul.WikiaMenuElement').prepend(
            '<li><a href="/wiki/' + mw.config.get('wgPageName') + 
            '?action=edit">View source</a></li>'
        );
    }
});
 
//Fix lazy-loaded tabbified profile images
if ($("div.profile-image img.lzyPlcHld").length > 0){
   $("div.profile-image img.lzyPlcHld").each(function(){
      $(this).attr("src", $(this).attr("data-src"));
   });
}
 
// http://dev.wikia.com/wiki/UserRightsRecord
if ($('.rightsrecord').length) {
    importScriptPage('UserRightsRecord/code.js', 'dev');
}
 
// Support for [[Template:Emote]] by Bobogoobo
if ($('.emote-template').length || $('#WikiaArticleComments').length) {
    $(function() {
        function emotify($this) {
            var emote = $this.text();
            var url = emotes.match(
              new RegExp('\\n\\*\\s*(.*)\\n(?:\\*\\*.*\\n)*(?=.*' + 
              emote.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1') + //escape specials, from MDN
              ')', 'i'));
            if (url) {
                url = url[1];
                $this.html($('<img />', {'src':url, 'alt':emote}));
            }
        }
 
        var emotes = '';
        $.getJSON('/api.php?action=query&prop=revisions&titles=MediaWiki:Emoticons' + 
          '&rvprop=content&format=json', function(data) {
            emotes = data.query.pages['28113'].revisions[0]['*'];
            // 28113 is the wgArticleId of MediaWiki:Emoticons
 
            $('.emote-template').each(function() {
                emotify($(this));
            });
        });
 
        $('#WikiaArticleFooter').on('DOMNodeInserted', function() {
            if ($('.emote-template').length === $('.emote-template img').length) {
                return;
            }
 
            $('#WikiaArticleFooter .emote-template').each(function() {
                if (!($(this).children('img').length)) {
                    emotify($(this));
                }
            });
        });
    });
}
 
// Auto-redirect on Special:Search for SXXEXX by Bobogoobo
$(function() {
    var search = mw.util.getParamValue('search');
    if (
      mw.config.get('wgPageName') === 'Special:Search' &&
      search.length <= 6 &&
      /S\d+E\d+/i.test(search)
    ) {
        $('.results-wrapper p').html('Redirecting to episode...');
 
        var s, e;
        s = search.toLowerCase().split('e')[0].substr(1);
        e = search.toLowerCase().split('e')[1];
        $.getJSON('/api.php?action=edit&action=parse&text={{nameconvert|' + 
          s + '|' + e + '}}&format=json', function(data) {
            var episode = (data.parse.text['*'].match(/\>(.*)\n\</) || [0, 0])[1];
            if (episode && episode !== 'TBA' && episode.indexOf('<span class="error">') === -1) {
                $('.results-wrapper p').append($('<a />', {
                    'href':'/wiki/' + episode,
                    'text':episode
                }));
 
                window.location.href = window.location.href.substring(0, 
                  window.location.href.lastIndexOf('/') + 1) + episode;
            } else {
                $('.results-wrapper p').html('Episode not found.');
            }
        });
    }
});
 
// Automatically add categories on Special:Upload, by Bobogoobo
//To delete stored data: window.sessionStorage.removeItem('characterCategories')
$(function() {
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Upload') {
        return;
    }
 
    var $summary = $('#wpUploadDescription'), $filename = $('#wpDestFile'), eptest = /S\d+E\d+/i,
      charCats = [], charCatsEG = [], shortcuts = {'EG':{}}, pending = 0,
      nicknames = {'Lyra Heartstrings':'Lyra', 'Princess Luna':'Nightmare Moon'}, //be careful
      ccStorage = window.sessionStorage.characterCategories;
 
    function nameCat(input) {
        return input.substring(9).replace(' images', '');
        //return 'Mr. Fluffykins';
    }
 
    function cat(str) {
        if ($summary.val().indexOf('[[' + 'Category:' + str + ']]') === -1) {
            $summary.val($summary.val() + ($summary.val() ? '\n' : '') + 
              '[[' + 'Category:' + str + ']]');
        }
    }
 
    function profile() { //profile images
        if (/\sID\s/i.test($filename.val().replace(/_/g, ' '))) {
            cat('Profile images');
        }
    }
 
    function findCats(filename, isEG) {
        var arr = isEG ? charCatsEG : charCats;
 
        for (var i = 0; i < arr.length; i++) {
            if (filename.indexOf(nameCat(arr[i])) !== -1) {
                cat(arr[i].substring(9) + (isEG ? '/EG' : '')); //meow
            }
        }
        if (isEG) {
            $.each(shortcuts.EG, function(key, value) {
                if (filename.indexOf(nameCat(key)) !== -1) {
                    cat(value.substring(9) + '/EG');
                }
            });
        } else {
            $.each(shortcuts, function(key, value) {
                if (filename.indexOf(nameCat(key)) !== -1 && key !== 'EG') {
                    cat(value.substring(9));
                }
            });
        }
    }
 
    $('#wpUploadDescription').closest('tr').after(
      '<tr><td></td><td id="char-cat-warning"><p style="color:red;"><strong>Warning</strong>: ' +
      'character category adding is experimental. It may not work correctly, ' +
      'and it will only add characters fully named in the file name.<br />' +
      'Please correct any erroneous categories and add missing ones. Report any issues ' +
      '<a href="/wiki/User_talk:Bobogoobo" title="User talk:Bobogoobo">here</a>.<br />' +
      'Character category database loading...</p></td></tr>'
    );
 
    if (typeof ccStorage !== 'undefined') {
        charCats = JSON.parse(ccStorage).charCats;
        charCatsEG = JSON.parse(ccStorage).charCatsEG;
        shortcuts = JSON.parse(ccStorage).shortcuts;
        $('#char-cat-warning p').append('retrieved from storage.');
    }
 
    if (typeof window.sessionStorage !== 'undefined' && !window.sessionStorage.characterCategories) {
    $.getJSON('/api.php?action=query&list=categorymembers&cmtitle=Category:Character images' +
      '&cmprop=title&cmlimit=max&format=json', function(data) { //will need update if we get over 500 of these
        pending += 1;
 
        function checkComplete() {
            if (pending === 0 && charCats.length > 0) {
                $('#char-cat-warning p').append('done!');
                if (typeof window.sessionStorage !== 'undefined') {
                    window.sessionStorage.characterCategories = JSON.stringify({
                        'charCats': charCats,
                        'charCatsEG': charCatsEG,
                        'shortcuts': shortcuts
                    });
                    $('#char-cat-warning p').append(' Saved to browser session storage.');
                }
            }
        }
 
        function fEach(response) {
            pending += response.query.categorymembers.length;
            $.each(response.query.categorymembers, function(index, value) {
                if (value.title === 'Category:Cutie Mark Crusaders images' ||
                  value.title === 'Category:Equestria Girls character images') {
                    pending -= 1;
                    return; //saw the EG category after doing everything else :P This is probably easier anyway
                }
 
                if (value.title.substring(value.title.length - 3) === '/EG') {
                    charCatsEG.push(value.title.replace('/EG', ''));
                    if (value.title.indexOf('Princess') !== -1) {
                        shortcuts.EG[value.title.replace('Princess ',
                          '').replace('/EG', '')] = value.title.replace('/EG', '');
                    }
                } else {
                    charCats.push(value.title);
                    if (value.title.indexOf('Princess') !== -1) {
                        shortcuts[value.title.replace('Princess ', '')] = value.title;
                    }
                    if (nicknames[nameCat(value.title)]) {
                        shortcuts['Category:' + nicknames[nameCat(value.title)] + ' images'] = value.title;
                    }
                }
                fGet(value.title);
            });
        }
 
        function fGet(title) {
            $.getJSON('/api.php?action=query&list=categorymembers&cmtitle=' + title +
              '&cmprop=title&cmtype=subcat&cmlimit=max&format=json', function(response) {
                if (response.query.categorymembers.length) {
                    fEach(response);
                }
                pending -= 1;
                checkComplete();
            });
        }
 
        fEach(data);
        pending -= 1;
        checkComplete();
    });}
 
    $filename.change(function() {
        var name = $filename.val().replace(/_/g, ' ');
 
        if ($summary.val().indexOf('[[Category:') !== -1) {
            return;
        } else if (name.substring(0, 6) === 'SLIDER') { //front page sliders
            cat('Front page sliders');
        } else if (eptest.test(name)) { //episodes
            var match = name.match(eptest)[0].split(/e/i);
 
            $.getJSON('/api.php?action=parse&text={{nameconvert|' + 
              match[0].substr(1) + '|' + match[1] + '}}&format=json', function(data) {
                var episode = (data.parse.text['*'].match(/>(.*)\n</) || [0, 0])[1];
                if (episode &&
                    episode !== 'TBA' && 
                    episode.indexOf('<span class="error">') === -1
                ) {
                    cat(episode + ' images');
                    findCats(name, false);
                    profile();
                }
            });
        } else if (/\sEG(?:\s|\.png)/i.test(name)) { //Equestria Girls
            cat('Equestria Girls images');
            findCats(name, true);
            profile();
        } else if (name.substring(0, 7) === 'FANMADE') { //fanmade images
            cat('Fanmade images');
        }
    });
 
    $('#mw-upload-form').on('DOMNodeInserted', '#mw-upload-thumbnail', function(ev) {
        if (ev.target.id === 'mw-upload-thumbnail') {
            $filename.change();
        }
    });
});
 
// List of ponies stripping script for [[list of ponies/fast]] by Bobogoobo
//   AKA Ultra Fast Pony (wacarb don't sue me)
$(function() {
    if (
      mw.config.get('wgPageName') !== 'List_of_ponies/fast' ||
      mw.util.getParamValue('action') ||
      mw.util.getParamValue('oldid')
    ) {
        return;
    }
 
    var page = mw.util.getParamValue('loppage') || 'List_of_ponies',
      fastpony = window.fastpony || [1, 9],
      ponycols = window.fastcolumns || ($.inArray(8, fastpony) > -1 ? 1 : 1);
        //change last 1 to 2 to enable multi-columns by default. Currently very slow.
 
    if (page !== 'List_of_ponies') {
        $('#lop-backlink').html('Back to the ').append($('<a />', {
            'href': '/wiki/List_of_ponies/fast',
            'title': 'List of ponies/fast',
            'text': 'full fast list'
        })).append('.');
 
        $('#lop-thislink').html('See the ').append($('<a />', {
            'href': '/wiki/' + page + (window.location.hash ? window.location.hash : ''),
            'title': page.replace(/_/g, ' '),
            'text': 'full version of this page'
        })).append('.');
    }
 
    $('#mw-content-text').after($('<img />', {
        'id': 'lopspinner',
        'style': 'margin:auto;',
        'src': 'http://slot1.images.wikia.nocookie.net/__cb62004/common/skins/common/progress-wheel.gif'
    }));
 
    $.getJSON('/api.php?action=parse&page=' + page + '&prop=text&format=json', function(data) {
        if (data.error) {
            $('#mw-content-text').append($('<span />', {
                'class': 'error',
                'html': data.error.info
            }));
            $('#lop-thislink').remove();
            return;
        }
 
        var $html = $('<div>' + data.parse.text['*'] + '</div>'),
          charpage = /See <a.*>(.*)<\/a>\./, newTitle,
          $thead, $tbody, $newTable, newRows = '<tr>';
 
        newTitle = ($('#title-meta', $html).html() || page.replace(/_/g, ' ')) + ' (fast)';
        $('#WikiaPageHeader h1:first').html(newTitle);
        document.title = newTitle + ' - ' + mw.config.get('wgSitename');
 
        if (page === 'List_of_ponies') {
            $('#toc', $html).parent().remove();
            $('.listofponies', $html).nextUntil('noscript').remove();
 
            $('a[href^="/wiki/List_of_"]', $html).each(function() {
                $(this).attr('href', '/wiki/List_of_ponies/fast?loppage=' + 
                  $(this).attr('href').replace('/wiki/', ''));
            });
        }
 
        $('.wikitable:first', $html).prev().remove();
        $('.wikitable:first', $html).remove();
        $('.listofponies', $html).css('width', 'auto');
 
        $('.listofponies tr', $html).each(function() {
            var $first = $(this).children('td:nth-child(1)'),
              $desc = $(this).children('td:nth-child(8)'),
              match, link, toRemove;
 
            if (
              $.inArray(8, fastpony) === -1 &&
              charpage.test($desc.html()) &&
              $desc.children('a:first').attr('title') !== 'List of ponies' //maybe duplicates should be marked somehow?
            ) {
                match = $desc.html().match(charpage)[1];
                link = $('<a />', {
                    'href': '/wiki/' + encodeURIComponent(match.replace(/ /g, '_')),
                    'title': match,
                    'text': $first.text()
                })[0].outerHTML;
 
                if ($first.children('b').length) {
                    $first.html($(link).wrapInner('<b></b>'));
                } else if ($first.children('a').length) {
                    $first.children('a:first').text('(poll)');
                    $first.html(link + ' ' + $first.html());
                } else {
                    $first.html(link);
                }
            }
 
            toRemove = $(this).children();
            for (var i = 0; i < fastpony.length; i++) {
                toRemove = toRemove.not(':nth-child(' + fastpony[i] + ')');
            }
            toRemove.remove();
        });
 
        if (ponycols > 1) {
            $newTable = $('.listofponies', $html).clone().empty();
 
            $thead = $('tr:first', $html);
            for (var i = 1; i < ponycols; i++) {
                $thead.append('<th class="unsortable" style="width:1em;"></th>');
                for (var j = 0; j < fastpony.length; j++) {
                    $thead.append($thead.children('th').eq(j).clone());
                }
            }
            $newTable.append($thead);
 
            $tbody = $('tr:not(:first) td', $html);
            for (var k = 1; k < $tbody.length + 1; k++) {
                if (k % (fastpony.length * ponycols) === 0) {
                    newRows += $tbody[k-1].outerHTML + '</tr><tr>';
                } else if (k % fastpony.length === 0) {
                    newRows += $tbody[k-1].outerHTML + '<td></td>';
                } else {
                    newRows += $tbody[k-1].outerHTML;
                }
            }
            $newTable.append(newRows + '</tr>');
 
            $('.listofponies', $html).replaceWith($newTable);
        }
 
        $('#mw-content-text').append($html.html());
 
        // Load sortability, from Wikia/app/resources/mediawiki.page/mediawiki.page.ready.js
        mw.loader.using('jquery.tablesorter', function() {
            $('table.sortable').tablesorter();
        });
 
        if (window.location.hash) { window.location.hash = window.location.hash; } // go to anchor if present
    }).fail(function() {
        $('#mw-content-text').append($('<span />', {
            'class': 'error',
            'html': 'An error occurred. Try refreshing the page.'
        }));
    }).always(function() {
        $('#lopspinner').remove();
    });
});
 
// Automatically uncheck "Unlock further protect options" when protecting a page
if (mw.config.get('wgAction') === 'protect') {
    $('#mwProtectUnchained').removeAttr('checked');
}
 
// Imports PonyStats by Bobogoobo
// Applies to Special:BlankPage?blankspecial=ponystats
//   ( http://mlp.wikia.com/wiki/Special:BlankPage?blankspecial=ponystats )
if (
  mw.config.get('wgPageName') === 'Special:BlankPage' &&
  mw.util.getParamValue('blankspecial') === 'ponystats'
) {
    importScript('MediaWiki:Common.js/PonyStats.js');
}
 
// All transcript lister by Bobogoobo
// http://mlp.wikia.com/wiki/Special:BlankPage?blankspecial=transcripts
$(function() {
    if (
      mw.config.get('wgPageName') !== 'Special:BlankPage' ||
      mw.util.getParamValue('blankspecial') !== 'transcripts'
    ) {
        return;
    }
 
    var $content = $('#mw-content-text > p'),
      $heading = ($('#WikiaPageHeader').length ? $('#WikiaPageHeader') : $('.AdminDashboardArticleHeader')).children('h1'),
      sections = [], sorting = [], total = 0, completed = 0;
 
    function nospecials(str) {
        return str.replace(/\W/g, '');
    }
 
    $heading.html('Transcripts/All');
    document.title = 'All Transcripts - ' + mw.config.get('wgSitename');
    $content.html(
      '<span style="font-size:125%;">&lt; <a href="/wiki/Transcripts" title="Transcripts">Transcripts</a></span>' +
      '<p>This page loads the full transcript of every episode and film in the show (may take some time). ' +
      'It is made to help with searching every transcript at once.<br />Please make any bug reports or suggestions ' +
      '<a href="/wiki/User_talk:Bobogoobo" title="User talk:Bobogoobo">here</a>.</p>' +
      '<div id="transcripts-toc" style="margin:1em 0; border:1px solid #D9D9D9; padding:0.5em;">' +
      '<h2 style="width:100%; text-align:center; margin-top:0; border-bottom:0;">Progress</h2>' +
      '<table style="width:100%;"><tr><td style="width:100%;">' + 
      '<div style="height:100%; width:0%; text-align:center; background-color:#DCAEEE">' +
      '<span id="transcripts-progress">0</span>%</div></td></tr></table>'
    );
 
    $.getJSON('/api.php?action=parse&page=Template:Transcripts&prop=links&format=json', function(data) {
        data = data.parse.links;
        for (var i = 2; i < data.length - 2; i++) { //episodes only
            if (data[i].exists === '') {
                sections.push(data[i]['*'].replace('Transcripts/', ''));
            }
            if (i === 66) {
                sections.push('My Little Pony Equestria Girls'); //add EG in chronological order as discussed
                sorting.push('');
                total += 1;
            }
            sorting.push('');
            total += 1;
        }
 
        for (var j = 0; j < sections.length; j++) {
            $content.append($('<h2 />', {
                'id': nospecials(sections[j]),
                'html': $('<a />', {
                    'href': '/wiki/' + sections[j].replace(/ /g, '_'),
                    'title': sections[j],
                    'text': sections[j]
                })
            }));
 
            (function(index) {
                $.getJSON('/api.php?action=parse&prop=text|categories&format=json&page=Transcripts/' + sections[index],
                  function(data) {
                    if (data.parse.categories.length === 1) {
                        sorting[index] = 'Season ' + data.parse.categories[0]['*'].replace(/[^\d]/g, '');
                    }
                    data = data.parse.text['*'];
                    data = data.substring(data.indexOf('</table>') + 8,
                      data.lastIndexOf('<table', data.lastIndexOf('<table') - 1));
                    //everything between the infobox and the navbox is valid transcript...hopefully
                    $('#' + nospecials(sections[index])).after(data);
 
                    completed += 1;
                    $('#transcripts-toc div').css('width', completed / total * 100 + '%');
                    $('#transcripts-progress').text((completed / total * 100).toFixed(2));
                    if (completed === total) {
                        makeTOC();
                    }
                });
            }(j));
        }
 
        function makeTOC() {
            $('#transcripts-toc h2').text('Contents');
            $('#transcripts-toc table').html('<tr></tr><tr><td style="text-align:center; width:100%;"></td></tr>');
 
            for (var i = 0; i < sorting.length; i++) {
                if ((i === 0 || sorting[i] !== sorting[i-1]) && sorting[i]) {
                    $('#transcripts-toc table tr:first').append('<td style="vertical-align:top;">' +
                      '<h3 style="width:100%; text-align:center;">' + sorting[i] + '</h3><ul></ul></td>');
                }
                if (!sorting[i]) {
                    if ($('#transcripts-toc table tr:last td').text()) {
                        $('#transcripts-toc table tr:last td').append(' • ');
                    }
                    $('#transcripts-toc table tr:last td').append($('<a />', {
                        'href': '#' + nospecials(sections[i]),
                        'text': sections[i]
                    }));
                } else {
                    $('#transcripts-toc table tr:first td:last ul').append($('<li />').append($('<a />', {
                        'href': '#' + nospecials(sections[i]),
                        'text': sections[i]
                    })));
                }
            }
 
            $('#transcripts-toc table td:last').attr('colspan', $('#transcripts-toc table tr:first td').length);
        }
 
        $.getJSON('/api.php?action=parse&text={{Transcripts|state=expanded}}&prop=text&disablepp=true&format=json',
          function(data) {
            $content.append(data.parse.text['*']);
        });
    });
});
 
// Imports non-720p image listing script by Bobogoobo
// Applies to http://mlp.wikia.com/wiki/Special:BlankPage?blankspecial=non720
// See subpage for further documentation
if (
  mw.config.get('wgPageName') === 'Special:BlankPage' &&
  mw.util.getParamValue('blankspecial') === 'non720'
) {
    $('#mw-content-text').html('<p>This list is generated from subcategories of Category:Episode images. Please check whether an image is intended to be the size it is before reuploading it. Make any suggestions (including additional patterns that should be skipped) <a href="/wiki/User_talk:Bobogoobo" title="User talk:Bobogoobo">here</a>.</p><div id="non720" style="width:100%;"></div>');
    importScript('MediaWiki:Common.js/Non720.js');
}

/********************************************************************************/
/* sliders using jquery by Dragon Age wiki User:Tierrie . All credit goes to him*/
/********************************************************************************/
 
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://uncharted.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");
 
mw.loader.using( ['jquery.ui.tabs'], function() {
$(document).ready(function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});
} );
 
//********************************************************
//END SLIDERS
//********************************************************
 
/*==================================================
  $Id: tabber.js,v 1.9 2006/04/27 20:51:51 pat Exp $
  tabber.js by Patrick Fitzgerald pat@barelyfitz.com
 
  Documentation can be found at the following URL:
  http://www.barelyfitz.com/projects/tabber/
 
  License (http://www.opensource.org/licenses/mit-license.php)
 
  Copyright (c) 2006 Patrick Fitzgerald
 
  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:
 
  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.
 
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
  ==================================================*/
 
function tabberObj(argsObj)
{
  var arg; /* name of an argument to override */
 
  /* Element for the main tabber div. If you supply this in argsObj,
     then the init() method will be called.
  */
  this.div = null;
 
  /* Class of the main tabber div */
  this.classMain = "tabber";
 
  /* Rename classMain to classMainLive after tabifying
     (so a different style can be applied)
  */
  this.classMainLive = "tabberlive";
 
  /* Class of each DIV that contains a tab */
  this.classTab = "tabbertab";
 
  /* Class to indicate which tab should be active on startup */
  this.classTabDefault = "tabbertabdefault";
 
  /* Class for the navigation UL */
  this.classNav = "tabbernav";
 
  /* When a tab is to be hidden, instead of setting display='none', we
     set the class of the div to classTabHide. In your screen
     stylesheet you should set classTabHide to display:none.  In your
     print stylesheet you should set display:block to ensure that all
     the information is printed.
  */
  this.classTabHide = "tabbertabhide";
 
  /* Class to set the navigation LI when the tab is active, so you can
     use a different style on the active tab.
  */
  this.classNavActive = "tabberactive";
 
  /* Elements that might contain the title for the tab, only used if a
     title is not specified in the TITLE attribute of DIV classTab.
  */
  this.titleElements = ['h2','h3','h4','h5','h6'];
 
  /* Should we strip out the HTML from the innerHTML of the title elements?
     This should usually be true.
  */
  this.titleElementsStripHTML = true;
 
  /* If the user specified the tab names using a TITLE attribute on
     the DIV, then the browser will display a tooltip whenever the
     mouse is over the DIV. To prevent this tooltip, we can remove the
     TITLE attribute after getting the tab name.
  */
  this.removeTitle = true;
 
  /* If you want to add an id to each link set this to true */
  this.addLinkId = false;
 
  /* If addIds==true, then you can set a format for the ids.
     <tabberid> will be replaced with the id of the main tabber div.
     <tabnumberzero> will be replaced with the tab number
       (tab numbers starting at zero)
     <tabnumberone> will be replaced with the tab number
       (tab numbers starting at one)
     <tabtitle> will be replaced by the tab title
       (with all non-alphanumeric characters removed)
   */
  this.linkIdFormat = '<tabberid>nav<tabnumberone>';
 
  /* You can override the defaults listed above by passing in an object:
     var mytab = new tabber({property:value,property:value});
  */
  for (arg in argsObj) { this[arg] = argsObj[arg]; }
 
  /* Create regular expressions for the class names; Note: if you
     change the class names after a new object is created you must
     also change these regular expressions.
  */
  this.REclassMain = new RegExp('\\b' + this.classMain + '\\b', 'gi');
  this.REclassMainLive = new RegExp('\\b' + this.classMainLive + '\\b', 'gi');
  this.REclassTab = new RegExp('\\b' + this.classTab + '\\b', 'gi');
  this.REclassTabDefault = new RegExp('\\b' + this.classTabDefault + '\\b', 'gi');
  this.REclassTabHide = new RegExp('\\b' + this.classTabHide + '\\b', 'gi');
 
  /* Array of objects holding info about each tab */
  this.tabs = new Array();
 
  /* If the main tabber div was specified, call init() now */
  if (this.div) {
 
    this.init(this.div);
 
    /* We don't need the main div anymore, and to prevent a memory leak
       in IE, we must remove the circular reference between the div
       and the tabber object. */
    this.div = null;
  }
}
 
 
/*--------------------------------------------------
  Methods for tabberObj
  --------------------------------------------------*/
 
 
tabberObj.prototype.init = function(e)
{
  /* Set up the tabber interface.
 
     e = element (the main containing div)
 
     Example:
     init(document.getElementById('mytabberdiv'))
   */
 
  var
  childNodes, /* child nodes of the tabber div */
  i, i2, /* loop indices */
  t, /* object to store info about a single tab */
  defaultTab=0, /* which tab to select by default */
  DOM_ul, /* tabbernav list */
  DOM_li, /* tabbernav list item */
  DOM_a, /* tabbernav link */
  aId, /* A unique id for DOM_a */
  headingElement; /* searching for text to use in the tab */
 
  /* Verify that the browser supports DOM scripting */
  if (!document.getElementsByTagName) { return false; }
 
  /* If the main DIV has an ID then save it. */
  if (e.id) {
    this.id = e.id;
  }
 
  /* Clear the tabs array (but it should normally be empty) */
  this.tabs.length = 0;
 
  /* Loop through an array of all the child nodes within our tabber element. */
  childNodes = e.childNodes;
  for(i=0; i < childNodes.length; i++) {
 
    /* Find the nodes where class="tabbertab" */
    if(childNodes[i].className &&
       childNodes[i].className.match(this.REclassTab)) {
 
      /* Create a new object to save info about this tab */
      t = new Object();
 
      /* Save a pointer to the div for this tab */
      t.div = childNodes[i];
 
      /* Add the new object to the array of tabs */
      this.tabs[this.tabs.length] = t;
 
      /* If the class name contains classTabDefault,
	 then select this tab by default.
      */
      if (childNodes[i].className.match(this.REclassTabDefault)) {
	defaultTab = this.tabs.length-1;
      }
    }
  }
 
  /* Create a new UL list to hold the tab headings */
  DOM_ul = document.createElement("ul");
  DOM_ul.className = this.classNav;
 
  /* Loop through each tab we found */
  for (i=0; i < this.tabs.length; i++) {
 
    t = this.tabs[i];
 
    /* Get the label to use for this tab:
       From the title attribute on the DIV,
       Or from one of the this.titleElements[] elements,
       Or use an automatically generated number.
     */
    t.headingText = t.div.title;
 
    /* Remove the title attribute to prevent a tooltip from appearing */
    if (this.removeTitle) { t.div.title = ''; }
 
    if (!t.headingText) {
 
      /* Title was not defined in the title of the DIV,
	 So try to get the title from an element within the DIV.
	 Go through the list of elements in this.titleElements
	 (typically heading elements ['h2','h3','h4'])
      */
      for (i2=0; i2<this.titleElements.length; i2++) {
	headingElement = t.div.getElementsByTagName(this.titleElements[i2])[0];
	if (headingElement) {
	  t.headingText = headingElement.innerHTML;
	  if (this.titleElementsStripHTML) {
	    t.headingText.replace(/<br>/gi," ");
	    t.headingText = t.headingText.replace(/<[^>]+>/g,"");
	  }
	  break;
	}
      }
    }
 
    if (!t.headingText) {
      /* Title was not found (or is blank) so automatically generate a
         number for the tab.
      */
      t.headingText = i + 1;
    }
 
    /* Create a list element for the tab */
    DOM_li = document.createElement("li");
 
    /* Save a reference to this list item so we can later change it to
       the "active" class */
    t.li = DOM_li;
 
    /* Create a link to activate the tab */
    DOM_a = document.createElement("a");
    DOM_a.appendChild(document.createTextNode(t.headingText));
    DOM_a.href = "javascript:void(null);";
    DOM_a.title = t.headingText;
    DOM_a.onclick = this.navClick;
 
    /* Add some properties to the link so we can identify which tab
       was clicked. Later the navClick method will need this.
    */
    DOM_a.tabber = this;
    DOM_a.tabberIndex = i;
 
    /* Do we need to add an id to DOM_a? */
    if (this.addLinkId && this.linkIdFormat) {
 
      /* Determine the id name */
      aId = this.linkIdFormat;
      aId = aId.replace(/<tabberid>/gi, this.id);
      aId = aId.replace(/<tabnumberzero>/gi, i);
      aId = aId.replace(/<tabnumberone>/gi, i+1);
      aId = aId.replace(/<tabtitle>/gi, t.headingText.replace(/[^a-zA-Z0-9\-]/gi, ''));
 
      DOM_a.id = aId;
    }
 
    /* Add the link to the list element */
    DOM_li.appendChild(DOM_a);
 
    /* Add the list element to the list */
    DOM_ul.appendChild(DOM_li);
  }
 
  /* Add the UL list to the beginning of the tabber div */
  e.insertBefore(DOM_ul, e.firstChild);
 
  /* Make the tabber div "live" so different CSS can be applied */
  e.className = e.className.replace(this.REclassMain, this.classMainLive);
 
  /* Activate the default tab, and do not call the onclick handler */
  this.tabShow(defaultTab);
 
  /* If the user specified an onLoad function, call it now. */
  if (typeof this.onLoad == 'function') {
    this.onLoad({tabber:this});
  }
 
  return this;
};
 
 
tabberObj.prototype.navClick = function(event)
{
  /* This method should only be called by the onClick event of an <A>
     element, in which case we will determine which tab was clicked by
     examining a property that we previously attached to the <A>
     element.
 
     Since this was triggered from an onClick event, the variable
     "this" refers to the <A> element that triggered the onClick
     event (and not to the tabberObj).
 
     When tabberObj was initialized, we added some extra properties
     to the <A> element, for the purpose of retrieving them now. Get
     the tabberObj object, plus the tab number that was clicked.
  */
 
  var
  rVal, /* Return value from the user onclick function */
  a, /* element that triggered the onclick event */
  self, /* the tabber object */
  tabberIndex, /* index of the tab that triggered the event */
  onClickArgs; /* args to send the onclick function */
 
  a = this;
  if (!a.tabber) { return false; }
 
  self = a.tabber;
  tabberIndex = a.tabberIndex;
 
  /* Remove focus from the link because it looks ugly.
     I don't know if this is a good idea...
  */
  a.blur();
 
  /* If the user specified an onClick function, call it now.
     If the function returns false then do not continue.
  */
  if (typeof self.onClick == 'function') {
 
    onClickArgs = {'tabber':self, 'index':tabberIndex, 'event':event};
 
    /* IE uses a different way to access the event object */
    if (!event) { onClickArgs.event = window.event; }
 
    rVal = self.onClick(onClickArgs);
    if (rVal === false) { return false; }
  }
 
  self.tabShow(tabberIndex);
 
  return false;
};
 
 
tabberObj.prototype.tabHideAll = function()
{
  var i; /* counter */
 
  /* Hide all tabs and make all navigation links inactive */
  for (i = 0; i < this.tabs.length; i++) {
    this.tabHide(i);
  }
};
 
 
tabberObj.prototype.tabHide = function(tabberIndex)
{
  var div;
 
  if (!this.tabs[tabberIndex]) { return false; }
 
  /* Hide a single tab and make its navigation link inactive */
  div = this.tabs[tabberIndex].div;
 
  /* Hide the tab contents by adding classTabHide to the div */
  if (!div.className.match(this.REclassTabHide)) {
    div.className += ' ' + this.classTabHide;
  }
  this.navClearActive(tabberIndex);
 
  return this;
};
 
 
tabberObj.prototype.tabShow = function(tabberIndex)
{
  /* Show the tabberIndex tab and hide all the other tabs */
 
  var div;
 
  if (!this.tabs[tabberIndex]) { return false; }
 
  /* Hide all the tabs first */
  this.tabHideAll();
 
  /* Get the div that holds this tab */
  div = this.tabs[tabberIndex].div;
 
  /* Remove classTabHide from the div */
  div.className = div.className.replace(this.REclassTabHide, '');
 
  /* Mark this tab navigation link as "active" */
  this.navSetActive(tabberIndex);
 
  /* If the user specified an onTabDisplay function, call it now. */
  if (typeof this.onTabDisplay == 'function') {
    this.onTabDisplay({'tabber':this, 'index':tabberIndex});
  }
 
  return this;
};
 
tabberObj.prototype.navSetActive = function(tabberIndex)
{
  /* Note: this method does *not* enforce the rule
     that only one nav item can be active at a time.
  */
 
  /* Set classNavActive for the navigation list item */
  this.tabs[tabberIndex].li.className = this.classNavActive;
 
  return this;
};
 
 
tabberObj.prototype.navClearActive = function(tabberIndex)
{
  /* Note: this method does *not* enforce the rule
     that one nav should always be active.
  */
 
  /* Remove classNavActive from the navigation list item */
  this.tabs[tabberIndex].li.className = '';
 
  return this;
};
 
 
/*==================================================*/
 
 
function tabberAutomatic(tabberArgs)
{
  /* This function finds all DIV elements in the document where
     class=tabber.classMain, then converts them to use the tabber
     interface.
 
     tabberArgs = an object to send to "new tabber()"
  */
  var
    tempObj, /* Temporary tabber object */
    divs, /* Array of all divs on the page */
    i; /* Loop index */
 
  if (!tabberArgs) { tabberArgs = {}; }
 
  /* Create a tabber object so we can get the value of classMain */
  tempObj = new tabberObj(tabberArgs);
 
  /* Find all DIV elements in the document that have class=tabber */
 
  /* First get an array of all DIV elements and loop through them */
  divs = document.getElementsByTagName("div");
  for (i=0; i < divs.length; i++) {
 
    /* Is this DIV the correct class? */
    if (divs[i].className &&
	divs[i].className.match(tempObj.REclassMain)) {
 
      /* Now tabify the DIV */
      tabberArgs.div = divs[i];
      divs[i].tabber = new tabberObj(tabberArgs);
    }
  }
 
  return this;
}
 
 
/*==================================================*/
 
 
function tabberAutomaticOnLoad(tabberArgs)
{
  /* This function adds tabberAutomatic to the window.onload event,
     so it will run after the document has finished loading.
  */
  var oldOnLoad;
 
  if (!tabberArgs) { tabberArgs = {}; }
 
  /* Taken from: http://simon.incutio.com/archive/2004/05/26/addLoadEvent */
 
  oldOnLoad = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = function() {
      tabberAutomatic(tabberArgs);
    };
  } else {
    window.onload = function() {
      oldOnLoad();
      tabberAutomatic(tabberArgs);
    };
  }
}
 
 
/*==================================================*/
 
 
/* Run tabberAutomaticOnload() unless the "manualStartup" option was specified */
 
if (typeof tabberOptions == 'undefined') {
 
    tabberAutomaticOnLoad();
 
} else {
 
  if (!tabberOptions['manualStartup']) {
    tabberAutomaticOnLoad(tabberOptions);
  }
 
}
 
 
// Insert username - from runsescape.wikia.com
$(function() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").text(wgUserName);
});
 
// ******************
// Collapsible tables
// ******************
 
importScriptPage('ShowHide/code.js', 'dev');