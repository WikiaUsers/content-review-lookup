/* Any JavaScript here will be loaded for all users on every page load. */

importStylesheet("Template:Ambox/code.css");

/* Include Global Anime-Common.js Information */
importScriptURI('http://anime.wikia.com/index.php?title=MediaWiki:Anime-Common.js&action=raw&ctype=text/javascript&dontcountme=s&templates=expand');

/* Auto Refresh */
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];

window.PurgeButtonText = 'Purge';

// BEGINNING: JavaScript for placing the fair use rationale template inside the summary box on [[Special:Upload]]. Code by "[[wikipedia:User:Pinky49]]", created and coded specifically for [[wikia:c:cdnmilitary|Duty & Valour]].
 
$(function FairUseRationale() {
	if((wgPageName == 'Special:Upload') && document.getElementById('wpDestFile').value === '') {
		document.getElementById('wpUploadDescription').value = '{{Fair use rationale\n| Description       = \n| Source            = \n| Portion           = \n| Purpose           = \n| Resolution        = \n| Replaceability    = \n| Other Information = \n}}';
	}
});
// ****** END: JavaScript for [[Special:Upload]] ******

/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

function getElementsByClass (node, className, tagName) {
	if (node.getElementsByClassName && (tagName === undefined || tagName === null || tagName == '*')) return node.getElementsByClassName(className);
	var list = node.getElementsByTagName(tagName?tagName:'*');
	var array = new Array();
	var i = 0;
	for (i in list) {
		if (hasClass(list[i], className))
			array.push(list[i]);
	}
	return array;
}
 
/* Creates the method getElementsByClass, if unsupported from the browser */
if(!document.getElementsByClass) document.getElementsByClass = function(className) {
	return getElementsByClass(document, className, '*');
};

function getElementsByName (name, root) {
    if (root === undefined) root = document;
    var e = root.getElementsByTagName('*');
    var r = new Array();
    for (var i = 0; i < e.length; i++) {
        if (e[i].getAttribute('name') == name) r[r.length] = e[i];
    }
    return r;
}
 
function getText (e) {
    if (e.textContent) return e.textContent;
    else if (e.innerText) return e.innerText;
    else return null;
}
 
function setText (e, t) {
    if (e.textContent) e.textContent = t;
    else if (e.innerText) e.innerText = t;
    else { e.textContent = t; e.innerText = t; } // entrambi nulli, non si può discriminare
    return;
}
 
function appendText (e, t) {
    if (e.textContent) e.textContent += t;
    else if (e.innerText) e.innerText += t;
    else { e.textContent = t; e.innerText = t; }
    return;
}
/****************************/
/* spoilers by User:Tierrie */
/****************************/
importScriptPage('MediaWiki:SpoilersToggle.js', 'w:c:dragonage');
/**
 * SpoilersToggle
 * Works with Template:Spoiler to create a section of the article that
 * can be toggled to show/hide
 * Uses cookies to store the state of the spoilers
 * 
 * @version 2.0.0
 * @author Tierrie
 */
$(document).ready(function(){
  console.log("script: Spoilers script loaded");
 
  if(typeof($.cookie) === undefined) {
    mw.loader.using(['jquery.cookie']);
  }
 
  var cookie_id = 'splr_';
  function removeCookie(key) {
    setCookie(key);
  }
 
  function setCookie(key, value) {
    if(value=="undefined" || value == "null") value = null;
    $.cookie(cookie_id + key, value, { expires: 150, path: '/' });
  }
 
  function getCookie(key) {
    return $.cookie(cookie_id + key);
  }
 
  $('.sp_banner').click( function() {
    var id = $(this).parent().attr('class').match(/sp_id_[\d\w]+/)[0].split('sp_id_')[1];
 
    if( $('.sp_id_'+id+' .sp_wrn').css('display') == 'none') {
      $('.sp_id_'+id+' .sp_wrn').fadeIn(200, function() {
        $(this).show(200);
      });
      $('.sp_id_'+id+' .sp_txt').hide(0);
      setCookie(id, 'hide');
    } else {
      $('.sp_id_'+id+' .sp_wrn').fadeOut(200, function() {
        $(this).hide(200);
      });
      $('.sp_id_'+id+' .sp_txt').delay(200).show(0);
      setCookie(id, 'show');
    }
  });
 
  var sp_on_page = {};
  $('.sp').each( function() {
    var id = $(this).attr('class').match(/sp_id_[\d\w]+/)[0].split('sp_id_')[1];
    sp_on_page[id] = undefined;
  });
  for (var id in sp_on_page) {
    if (getCookie(id) === 'show') {
      $('.sp_id_'+id+' .sp_wrn').hide(0);
      $('.sp_id_'+id+' .sp_txt').show(0);
    } else if (getCookie(id) === 'hide') {
      $('.sp_id_'+id+' .sp_wrn').show(0);
      $('.sp_id_'+id+' .sp_txt').hide(0);
 
    // if no cookies are set, check to see if the warning is displayed by default
    } else if ($('.sp_id_'+id+' .sp_wrn').attr('display') == 'none') {
      $('.sp_id_'+id+' .sp_wrn').hide(0);
      $('.sp_id_'+id+' .sp_txt').show(0);
    } else {
      $('.sp_id_'+id+' .sp_wrn').show(0);
      $('.sp_id_'+id+' .sp_txt').hide(0);
    }
  }
});

importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});

//================================
//          jQuery Slider
//================================
 
// Code from http://dragonage.wikia.com/wiki/MediaWiki:Common.js created by "Tierrie"
// see also http://onepiece.wikia.com/wiki/MediaWiki:Common.js/slider.js
 
mw.loader.using(["jquery.cookie"]);
 
mw.loader.using(["jquery.ui.tabs"], function() {
  $(".portal_vtab").tabs().addClass("ui-tabs-vertical ui-helper-clearfix");
  $(".portal_vtab > ul > li").removeClass("ui-corner-top").addClass("ui-corner-left");
 
  var $tabs = $("#portal_slider").tabs({
    fx: {
      opacity: "toggle",
      duration: 100
    }
  });
 
  $(".portal_sliderlink").click(function() { // binding click event
    $tabs.tabs("select", this.className.match(/portal_sliderlink-(\d+)/)[1]);
    return false;
  });
  $(".portal_next").click(function() { // binding click event
	var selected = $tabs.tabs("option", "selected");
    $tabs.tabs("select", selected + 1); // switch to next tab
    return false;
  });
  $(".portal_prev").click(function() { // binding click event
	var selected = $tabs.tabs("option", "selected");
    $tabs.tabs("select", selected - 1); // switch to previous tab
    return false;
  });
});

/****************************/
/* WAM score */
/****************************/
window.railWAM = {
    logPage:"Project:WAM Log"
};