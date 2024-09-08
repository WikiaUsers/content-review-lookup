/* JavaScript yang ada di sini akan diterapkan untuk semua kulit. */

/* Any JavaScript here will be loaded for all users on every page load. */

/* Facebook feed */

function fBox() {
	$('#fbox').append('<iframe marginheight="0" marginwidth="0" src="https://www.facebook.com/CSOwiki;connections=10&amp;stream=0" align="top" frameborder="0" width="280" height="250" scrolling="no" />');
}
$(fBox);

/* Automatic signature */
importScriptPage('Sine/code.js', 'dev');

/* Search Suggest */
importArticles({
    type: 'script',
    articles: [
        'u:dev:SearchSuggest/code.js'
    ]
});

/* Code */
importArticles({
    type: 'script',
    articles: [
        'u:dev:Code/code.js'
    ]
});

/* Visual Spell Check */
importScriptPage('VisualSpellCheck/code.js','dev');

/* Header links */
importArticles({
    type: 'script',
    articles: [
        'u:dev:HeaderLinks/code.js'
    ]
});

/* Floating TOC */
importArticles({
    type: 'script',
    articles: [
        'u:dev:FloatingToc/code.js'
    ]
});

/* Reveal Anonymous IP */

importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});

/* User Tags */
// User Tags
window.UserTagsJS = {
	modules: {
			inactive: 15,
			mwGroups: ['bureaucrat', 'chatmoderator', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'],
			autoconfirmed: false,
			metafilter: {
				sysop: ['bureaucrat'],
				chatmoderator: ['sysop'],
				rollback: ['sysop'],
			},
			newuser: true,},
	tags: {
		tech: { u: 'Technician', order: 0 },
		serg: { u: 'Sergeant', order: 2 },
		sserg: { u: 'Staff Sergeant', order: 1 },
		corp: { u: 'Corporal', order: 3 },
		hier: { u: 'Hierarchy', order: 0 },
		gm: { u: 'Game Master', order: 0 },
		evadmin: { u: 'Demonic Admin', order: 0 },
		anadmin: { u: 'Angelic Admin', order: 1 },
		lvldesign: { u: 'Level Designer', order: 0 },
		seni: { u: 'Senior', order: 5 },
		forum: { u: 'Forum Management', order: 6 },
		night: { u: 'Nightfall', order: 6 },
                indo: { u: 'Indonesian', order: 3 },
                watch: { u: 'Watchman', order: 4 },
                neut: { u: 'Neutral Admin', order: 5 },
                kjs: { u: 'The One Who Went on a Holiday Trip', order: 99 },
			}
};
UserTagsJS.modules.custom = {
	'Lemoness': ['sysop', 'tech', 'evadmin', 'lvldesign', 'seni'],
	'ConTraZ VII': ['sysop', 'hier', 'anadmin', 'lvldesign', 'seni'],
	'Athener': ['night'],
	'Vampjrehunter': ['corp'],
	'Ireegg96': ['corp'],
	'Kyroskoh': ['gm'],
	'UserU': ['forum'],
        'Orangbiasa': ['watch', 'indo', 'neut', 'seni'],
        'InspectorWikia': ['indo'],
        'Kjskjs': ['kjs'],
};
UserTagsJS.modules.userfilter = {
	'Lemoness': ['bureaucrat'],
	'Orangbiasa': ['bureaucrat'],
};
UserTagsJS.modules.mwGroups = ['bureaucrat,sysop']; 
UserTagsJS.modules.mwGroups = ['rollback'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

/* Auto-Refresh for Wiki Activity */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
importScriptPage('AjaxRC/code.js', 'dev');
var ajaxPages =["Istimewa:WikiActivity"];

/* Back to top button */
importScriptPage('BackToTopButton/code.js', 'dev');

/* Back to top arrow */
importScriptPage('BackToTopArrow/code.js', 'dev');

/* Spoilers */
SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');

/* Admin List */
importScriptPage('ListAdmins/code.js', 'dev');
 
/* Collapsible Tables */
importScriptPage('ShowHide/code.js', 'dev');

/* Collapsible Infobox */
importScriptPage('CollapsibleInfobox/code.js', 'dev'); 
 
/* Clock */
importScriptPage('DisplayClock/code.js', 'dev');
 
/* Adds Purge button */
var PurgeButtonText = 'Refresh';
importScriptPage('PurgeButton/code.js', 'dev');
 
/* Standard Edit Summaries */
importScriptPage('Standard_Edit_Summary/code.js', 'dev');
 
/* Lists of Duplicate images */
importScriptPage('DupImageList/code.js', 'dev');
 
/* Top Contributor */
importArticles({
    type: 'script',
    articles: [
        'w:dev:TopEditors/code.js'
    ]
});

//********************************************************************
// Added SiteNotice Functionality, credits to RuneScape wiki
//
// Functions:
//   * Moves the dismiss link into the SiteNotice table.
//   * Saves the show/hide status of the SiteNotice in a cookie.
//   * Automatically expands the SiteNotice when the ID is updated.
//********************************************************************
 
var dCookieName = "dismissSiteNotice=";
var msgClose = "dismiss";
var hCookieName = "hideSiteNotice=";
var hCookiePos = document.cookie.indexOf(hCookieName);
var hCookieValue = "";
 
function editSiteNotice() {
    var snbox = document.getElementById('mw-dismissable-notice');
 
    if (snbox != null) {
        if (hCookiePos > -1) {
            hCookiePos = hCookiePos + hCookieName.length;
            var hideEndPos = document.cookie.indexOf(";", hCookiePos);
            if (hideEndPos > -1) {
                hCookieValue = document.cookie.substring(hCookiePos, hideEndPos);
            } else {
                hCookieValue = document.cookie.substring(hCookiePos);
            }
        }
 
        var newLink = document.createElement('a');
        newLink.setAttribute('href', "javascript:dismissNotice();");
        newLink.setAttribute('title', 'Dismiss this notice.');
        newLink.innerHTML = msgClose;
 
        var newSpan = document.createElement('span');
        newSpan.id = 'siteNoticeDismiss';
        newSpan.appendChild(document.createTextNode(' ['));
        newSpan.appendChild(newLink);
        newSpan.appendChild(document.createTextNode(']'));
 
        var hideLink = document.getElementById("collapseButton" + "0");
        hideLink.href = "javascript:hideSiteNotice();"
        hideLink.parentNode.style.width = "12em";
        hideLink.parentNode.appendChild(newSpan);
 
        if (hCookieValue != siteNoticeID && hideLink.innerHTML == "show") {
            collapseTable(0);
        }
        if (hCookieValue == siteNoticeID && hideLink.innerHTML == "hide") {
            collapseTable(0);
        }
    }
}
 
function hideSiteNotice() {
    var hideLink = document.getElementById("collapseButton" + "0");
    var date = new Date();
 
    if (hideLink.innerHTML == 'hide') {
        date.setTime(date.getTime() + 30 * 86400 * 1000);
    } else {
        date.setTime(date.getTime() - 30 * 86400 * 1000);
    }
    document.cookie = hCookieName + siteNoticeID + "; expires=" + date.toGMTString() + "; path=/";
    collapseTable(0);
}
 
if (skin == 'oasis') {
    addOnloadHook(editSiteNotice);
}

/* Username replace feature
 * Inserts viewing user's name into <span class="insertusername"></span>
 * Put text inside the spans to be viewed by logged out users
 * Originally by [[wikia:User:Splarka|Splarka]], then by [[User:Spang|Spang]],
 * This (jQuery) version by [[wikia:User:Joeyaa]], written to be backwards compatible
 */
 
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}

// *****************************************************
// * Javascript Countdown Timer                        *
// * Version 1.6.0                                     *
// *                                                   *
// * Original script by Splarka                        *
// * Additional script by Eladkse                      *
// * Multi-language support script by Dantman          *
// *****************************************************
//
// Usage Example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2013 00:00:00 GMT</span> until the new year...
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>
//  <span class="nomorecountdown">Countdown finished.</span>
//
// Output Example:
//  Only 25 days, 6 hours, 42 minutes and 23 seconds until the new year...
//
 
function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = Math.floor((then.getTime()-now.getTime())/1000);
 
  var userconfig = (window.CountdownConfig) ? window.CountdownConfig : {};
  var config = $.extend(true, {
    'en': {
      and: "and",
      second: "second",
      seconds: "seconds",
      minute: "minute",
      minutes: "minutes",
      hour: "hour",
      hours: "hours",
      day: "day",
      days: "days"
    },
    'fr': {
      and: "et",
      second: "seconde",
      seconds: "secondes",
      minute: "minute",
      minutes: "minutes",
      hour: "heure",
      hours: "heures",
      day: "jour",
      days: "jours"
    },
    'es': {
      and: "y",
      second: "segundo",
      seconds: "segundos",
      minute: "minuto",
      minutes: "minutos",
      hour: "hora",
      hours: "horas",
      day: "día",
      days: "días"
    },
    'de': {
      and: "und",
      second: "Sekunde",
      seconds: "Sekunden",
      minute: "Minute",
      minutes: "Minuten",
      hour: "Stunde",
      hours: "Stunden",
      day: "Tag",
      days: "Tage"
    },
    'it': {
      and: "e",
      second: "secondo",
      seconds: "secondi",
      minute: "minuto",
      minutes: "minuti",
      hour: "ora",
      hours: "ore",
      day: "giorno",
      days: "giorni"
    },
    'pl': {
      and: "i",
      second: "sekund(y)",
      seconds: "sekund(y)",
      minute: "minut(y)",
      minutes: "minut(y)",
      hour: "godzin(y)",
      hours: "godzin(y)",
      day: "dni",
      days: "dni"
    },
    'hu': {
      and: "és",
      second: "másodperc",
      seconds: "másodpercek",
      minute: "perc",
      minutes: "percek",
      hour: "óra",
      hours: "órák",
      day: "nap",
      days: "napok"
    }
  }, userconfig);
 
  // define language
  function msg(name) {
    if ( wgContentLanguage in config && name in config[wgContentLanguage] ) {
      return config[wgContentLanguage][name];
    }
    return config.en[name];
  }
 
  // stop the script when the even date is reached and display the notification
  if (then<now) {
 var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'none'
  var nomorecountdowns = getElementsByClassName(document, 'span', 'nomorecountdown');
  for(var i in nomorecountdowns) nomorecountdowns[i].style.display = 'inline'
  return;
  }
 
  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }
 
 
 
  // determine plus/minus
  if(diff<0) {
    diff = -diff;
  }
 
  // calculate the diff
  // seconds
  left = (diff%60) + ' ' + msg(($(diff%60)[0] == 1) ? 'second' : 'seconds');
 
  // minutes
  diff = Math.floor(diff/60);
  left = (diff%60) + ' ' + msg(($(diff%60)[0] == 1) ? 'minute' : 'minutes') + ', ' + msg('and') + ' ' + left;
 
  // hours
  diff = Math.floor(diff/60);
  left = (diff%24) + ' ' + msg(($(diff%24)[0] == 1) ? 'hour' : 'hours') + ', ' + left;
 
  // days
  diff = Math.floor(diff/24);
  left = diff + ' ' + msg(($(diff)[0] == 1) ? 'day' : 'days') + ', ' + left;
 
  timers[i].firstChild.nodeValue = left;
 
  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
}
 
