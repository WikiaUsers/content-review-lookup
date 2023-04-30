/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/** */
importScriptPage( 'PurgeButton/code.js', 'dev' ); // Кнопка очистки кэша страницы
var PurgeButtonText = 'Обновить';


/* Автообновление — начало */
 
/*window.AjaxRCRefreshText = 'Автообновление';
window.AjaxRCRefreshHoverText = 'Включить автообновление страницы';
window.ajaxPages = [
    "Служебная:RecentChanges",
    "Служебная:WikiActivity",
    "Служебная:NewFiles"
];
 
/* Автообновление — конец */
 
/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://ru.elderscrolls.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");
 
mw.loader.using( ['jquery.ui.tabs'], function() {
$(document).ready(function() {
$('.factions img').hide(); 	$('.factions img').removeAttr('width').removeAttr('height'); 	var l=$('.factions tr').eq(1).find('td').height(); 	$('.factions tr').eq(1).find('img').css('max-height', l); 	$('.factions img').show(); 	if ($('.factions tr').eq(1).find('td').width()>=$('.factions img').width()) { 		$('.factions tr').eq(1).find('td').width($('.factions img').width()); 	}
  $('.id_upper').each(function() { $(this).html($(this).html().toUpperCase()); });
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

/* ######################################################################## */
/* ### AJAX RC                                                          ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Automatically refresh "Recent changes" via AJAX     ### */
/* ### Credit:      User:pcj (http://www.wowpedia.org)                  ### */
/* ###              Maintenance, cleanup, style and bug fixes by Grunny ### */
/* ###              (http://community.wikia.com/wiki/User:Grunny)       ### */
/* ######################################################################## */
 
var	ajaxIndicator = 'https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif',
	ajaxTimer,
	ajaxRefresh = 60000,
	ajaxPages = ["Служебная:RecentChanges", "Служебная:WikiActivity", "Служебная:NewFiles"],
	AjaxRCRefreshText = 'Автообновление',
	doRefresh = true;
 
importScriptPage('MediaWiki:AjaxRC/code.js', 'dev');
 
/**
 * Sets the cookie
 * @param c_name string Name of the cookie
 * @param value string 'on' or 'off'
 * @param expiredays integer Expiry time of the cookie in days
 */
function setCookie( c_name, value, expiredays ) {
	var exdate = new Date();
	exdate.setDate( exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ( ( expiredays === null ) ? "" : ";expires=" + exdate.toGMTString() );
}
 
/**
 * Gets the cookie
 * @param c_name string Cookie name
 * @return The cookie name or empty string
 */
function getCookie( c_name ) {
	if ( document.cookie.length > 0 ) {
		var c_start = document.cookie.indexOf( c_name + "=" )
		if ( c_start !== -1 ) {
			c_start = c_start + c_name.length + 1; 
			var c_end = document.cookie.indexOf( ";", c_start );
			if ( c_end === -1 ) {
				c_end = document.cookie.length;
			}
			return unescape( document.cookie.substring( c_start, c_end ) );
		} 
	}
	return "";
}
 
/* ######################################################################## */

// *****************************************************
 // * Experimental javascript countdown timer (Splarka) *
 // * Version 0.0.3                                     *
 // *****************************************************
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
     var tpm = '';''
   } else {
     var tpm = '';''
   }
 
   // Calculate the diff - Modified by Eladkse
  if ((diff%60) == 1) {
    left = (diff%60) + ' секунды';
  } else {
    left = (diff%60) + ' секунда';
  }
    diff=Math.floor(diff/60);
  if(diff > 0) {
    if ((diff%60) == 1) {
      left = (diff%60) + ' минута, и ' + left;
    } else {
      left = (diff%60) + ' минут, и ' + left;
    }
  }
    diff=Math.floor(diff/60);
  if(diff > 0) {
    if ((diff%24) == 1) {
      left = (diff%24) + ' час, ' + left;
    } else {
      left = (diff%24) + ' часов, ' + left;
    }
  }
    diff=Math.floor(diff/24);
  if(diff > 0) {
    if (diff == 1) {
      left = diff + ' день, ' + left;
    } else {
      left = diff + ' дней, ' + left;
    }
  }
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

/* 
 * Script Name: InputUsername
 * Author: Ihojose
 *
 * Adds the username of the user viewing the page.
 * Only works for logged in users.
 *
 * Added by Spottra 5-Apr-2015:
 * Individual users can define "window.disableUsernameReplace = true;" in their
 * global.js or local common.js file to disable the replacement for themselves if
 * they so desire.
 */
 
/* global $, mw */
;(function (window, $, mw) {
    'use strict';
    var username = mw.config.get('wgUserName');
    if (
        window.disableUsernameReplace ||
        !username
    ) {
        return;
    }
    window.disableUsernameReplace = true;
    var $rail = $('#WikiaRail'),
        customSelector = window.UsernameReplaceSelector
            ? ', ' + window.UsernameReplaceSelector
            : '';
    function inputUsername($content) {
        $content.find('.InputUsername, .insertusername' + customSelector).text(username);
    }
    mw.hook('wikipage.content').add(inputUsername);
    if ($rail.hasClass('loaded')) {
        inputUsername($rail);
    } else if ($rail.exists()) {
        $rail.on('afterLoad.rail',
            $.proxy(inputUsername, null, $rail)
        );
    }
})(window, jQuery, mediaWiki);
 
// Reskin parser script from [[Uncyclopedia:MediaWiki:Uncyclopedia.js]]
skinjs = {
	"Logout": "Logout.js"
}
 
var re = RegExp("(.*) - Wookieepedia, the Star Wars Wiki");
var matches = re.exec(document.title);
 
var skinNamejs;
 
if (matches) {
	if (skinjs[matches[1]] != undefined) {
		skinNamejs = (skinjs[matches[1]].length > 0) ? skinjs[matches[1]] : matches[1] + '.js';
		document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Skin/' + skinNamejs + '&action=raw&ctype=text/javascript"></script>');
	}
}
 
function fixSearch() {
	var button = document.getElementById('searchSubmit');
 
	if( button )
		button.name = 'go';
}

/************************************************************
 * Functions.js stuff
 * Deprecated, most of these functions will be removed slowly
 ************************************************************/
 
/*
    Source: http://www.dustindiaz.com/getelementsbyclass/
    getElementsByClass, which complements getElementById and getElementsByTagName, returns an array of all subelements of ''node'' that are tagged with a specific CSS class (''searchClass'') and are of the tag name ''tag''. If tag is null, it searches for any suitable elements regardless of the tag name.
    Example: getElementsByClass('infobox', document.getElementById('content'), 'div') selects the same elements as the CSS declaration #content div.infobox
*/
function getElementsByClass(searchClass, node, tag)
{
	var classElements = new Array();
 
	if(node == null)
		node = document;
 
	if(tag == null)
		tag = '*';
 
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var tester = new ClassTester(searchClass);
 
	for(i = 0, j = 0; i < elsLen; i++)
	{
		if(tester.isMatch(els[i]))
		{
			classElements[j] = els[i];
			j++;
		}
	}
 
	return classElements;
}
 
function ClassTester(className)
{
	this.regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
}
 
ClassTester.prototype.isMatch = function(element)
{
	return this.regex.test(element.className);
}
/*
    end getElementsByClass
*/
 
function insertAtCursor(myField, myValue) {
	//IE support
	if (document.selection)
	{
		myField.focus();
		sel = document.selection.createRange();
		sel.text = myValue;
	}
	//MOZILLA/NETSCAPE support
	else if(myField.selectionStart || myField.selectionStart == '0')
	{
		var startPos = myField.selectionStart;
		var endPos = myField.selectionEnd;
		myField.value = myField.value.substring(0, startPos)
		+ myValue
		+ myField.value.substring(endPos, myField.value.length);
	}
	else
	{
		myField.value += myValue;
	}
}
 
function getFirstHeading() {
	var elements = getElementsByClass('firstHeading', document.getElementById('content'), 'h1');
	return (elements != null && elements.length > 0) ? elements[0] : null;
}
 
/*
    Returns the element's nearest parent that has the specified CSS class.
*/
function getParentByClass(className, element) {
	var tester = new ClassTester(className);
	var node = element.parentNode;
 
	while(node != null && node != document)
	{
		if(tester.isMatch(node))
			return node;
 
		node = node.parentNode;
	}
 
	return null;
}
 
/*
    Performs dynamic hover class rewriting to work around the IE6 :hover bug
    (needs CSS changes as well)
*/
function rewriteHover() {
	var gbl = document.getElementById("hover-global");
 
	if(gbl == null)
		return;
 
	var nodes = getElementsByClass("hoverable", gbl);
 
	for (var i = 0; i < nodes.length; i++) {
		nodes[i].onmouseover = function() {
			this.className += " over";
		}
		nodes[i].onmouseout = function() {
			this.className = this.className.replace(new RegExp(" over\\b"), "");
		}
	}
}
/********************************************************/

/* Слайдеры */
 
mw.loader.using( ['jquery.ui.tabs'], function() {
$( "[class^=portal_vtab]" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
$( "[class^=portal_vtab] li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
$(function() {
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