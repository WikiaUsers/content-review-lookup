/* Sharing Buttons
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color",
};
importScriptPage('SocialIcons/code.js','dev');
*/

/* Voice Stuff */
importScriptPage('VoiceDictation.js', 'marbleblast');

function addMastheadTags() {
  var rights = {};
  var founder = "<span class='tag'>Founder</span>";
  var rollback = "<span class='tag'>Rollback</span>";
 
 rights["Homsar Walker"] = founder;
 rights["MasterOfTheBattlecube"] = rollback;
 
 
  if (typeof rights[wgTitle] != "undefined") {
    $('.UserProfileMasthead .masthead-info span.tag').remove();
 
    $(".masthead-info hgroup").append(rights[wgTitle]);
  }
}
 
$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});

//importScript('MediaWiki:Wikia.js/UserRightsIcons.js','lmbw');
importScriptPage('Countdown/code.js', 'dev');
importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('DupImageList/code.js', 'dev');
importScriptPage('InactiveUsers/code.js', 'dev');

// http://dev.wikia.com/wiki/RevealAnonIP
window.RevealAnonIP = {
    permissions : ['chatmod', 'rollback', 'sysop', 'bureaucrat']
};
 
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});

/* Other
//Custom user rights icons on userpages
importScript('MediaWiki:Wikia.js/userRightsIcons.js');
*/

/* Add Current Diff Link to Edit Menu - by Seaside98 */
$('.WikiaPageHeader .WikiaMenuElement').prepend('<li><a href="/wiki/'+ wgPageName +'?diff=cur">Edit Differences</a></li>');
 
