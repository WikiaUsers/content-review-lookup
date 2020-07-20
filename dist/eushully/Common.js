/* Any JavaScript here will be loaded for all users on every page load. */
/* Chat Tags */
importScriptPage('ChatTags/code.js', 'dev');

/* External Image Loader */
importScriptPage('ExternalImageLoader/code.js', 'dev');

/* Tool tips */
var tooltips_list = [
    {
        classname: 'tooltip-text',
        text: "<#Para#>",
    }, {
        classname: 'custom-tooltip-text',
        text: "Parameter: <#parameter#><br/>This is just text and HTML - wikitext '''won't''' be parsed",
    }, {
        classname: 'tooltip-card',
        parse: '{|style="white-space:nowrap;"\n!Japanese:\n|<#jap#>\n|-\n!English:\n|<#eng#>\n|-\n!Card Num:\n|<#cardnum#>\n|-\n!Synthesis:\n|<#synth#>\n|-\n!Type:\n|<#type#>\n|-\n!Rarity:\n|<#rarity#>\n|-\n!Eq. Slots:\n|<#eqslot#>\n|-\n!Cost:\n|<#cost#>\n|-\n!Ctrl Power:\n|<#ctrl#>\n|-\n!HP:\n|<#hp#>\n|-\n!ATK:\n|<#atk#>\n|',
    }, {
        classname: 'basic-tooltip',
        delay: 500,
        onHide: function() { $(this).html('') },
    },
]
importScriptPage('Tooltips/code.js', 'dev');
/* Thread Inspection */
importScriptPage('Thread Inspection/code.js', 'dev');
/* Star Ratings */
importScriptPage('StarRatings/code.js', 'dev');
/* Layout Switch Button */
window.monoBookText = "MonoBook Layout";
window.oasisText = "Wikia Layout";
window.mobileText = "Mobile View";
importScriptPage('SkinSwitchButton/code.js', 'dev');

/* Search Suggest */
importArticles({
    type: 'script',
    articles: [
        'u:dev:SearchSuggest/code.js'
    ]
});

/* Timed Slider */
importArticles({
    type: 'script',
    articles: [
        'u:dev:TimedSlider/code.js'
    ]
});

/* Chat Options */
importScriptPage('ChatOptions/code.js', 'dev');

/* Code */
importArticles({
    type: 'script',
    articles: [
        'u:dev:Code/code.js'
    ]
});

/* Visual Spell Check */
importScriptPage('VisualSpellCheck/code.js','dev');

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
                hier: { u: 'Hierarchy', order: 0 },
                gm: { u: 'Game Master', order: 0 },
                evadmin: { u: 'Demonic Admin', order: 0 },
                anadmin: { u: 'Angelic Admin', order: 1 },
                seni: { u: 'Senior', order: 5 },
                forum: { u: 'Forum Management', order: 6 },
                watch: { u: 'Watchman', order: 4 },
                neut: { u: 'Neutral Admin', order: 5 },
}
};
UserTagsJS.modules.custom = {
'Lemoness': ['sysop', 'tech'],
};
UserTagsJS.modules.userfilter = {
'Lemoness': ['bureaucrat'],
};
UserTagsJS.modules.mwGroups = ['bureaucrat,sysop']; 
UserTagsJS.modules.mwGroups = ['rollback'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

/* Auto-Refresh for Wiki Activity */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
importScriptPage('AjaxRC/code.js', 'dev');
var ajaxPages =["Special:WikiActivity"];

/* Back to top button */
importScriptPage('BackToTopButton/code.js', 'dev');

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

/* Lists of Duplicate images */
importScriptPage('DupImageList/code.js', 'dev');

/* Top Contributor */
importArticles({
    type: 'script',
    articles: [
        'w:dev:TopEditors/code.js'
    ]
});
if (wgUserName != 'null') {
$('.insertusername').html(wgUserName);
}

// *****************************************************
// * Javascript Countdown Timer *
// * Version 1.6.0 *
// * *
// * Original script by Splarka *
// * Additional script by Eladkse *
// * Multi-language support script by Dantman *
// *****************************************************
//
// Usage Example:
// <span class="countdown" style="display:none;">
// Only <span class="countdowndate">January 01 2013 00:00:00 GMT</span> until the new year...
// </span>
// <span class="nocountdown">Javascript disabled.</span>
// <span class="nomorecountdown">Countdown finished.</span>
//
// Output Example:
// Only 25 days, 6 hours, 42 minutes and 23 seconds until the new year...
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
// End of Code *
// **************************************************

/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://dragonage.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");
mw.loader.using( ['jquery.ui.tabs'], function() {
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