function checktimers() {
  // hide 'nocountdown' and 'nomorecountdown' and show 'countdown'
  var nomorecountdowns = getElementsByClassName(document, 'span', 'nomorecountdown');
  for(var i in nomorecountdowns) nomorecountdowns[i].style.display = 'none'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'inline'
 
  // set up global objects timers and timeouts.
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
//  End of Code                                     *
// **************************************************

/* Test */
/* Credits to Pad Wiki */

var cond="";
$(function(){
	$.cachedScript = function(url, options) {
	  options = $.extend(options || {}, {
		dataType: "script",
		cache: true,
		url: url
	  });
	  return jQuery.ajax(options);
	};
	// jQuery UI
	$.cachedScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js").done(function(script, textStatus) {
	  // something u call after jquery UI ready
	  textTip();
	});
	moveModule();
	showEnglishLink();
	$("ul.tabbernav a").mouseenter(function(){$(this).click()});
});
function moveModule(){
	if($(".page-Counter-Strike_Online_Wiki").length==0){
		$("#WikiaRail").append($(".move"));
		$(".move").show();
		$(".move:hidden").remove();
	}else{
		$(".move").show();
	}
}
function showEnglishLink(){
	if ($(".WikiaArticleInterlang>ul").length){
		$(".WikiaArticleInterlang a").text("English");
		$("#WikiaPageHeader [data-id=comment]").after($(".WikiaArticleInterlang>ul").addClass("wikia-menu-button").css("width","55px").css("overflow","hidden").css("display","inline-block"));
		$(".WikiaArticleInterlang").remove();
	}
}