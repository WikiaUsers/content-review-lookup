/* Any JavaScript here will be loaded for all users on every page load. */
importScriptPage('DupImageList/code.js', 'dev');
importScriptPage('EditIntroButton/code.js', 'dev');
importScriptPage('PurgeButton/code.js', 'dev');
importScriptPage('User:Phillycj/daynight.js', 'c');
importScriptPage('SearchGoButton/code.js', 'dev');
importScriptPage('User:Joeytje50/tabinsert.js','rs')

/* Mass delete (Special:Nuke) script */
if(wgPageName == 'PokeFan Battle Universe:MassDelete')
    importScript('MediaWiki:Common.js/massdelete.js');

/** Summary filler
  * From RuneScape Wiki
  */
// Extra Rollback Buttons
importScript('MediaWiki:Common.js/extraRollbacks.js');
// END Extra Rollback Buttons
 
// AjaxRollback - works with Extra Rollback Buttons
importScript('MediaWiki:Common.js/ajaxRollback.js');
// END AjaxRollback

importScriptPage('MediaWiki:Common.js/standardeditsummaries.js', 'runescape');

importScriptPage('FastDelete/code.js', 'dev');
var fdButtons = [];
fdButtons[fdButtons.length] = {
  'summary': 'spam',
  'label': 'spam'};
fdButtons[fdButtons.length] = {
  'summary': 'vandalism',
  'label': 'vandalism'}
fdButtons[fdButtons.length] = {
  'summary': 'Fan art',
  'label': 'Fan art'}

 /** Dynamic Navigation Bars (experimental) *************************************
  *
  *  Description: See [[Wikipedia:NavFrame]].
  *  Taken from Wikipedia's Common.js.
  */
 
  // set up the words in your language
  var NavigationBarHide = '[' + collapseCaption + ']';
  var NavigationBarShow = '[' + expandCaption + ']';
 
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
     if (NavToggle.firstChild.data == NavigationBarHide) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if ( hasClass( NavChild, 'NavPic' ) ) {
                 NavChild.style.display = 'none';
             }
             if ( hasClass( NavChild, 'NavContent') ) {
                 NavChild.style.display = 'none';
             }
         }
     NavToggle.firstChild.data = NavigationBarShow;
 
     // if hidden now
     } else if (NavToggle.firstChild.data == NavigationBarShow) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if (hasClass(NavChild, 'NavPic')) {
                 NavChild.style.display = 'block';
             }
             if (hasClass(NavChild, 'NavContent')) {
                 NavChild.style.display = 'block';
             }
         }
     NavToggle.firstChild.data = NavigationBarHide;
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
             var NavToggle = document.createElement("a");
             NavToggle.className = 'NavToggle';
             NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
             NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
             var NavToggleText = document.createTextNode(NavigationBarHide);
             for (
                  var NavChild = NavFrame.firstChild;
                  NavChild != null;
                  NavChild = NavChild.nextSibling
                 ) {
                 if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
                     if (NavChild.style.display == 'none') {
                         NavToggleText = document.createTextNode(NavigationBarShow);
                         break;
                     }
                 }
             }
 
             NavToggle.appendChild(NavToggleText);
             // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
             for(
               var j=0; 
               j < NavFrame.childNodes.length; 
               j++
             ) {
               if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                 NavFrame.childNodes[j].appendChild(NavToggle);
               }
             }
             NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
         }
     }
  }
 
  addOnloadHook( createNavigationBarToggleButton );
 
/* Tooltip script begin */
 
var $tfb;
 
// hides the tooltip
function hideTip() {
$tfb.html("").removeClass("tooltip-ready").addClass("hidden").css("visibility","hidden"); 
}
 
// displays the tooltip
function displayTip(e) {
$tfb.not(":empty").removeClass("hidden").addClass("tooltip-ready");
moveTip(e);
$tfb.not(":empty").css("visibility","visible");
}
 
// moves the tooltip
function moveTip(e) {
var newTop = e.clientY + ((e.clientY > ($(window).height()/2)) ? -($tfb.not(".hidden").innerHeight()+20):20);
var newLeft = e.clientX + ((e.clientX > ($(window).width()/2)) ? -($tfb.not(".hidden").innerWidth()+20):20);
$tfb.not(".hidden").css({"position":"fixed","top":newTop + "px","left":newLeft + "px"});
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
 
function bindTT() {
$t=$(this);
$p=$t.parent();
if ($p.hasClass("selflink") == false) $t.data("tt", $p.attr("title").replace(" (page does not exist)","").replace("?","%3F")).mouseover(showTip).mouseout(hideTip).mousemove(moveTip);
}
 
// check to see if it is active then do it
$(function() {
$("#bodyContent").mouseover(hideTip);
$("#bodyContent").append('<div id="tfb" class="htt"></div>');
$tfb = $("#tfb");
$("#bodyContent span.ajaxttlink").each(bindTT);
});
 

/* Tooltip script end */

//Facebook 'Like Box'
//Graciously (and unknowingly) provided by The Spanish 'Simspedia'
 
function fBox() {
	$('#fbox').append('<iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/connect/connect.php?id=126686564044617&amp;connections=10" align="top" frameborder="0" width="300" height="250" scrolling="no" />');
}
 
$(fBox);
 


// ============================================================
// BEGIN collapsible tables
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
// ============================================================

/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

/** Change "Template maker" to newGroup **/
if((wgPageName  === 'User:Riley_Huntley') || (wgPageName  === 'User_talk:Riley_Huntley') || (wgPageName  === 'User_blog:Riley_Huntley') || (fbReturnToTitle  === 'Special:Contributions/Riley_Huntley')) {
  $('.group').html('Template maker');
}

/** Change "Bot" to newGroup **/
if((wgPageName  === 'User:Riley_Huntley_Bot') || (wgPageName  === 'User_talk:Riley_Huntley_Bot') || (wgPageName  === 'User_blog:Riley_Huntley_Bot') || (fbReturnToTitle  === 'Special:Contributions/Riley_Huntley_Bot')) {
  $('.group').html('Bot');
}




/* Add UTC clock above articles */
importScript('MediaWiki:Common.js/displayTimer.js');

/* 
This code is loaded on all skins.
*/

importScriptPage('ShowHide/code.js', 'dev');

/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop new people bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|Uberfuzzy]]
 * Oasis support by [[User:Uberfuzzy|Uberfuzzy]]
 */

