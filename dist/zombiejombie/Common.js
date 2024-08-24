/* Any JavaScript here will be loaded for all users on every page load. */

//* Imported Scripts *//

var ajaxPages = ["Special:RecentChanges", "Special:Watchlist", "Special:Log", "Special:Contributions", "Forum:Watercooler", "Special:AbuseLog", "Special:NewFiles", "Special:Statistics", "Zombie_Jombie_Wiki:View_Counter"];
var AjaxRCRefreshText = 'Auto-refresh';

window.SpoilerAlert = {
    question: 'This page contains unreleased material and spoilers. Are you sure you want to see it?',
    yes: 'Yes, please',
    no: 'No, not yet',
    isSpoiler: function () {
        return -1 != $.inArray('Unreleased Material', wgCategories);
    }
};

InactiveUsers = { 
    months: 1,
};

importArticles({
    type: "script",
    articles: [
        "w:c:deadisland:User:Jgjake2/js/DISPLAYTITLE.js",
        "w:c:dev:DisableArchiveEdit/code.js",
        "w:c:dev:BackToTopButton/code.js",
        "w:c:dev:FixWantedFiles/code.js",
        "w:c:dev:ListAdmins/code.js",
        "w:c:dev:PurgeButton/code.js",
        "w:c:dev:AjaxRC/code.js",
        "w:c:dev:DisplayTimer/code.js",
        "w:c:dev:SpoilerAlert/code.js",
        "w:c:dev:InactiveUsers/code.js",
        "w:c:dev:LockOldBlogs/code.js",
        "w:c:dev:DupImageList/code.js",
        "w:c:dev:VisualSpellCheck/code.js",
        "MediaWiki:Wikia.js/userRightsIcons.js",
        "MediaWiki:Common.js/CollapseElements.js"
    ]
});

//* End of Imported Scripts *//

// ============================================================
// BEGIN Dynamic Navigation Bars (experimantal)
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history


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


/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */

/* auto-zebra stripe for tables */

var ts_alternate_row_colors = true;

function zebraStripe() {
if ($("table.zebra > tbody > tr").eq(1).css("background-color") == "#363636" && $("table.zebra > tbody > tr").eq(2).css("background-color") == "transparent") {
$("table.zebra > tbody > tr:nth-child(2n+1)").not(".nozebra").css("background-color","#424242");
$(".sortheader").bind("click", function() {
$("table.zebra > tbody > tr").not(".nozebra").css("background-color","#363636");
$("table.zebra > tbody > tr:nth-child(2n+1)").not(".nozebra").css("background-color","#424242");
});
}
}


/* Countdown */

// *****************************************************
// * Javascript Countdown Timer                        *
// * Version 1.5.6                                     *
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
//
// Output Example:
//  Only 25 days, 6 hours, 42 minutes and 23 seconds until the new year...
//
 
function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = count=Math.floor((then.getTime()-now.getTime())/1000);
 
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
 
  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }
 
  // determine plus/minus
  if(diff<0) {
    diff = '0';
  }
 
  // calculate the diff
  if ((diff%60) == 1) {
    left = (diff%60) + ' ' + msg('second');
  } else {
    left = (diff%60) + ' ' + msg('seconds');
  }
    diff=Math.floor(diff/60);
  if(diff > 0) {
    if ((diff%60) == 1) {
      left = (diff%60) + ' ' + msg('minute') + ', ' + msg('and') + ' ' + left;
    } else {
      left = (diff%60) + ' ' + msg('minutes') + ', ' + msg('and') + ' ' + left;
    }
  }
    diff=Math.floor(diff/60);
  if(diff > 0) {
    if ((diff%24) == 1) {
      left = (diff%24) + ' ' + msg('hour') + ', ' + left;
    } else {
      left = (diff%24) + ' ' + msg('hours') + ', ' + left;
    }
  }
    diff=Math.floor(diff/24);
  if(diff > 0) {
    if (diff == 1) {
      left = diff + ' ' + msg('day') + ', ' + left;
    } else {
      left = diff + ' ' + msg('days') + ', ' + left;
    }
  }
  timers[i].firstChild.nodeValue = left;
 
  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
}
 
function checktimers() {
  // hide 'nocountdown' and show 'countdown'
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
//

/* Flag Counter */
$(document).ready(function() {
	$('body').append('<div id="counter"><img src="http://s11.flagcounter.com/mini/dNd/bg_404040/txt_D5D4D4/border_404040/flags_0/" alt="" border="0" width="1" height="1"></div>');
});
/* End */