/* Fix for AdBlock users - by Seaside98 */
if($('#WikiaTopAds').css('display') != "block" && $('body').hasClass('wikinav2') ) {
 
/* Switchtabs */
$(function() {
    if (!document.getElementById("switchtabs")) {
        return;
    }
    var page = wgTitle.replace(/&/g, "%26");
    var rev = "<a id='rev' href='http://marbleblast.wikia.com/wiki/Review:" + page + "'>Reviews</a>";
    var wiki = "<a id='wiki' href='http://marbleblast.wikia.com/wiki/" + page + "'>Encyclopedia</a>";
    var string = wiki + rev;
    document.getElementById("switchtabs").innerHTML = string;
 
    var ns = wgNamespaceNumber;
    switch (ns) {
    case 0:
        document.getElementById("wiki").className = "selected";
        break;
    case 114:
        document.getElementById("rev").className = "selected";
        break;
    }
});

/*Search Enhancements - by ShermanTheMythran*/
$('.Search .WikiaSearch input[name="search"]').attr('placeholder','Search this wiki');
 
/*External Links - by ShermanTheMythran*/
$('.links a, .wikis a, a.external, .WikiNav > ul > li:last-child > .subnav-2 > li:first-child > .subnav-2a, .WikiNav > ul > li:last-child > .subnav-2 > li > .subnav-3 > li > .subnav-3a').attr('target', '_blank');
 
/*Fix Domain Namespace - by ShermanTheMythran*/
$('.ns-4 .WikiaPageHeader > h1').html(wgTitle);
$('.ns-4 .WikiaPageHeader > .tally').after('<h2>' + wgSiteName + ' page</h2>');
 
/*Spoilers - by ShermanTheMythran*/
$('.spoiler > .spoilerTrigger').toggle(function() {
	$(this).parent().children('.spoilerTrigger').html('Hide spoiler');
	$(this).parent().children('.spoilerText').toggle();},
	function() {
		$(this).parent().children('.spoilerTrigger').html('Show spoiler');
		$(this).parent().children('.spoilerText').toggle();
	}
);
 
/*Various Fixes - by ShermanTheMythran*/
$('#my-tools-menu').addClass('WikiaMenuElement');
$('.mediawiki').addClass(wgUserName);
 
/*!
 * jQuery Cookie Plugin v1.3
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function ($, document, undefined) {
 
	var pluses = /\+/g;
 
	function raw(s) {
		return s;
	}
 
	function decoded(s) {
		return decodeURIComponent(s.replace(pluses, ' '));
	}
 
	var config = $.cookie = function (key, value, options) {
 
		// write
		if (value !== undefined) {
			options = $.extend({}, config.defaults, options);
 
			if (value === null) {
				options.expires = -1;
			}
 
			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}
 
			value = config.json ? JSON.stringify(value) : String(value);
 
			return (document.cookie = [
				encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}
 
		// read
		var decode = config.raw ? raw : decoded;
		var cookies = document.cookie.split('; ');
		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			if (decode(parts.shift()) === key) {
				var cookie = decode(parts.join('='));
				return config.json ? JSON.parse(cookie) : cookie;
			}
		}
 
		return null;
	};
 
	config.defaults = {};
 
	$.removeCookie = function (key, options) {
		if ($.cookie(key) !== null) {
			$.cookie(key, null, options);
			return true;
		}
		return false;
	};
 
})(jQuery, document);
 
/* Code by Seaside98 - Displays timer - Special thanks to Runescape wiki */
var refreshDate;
 
function addDate() {
    var UTCDate = ((new Date()).toUTCString()).replace("GMT", "(UTC)");
    $('#showdate').empty().attr('title','Purge the server cache and update the contents of this page.').attr('style','text-decoration:none !important;').attr('href',window.location.href + '?action=purge').html(UTCDate.substring(5));
    window.clearTimeout(refreshDate);
    refreshDate = window.setTimeout(addDate, 1000);
}
 
$(document).ready(function() {
    if (skin == 'oasis') 
        $('<li class="Date" id="displayClock" style="float:right"><a id="showdate"></a></li>').appendTo('.WikiaBarWrapper .toolbar .tools');
    else
        $('#p-personal ul').prepend('<li class="Date" id="displayClock" style="float:right;"><a id="showdate"></a></li>');
    addDate();
    refreshDate = window.setTimeout(addDate, 1000);
});

/*Jammers - by ShermanTheMythran*/
//couples with Template:Jammers
$(document).ready(function() {
	var wgUserNamee = wgUserName.split(' ').join('_');
	var $jammers = $('.jammers.' + wgUserNamee);
	var $jammersX = $('.jammers:not(.' + wgUserNamee + ')');
	$($jammers).show();
	$($jammersX).remove(); }

);

function copyToClipboard (href){window.prompt('Copy to clipboard: Ctrl+C, Enter', href);}$('.clipboard a').click(function(){event.preventDefault();copyToClipboard(this)});

/*Gears - by ShermanTheMythran*/ $('#WikiaBarWrapper').append($('.walls'));$('.walls').show();$('.name').click(function(){$('.walls img').addClass('active');$('.left').delay('1000').animate({left:'-50%'},'slow');$('.right').delay('1000').animate({right:'-50%'},'slow');$('.name').delay('1000').fadeOut('slow');})

/*Other Stuff*/
/* New Buttons */

mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/lcf119testinggrounds/images/7/74/Button_comment.png",
		"speedTip": "Comment visible only for editors",
		"tagOpen": "<!-- ",
		"tagClose": " -->",
		"sampleText": "Insert comment here"
	};

mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/7/70/Button_disambig.png",
		"speedTip": "Click for disambiguation page template",
		"tagOpen": "{{",
		"tagClose": "}}",
		"sampleText": "disambig"
	};

mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
		"speedTip": "Click to strike out text",
		"tagOpen": "<strike>",
		"tagClose": "</strike>",
		"sampleText": "Insert text here"
	};

mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/6/6a/Button_sup_letter.png",
		"speedTip": "Makes text higher (be wary; it makes it small)",
		"tagOpen": "<sup>",
		"tagClose": "</sup>",
		"sampleText": "Insert text here"
	};

mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/a/aa/Button_sub_letter.png",
		"speedTip": "Makes text lower (be wary; it makes it small)",
		"tagOpen": "<sub>",
		"tagClose": "</sub>",
		"sampleText": "Insert text here"
	};

mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
		"speedTip": "Creates a redirect",
		"tagOpen": "#REDIRECT:[[",
		"tagClose": "]]",
		"sampleText": "Insert text here"
	};

mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/lcf119testinggrounds/images/d/d5/Button_noinclude.png",
		"speedTip": "Does not include text when imported to another page",
		"tagOpen": "<noinclude>",
		"tagClose": "</noinclude>",
		"sampleText": "Insert text here"
	};


/* Display title */
importScriptPage('User:Jgjake2/js/DISPLAYTITLE.js', 'deadisland');

/* Replace with username */
$(document).ready(function () {if (wgUserName) {$(".insertusername").html(wgUserName)} });

/* Clock */
var refreshDate;function addDate(){var a=((new Date()).toUTCString()).replace("GMT","(UTC)");$("#showdate").empty().append('<span style="font-weight: bold; text-transform: none;"><a style="color:white;" title="Purge the server cache and update the contents of this page." href="'+wgArticlePath.replace("$1",wgPageName.replace(/ /g,"_"))+'?action=purge">'+a.substring(5)+"</a></span>");window.clearTimeout(refreshDate);refreshDate=window.setTimeout(addDate,1000)}$(document).ready(function(){if(skin=="oasis"){$('<li id="displayTimer"><span id="showdate"></span></li>').appendTo("#GlobalNavigation")}else{$("#p-personal ul").prepend('<li><span id="showdate"></span></li>')}addDate();refreshDate=window.setTimeout(addDate,1000);$("#displayTimer").css({"font-size":"12px"})});

/* AJAX */
ajaxPages=["Special:RecentChanges","Special:WikiActivity","Special:NewPages"];var indicator="https://images.wikia.nocookie.net/marbleblast/images/b/b4/FB_Throbber_Orange.gif";if(!window.ajaxPages){ajaxPages=new Array("Special:NewPages")}if(!window.ajaxCallAgain){ajaxCallAgain=[]}var ajaxTimer;var ajaxRefresh=0;var refreshText="AJAX";if(typeof AjaxRCRefreshText=="string"){refreshText=AjaxRCRefreshText}var refreshHover="Enable auto-refreshing page loads";if(typeof AjaxRCRefreshHoverText=="string"){refreshHover=AjaxRCRefreshHoverText}var doRefresh=true;function setCookie(b,c,a){var d=new Date();d.setDate(d.getDate()+a);document.cookie=b+"="+escape(c)+((a==null)?"":";expires="+d.toGMTString())}function getCookie(a){if(document.cookie.length>0){c_start=document.cookie.indexOf(a+"=");if(c_start!=-1){c_start=c_start+a.length+1;c_end=document.cookie.indexOf(";",c_start);if(c_end==-1){c_end=document.cookie.length}return unescape(document.cookie.substring(c_start,c_end))}}return""}function preloadAJAXRL(){ajaxRLCookie=(getCookie("ajaxload-"+wgPageName)=="on")?true:false;appTo=($("#WikiaPageHeader").length)?$("#WikiaPageHeader"):$(".firstHeading");appTo.append('&nbsp;<span style="font-size: xx-small; line-height: 100%;" id="ajaxRefresh"><span style="border-bottom: 1px dotted; cursor: help;" id="ajaxToggleText" title="'+refreshHover+'">'+refreshText+':</span><input type="checkbox" style="margin-bottom: 0;" id="ajaxToggle"><span style="display: none;" id="ajaxLoadProgress"><img src="'+indicator+'" style="vertical-align: baseline; margin-top: 5px;" border="0" alt="Refreshing page" /></span></span>');$("#ajaxLoadProgress").ajaxSend(function(b,c,a){if(location.href==a.url){$(this).show()}}).ajaxComplete(function(b,c,a){if(location.href==a.url){$(this).hide();for(i in ajaxCallAgain){ajaxCallAgain[i]()}}});$("#ajaxToggle").click(toggleAjaxReload);$("#ajaxToggle").attr("checked",ajaxRLCookie);if(getCookie("ajaxload-"+wgPageName)=="on"){loadPageData()}}function toggleAjaxReload(){if($("#ajaxToggle").attr("checked")=="checked"){setCookie("ajaxload-"+wgPageName,"on",30);doRefresh=true;loadPageData()}else{setCookie("ajaxload-"+wgPageName,"off",30);doRefresh=false;clearTimeout(ajaxTimer)}}function loadPageData(){var a=($("#WikiaArticle").length)?"#WikiaArticle":"#bodyContent";$(a).load(location.href+" "+a+" > *",function(b){if(doRefresh){ajaxTimer=setTimeout("loadPageData();",ajaxRefresh)}})}$(function(){for(x in ajaxPages){if(wgPageName==ajaxPages[x]&&$("#ajaxToggle").length==0){preloadAJAXRL()}}});
 
