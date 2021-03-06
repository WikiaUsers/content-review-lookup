/* Any JavaScript here will be loaded for all users on every page load. */

var ShowHideConfig = { 
    brackets: '[[]]'
};
importScriptPage('OasisToolbarButtons/code.js', 'dev');
importScriptPage( 'AjaxUndo/code.js', 'dev' );
importScriptPage('DupImageList/code.js', 'dev');
importScriptPage( 'FastDelete/code.js', 'dev' );
var fdButtons = [];
fdButtons[fdButtons.length] = {
	'summary': 'spam',
	'label': 'spam'
};
fdButtons[fdButtons.length] = {
	'summary': 'vandalism',
	'label': 'vandal'
};
importScriptPage( 'PurgeButton/code.js', 'dev' );
EditIntroButtonText = 'intro';
importScriptPage( 'EditIntroButton2/code.js', 'dev' );
importScriptPage('AjaxRC/code.js', 'dev');
var ajaxRefresh = 30000;
ajaxPages = ["Special:RecentChanges"]
importScriptPage('ShowHide/code.js', 'dev');

$( function() {
	if ( $( '#infowidgets-demo' ).length ) {
		importScriptPage( 'InfoWidgets/demo.js', 'dev' );
		importStylesheetPage( 'InfoWidgets/demo.css', 'dev' );
	}
} );

// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3
// **************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>

function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = count=Math.floor((then.getTime()-now.getTime())/1000);

  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }

  // determine plus/minus
  if(diff<0) {
    diff = -diff;
    var tpm = ' ';
  } else {
    var tpm = ' ';
  }

  // calcuate the diff
  var left = (diff%60) + ' seconds';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutes ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' hours ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' days ' + left
  timers[i].firstChild.nodeValue = tpm + left;

  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
}

function checktimers() {
  //hide 'nocountdown' and show 'countdown'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'inline'

  //set up global objects timers and timeouts.
  timers = getElementsByClassName(document, 'span', 'countdowndate');  //global
  timeouts = new Array(); // generic holder for the timeouts, global
  if(timers.length == 0) return;
  for(var i in timers) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers);

// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************

jQuery('.achievementbox').mouseover(function() {
   jQuery("div", this).show();
})

jQuery('.achievementbox').mouseout(function() {
   jQuery("div", this).hide();
})

function fBox() {
	$('#fbox').append('<iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/connect/connect.php?id=107365159296867&amp;connections=10" align="top" frameborder="0" width="300" height="250" scrolling="no" />');
}

$(fBox);

/* track incontent share fb button */
$(function(){
    $("#incontent_share").click(function(){
        WET.byStr("articleAction/incontent_share/" + wgPageName);
    });
});

$(document).ready(function(){
	if( $('#control_form_edit').length )
	{
		$('#control_edit').remove();
	}
});

$(".openchat a").click(function() {
   window.open('/wiki/Special:Chat', 'wikiachat', 'width=600,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=yes');
   return false;
});

importScriptPage( 'AjaxRC/code.js', 'dev' );
var ajaxPages = ["Special:WikiActivity"];
var AjaxRCRefreshText = 'Auto-Refresh';
 
importScriptPage('BackToTopButton/code.js', 'dev');
 
importScriptPage('OasisToolbarButtons/code.js', 'dev');
 
importScriptPage('AutoEditDropdown/code.js', 'dev');

// ******************************************************
// * SearchGoButton - Version 1.2			*
// *							*
// * Script by Eladkse					*
// ******************************************************
//
 
function SearchGoButton() {
	if ($('#WikiaSearch').length) {
		$('#WikiaSearch button.secondary').before('<button class="secondary" style="right: 43px;" name="go" value="Go"><img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="sprite search" height="17" width="21" style="background-image:url(https://images.wikia.nocookie.net/dev/images/d/d5/GoArrow.png); background-position:0; height:auto;"></button>');
		$('#WikiaSearch input[type="text"]').css('width', '208px').css('padding-right', '87px');
	if (wgPageName == 'Special:Search') {
		$('#WikiaSearch input[type="text"]').css('width', '568px');
	}
	}
}
addOnloadHook(SearchGoButton);
 
 
//

if (wgNamespaceNumber === 2 || wgNamespaceNumber === 3) {
$(function() {
    var i, len, html, rights = {
	"JamesonOTP": ["Bureaucrat", "Chat Mod", "Enforcer"],
        "CharyssaOTP": ["Bureaucrat", "Chat Mod", "Enforcer"],
	"Zinnia3": ["Bureaucrat", "Chat Mod", "Enforcer"],
        "Fallin'": ["Bureaucrat", "Chat Mod", "Enforcer"],
        "ClevanOTP":[ "Enforcer"],
        "DocMD":[ "Enforcer"],
        "Parachuting":[ "Enforcer"],
        "James.mckay1992":[ "Enforcer"],
        "Kibainuzukafan619":[ "Enforcer"],

    };
    rights = rights[wgTitle];
    if (typeof rights !== "undefined") {
        len = rights.length;
        html = "";
        // remove old rights
        //$('.UserProfileMasthead .masthead-info span.group').remove();
        for (i = 0; i < len; i += 1) {
            html += '<span class="group">' + rights[i] + '</span>';
        }
        $(html).appendTo('.masthead-info hgroup');
    }
});
}