//<source lang="javascript">
// Add a refresh button
var purgeText = 'Purge';
$( function () {
	if ( !document.getElementById( 'ca-purge' ) ) {
		if ( skin === 'oasis' || skin === 'wikia' ) {
			$( '<li id="ca-purge"><a title="Purge this page" href="/wiki/' + encodeURIComponent( wgPageName ) + '?action=purge">'+ purgeText +'</a></li>' ).appendTo (((wgNamespaceNumber == 2 || wgNamespaceNumber == 3) && $( '.UserProfileActionButton' ).length ? '.UserProfileActionButton' : '#WikiaPageHeader') + ' > .wikia-menu-button > ul');
		} else {
			$( '<li id="ca-purge"><a title="Purge this page" href="/wiki/' + encodeURIComponent( wgPageName ) + '?action=purge">'+ purgeText +'</a></li>' ).appendTo( '#p-cactions > .pBody > ul' );
		}
	}
} );
//</source>

//<source lang="javascript">
// Skin Switch Button for monobook to oasis and vice versa
var monoBookText = 'Monobook';
var oasisText = 'Oasis';
$( function () {
	if ( !document.getElementById( 'ca-skins' ) ) {
		if ( skin === 'oasis' || skin === 'wikia' ) {
			$( '<li id="ca-skins"><a title="View this page in Monobook" href="/index.php?title=' + encodeURIComponent( wgPageName ) + '&useskin=monobook">'+ monoBookText +'</a></li>' ).appendTo (((wgNamespaceNumber == 2 || wgNamespaceNumber == 3) && $( '.UserProfileActionButton' ).length ? '.UserProfileActionButton' : '#WikiaPageHeader') + ' > .wikia-menu-button > ul');
		} else {
			$( '<li id="ca-skins"><a title="View this page in Oasis" href="/index.php?title=' + encodeURIComponent( wgPageName ) + '&useskin=wikia">'+ oasisText +'</a></li>' ).appendTo( '#p-cactions > .pBody > ul' );
		}
	}
} );
//</source>


importScript('MediaWiki:Common.js/standardeditsummaries.js');
importScriptURI('http://c.wikia.com/index.php?title=User:Monchoman45/ChatHacks.js&action=raw&ctype=text/javascript');
importScriptPage('InactiveUsers/code.js', 'dev');
var InactiveUsers = { months: 1 };
importScriptPage('FixWantedFiles/code.js', 'dev');
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
importScriptPage('AjaxRC/code.js', 'dev');
var ajaxRefresh = 30000;

// This tooltip code was written by Pcj

var $htt;
var $tfb;
var $ttfb;

// hides the tooltip
function hideTip() {
$tfb.html("").removeClass("tooltip-ready").addClass("hidden").css("visibility","hidden"); 
}

// displays the tooltip
function displayTip(e) {
$htt.not(":empty").removeClass("hidden").addClass("tooltip-ready");
moveTip(e);
$htt.not(":empty").css("visibility","visible");
}

// moves the tooltip
function moveTip(e) {
var newTop = e.clientY + ((e.clientY > ($(window).height()/2)) ? -($htt.not(".hidden").innerHeight()+20):20);
var newLeft = e.clientX + ((e.clientX > ($(window).width()/2)) ? -($htt.not(".hidden").innerWidth()+20):20);
$htt.not(".hidden").css({"position":"fixed","top":newTop + "px","left":newLeft + "px"});
}

// AJAX tooltips
function showTip(e) {
$t=$(this);
$p=$t.parent();
if ($p.hasClass("selflink")==false) {
$t.removeAttr("title");
$p.removeAttr("title");
$tfb.load("/"+$t.data("tt").replace(/ /g,"_").replace(/\?/g,"%3F")+"?action=render div.tooltip-content",function () {
if ($tfb.html() == "") $tfb.html('<div class="tooltip-content"></div>');
$tfb.find(".tooltip-content").css("display","");
displayTip(e);
});
}
}

// quick tooltips
function hideTemplateTip() {
$ttfb.html("").removeClass("tooltip-ready").addClass("hidden"); 
}

function bindTT() {
$t=$(this);
$p=$t.parent();
if ($p.hasClass("selflink") == false) $t.data("tt", $p.attr("title").replace(" (page does not exist)","").replace("?","%3F")).mouseover(showTip).mouseout(hideTip).mousemove(moveTip);
}

// check to see if it is active then do it
$(function() {
  if(skin=='oasis') { var BC = '#WikiaArticle'; }
  else { var BC = '#bodyContent'; }

  $(BC).mouseover(hideTip);
  $(BC).append('<div id="tfb" class="htt"></div>');
  $tfb = $("#tfb");
  $htt = $("#tfb");
  $(BC + " span.ajaxttlink").each(bindTT);
});

// collapsed tables
importScriptPage('ShowHide/code.js', 'dev');

// coolapsable infoboxes
importScriptPage('CollapsibleInfobox/code.js', 'dev');

/**************************************************************/
/* sliders using jquery by User:Tierrie in Dragon Age Wiki */
/**************************************************************/
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://dragonage.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");

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