importArticles({
	type: 'script',
	articles: [
		'u:dev:Countdown/code.js', //Countdowns in Articles
		'u:dev:DupImageList/code.js', //List of Duplicate ImagesImages
		'u:dev:AjaxPatrol/code.js', //Quick Patrolling
		'u:dev:AutoEditDropdown/code.js', //Drop Down Menus on Hover
		'u:dev:UserTags/code.js', //Custom Userpage Tags
		'u:dev:WallGreetingButton/code.js' //Add Wall Greeting Edit Button
    ]
});

/* Display Clock in Footer Toolbar - by Seaside98 - Runescape */
var refreshDate;
function addDate() {
	var UTCDate = ((new Date()).toUTCString()).replace("GMT", "(UTC)");
	$('#showdate').empty().attr('title','Purge the server cache and update the contents of this page.').attr('style','text-decoration:none !important;').attr('href',window.location.href + '?action=purge').html(UTCDate.substring(5));
	window.clearTimeout(refreshDate);
	refreshDate = window.setTimeout(addDate, 1000);
}
$(document).ready(function() {
	$('<li class="Date" id="displayClock" style="float:right"><a id="showdate"></a></li>').appendTo('.WikiaBarWrapper .toolbar .tools');
	addDate();
});
 
/* Open External Links in New Tabs - by ShermanTheMythran */
$('.links a, .wikis a, a.external, .WikiNav > ul > li:last-child > .subnav-2 > li:first-child > .subnav-2a, .WikiNav > ul > li:last-child > .subnav-2 > li > .subnav-3 > li > .subnav-3a').attr('target', '_blank');
 
/* Add a Blog under Contribute - by Codyn329 */
$(document).ready(function() { 
	$('.WikiHeader .buttons .contribute ul li').first().after('<li><a href= "/wiki/Special:CreateBlogPage">Add a Blog</a></li'); 
});

/* Add History Button to Threads - by Seaside98 */
if (mediaWiki.config.get('wgNamespaceNumber') === 1201) {
	$('.follow').after('<a class="wikia-button" style="float:right;margin-left:10px;" href="/wiki/'+ wgPageName +'?action=history">History</a>');
}
 
/* Add Current Diff Link to Edit Menu - by Seaside98 */
$('.WikiaPageHeader .WikiaMenuElement').prepend('<li><a href="/wiki/'+ wgPageName +'?diff=cur">Current Diff</a></li>');

/* AJAX Undo */
//importScriptPage('User:Edward_Nigma/CustomAJAXUndo.js','nigmatechlabs');
importScriptPage('MediaWiki:AjaxUndo.js','marbleblast');

/* From LEGO Space wiki */

/* Add Editcount tab on all user pages and user talk pages */
/* CODE BY GEORGE BARNICK // [[User:GeorgeBarnick]] */
$(function() {
    var wikiUrl = window.location.hostname;
    var olds = $(".tabs-container > ul.tabs").html();
    var address = "http://" + wikiUrl + "/wiki/Special:Editcount/" + wgTitle;
    var adds = "<li data-id='editcount'><a href='" + address + "'>Editcount</a></li>";
    var news = olds + adds;
    $(".tabs-container > ul.tabs").html(news);
});

/* Add contributions link to the user dropdown on the Wikia bar */
$(document).ready(function() {
    $('<li id="MyContribs"><a href="/wiki/Special:MyContributions">My&nbsp;contributions</a>  </li>').insertAfter('.AccountNavigation > li > .subnav > li:first-child');
});

/* Create a Blog Post quicklink */
$(document).ready(function() {
    $('<li><a href="/wiki/Special:CreateBlogPage" data-id="createblog">Create a Blog Post</a></li>').insertAfter('.contribute ul li:nth-of-type(3)');
});
}