if(wgNamespaceNumber == 110 ||wgNamespaceNumber === 114 ) {

function disableOldForumEdit() {
	if( typeof( enableOldForumEdit ) != 'undefined' && enableOldForumEdit ) {
		return;
	}
	if( !document.getElementById('old-forum-warning') ) {
		return;
	}

if(skin == 'oasis') {
  $('#WikiaPageHeader .wikia-menu-button > a').html('Archived').removeAttr('href');
  return;
 }
	if( !document.getElementById('ca-edit') ) {
		return;
	}
	var editLink = null;
	if( skin == 'monaco' )
	{
		editLink = document.getElementById('ca-edit');
	}
	else if( skin == 'monobook' )
	{
		editLink = document.getElementById('ca-edit').firstChild;
	}
	else
	{
		return;
	}


	editLink.removeAttribute('href', 0);
	editLink.removeAttribute('title', 0);
	editLink.style.color = 'gray';
	editLink.innerHTML = 'Archived';

	$('span.editsection-upper').remove();

}
addOnloadHook( disableOldForumEdit );
}

/* lock blog comments for blogs that haven't been commented on for more than 30 days.
   by: [[User:Joeyaa|Joey Ahmadi]]
*/

$(function() {
if (wgNamespaceNumber == 500 && $('#article-comments-ul li').size() > 1) {
var then = $('#article-comments-ul > .SpeechBubble:first .permalink').attr('href');
then = new String(then.match(/\d{8}/));
var monthnames = ['January','February','March','April','May','June','July',
'August','September','October','November','December'];
var year = then.match(/^\d{4}/);
var month = then.substring(4,6); 
month--;
month= monthnames[month];
var day = then.match(/\d{2}$/);
then = new Date(month+''+day+', '+year); 
var old = parseInt(now - then);
old = Math.floor(old/(1000*60*60*24));
if (old > 30) {
$('#article-comm').attr('disabled','disabled').text('This blog post hasn\'t been commented on for over 30 days. There is no need to comment.');
$('#article-comm-submit').attr('disabled','disabled');
$('.article-comm-reply').remove();
}
}
});

/* Opens chat in a new window for homepage */

$(".openchat a").click(function() {
   window.open('/wiki/Special:Chat', 'wikiachat', 'width=600,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=yes');
   return false;
});


/* for taskmanager - by uberfuzzy & Grunny */
$( function() {
	if( wgCanonicalSpecialPageName !== 'TaskManager' ) {
		return;
	}
	$( '#tm-form fieldset' ).append(
		$( '<input />' ).attr( {'type': 'button', 'value': 'invert', 'id': 'tm-invert'} ).click( function () {
			$( '#tm-form input[type="checkbox"]' ).each( function () {
				$( this ).prop( 'checked', !$( this ).prop( 'checked' ) );
			} );
			return false;
		} )
	);
} );
/*
$(function(){
	if ( wgNamespaceNumber === 112 || wgNamespaceNumber === 113 ||wgNamespaceNumber === 114 || wgNamespaceNumber === 115 ) {
		var FEurl = wgScript + '?title=Admin_Central:Main_Page';
		$('h1.wordmark.medium.graphic > a').attr('href', FEurl);
	}
});
*/

/** For sysops *****************************************
 *
 *  Description: Allows for sysop-specific Javascript at [[MediaWiki:Sysop.js]],
 *
 */
if ( $.inArray( 'sysop', wgUserGroups) > -1 ) {
 if ( !window.disableSysopJS ) {
  $(function(){
   importScript('MediaWiki:Sysop.js');
  });
 }
}

importScriptPage('CollapsibleEdittools/code.js', 'dev');
importScriptPage('DisableArchiveEdit/code.js', 'dev');
importScriptPage( 'FastDelete/code.js', 'dev');
importScriptPage( 'AjaxUndo/code.js', 'dev' );

var ArchiveToolConfig = { 
   'en': {
      buttonArchiveTool: "Archive",
      buttonArchiveToolTooltip: "Archive this page",
      buttonSelectAll: "Select all",
      buttonDeselectAll: "Deselect all",
      buttonSaveArchive: "Save archive",
      buttonAbort: "Abort",
      labelLines: "Lines",
      labelSections: "Sections",
      summaryArchiveFrom: "ArchiveTool: Archiving from",
      summaryArchiveTo: "ArchiveTool: Archiving to"
   }
}

/* Auto-refresh the Recentchanges and Wikiactivity */

AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Added by Riley Huntley';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

var autoCollapse = 2
var collapseCaption = "Hide"; 
var expandCaption = "Show";