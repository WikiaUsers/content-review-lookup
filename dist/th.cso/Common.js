/* จาวาสคริปต์ในหน้านี้จะถูกใช้งานต่อผู้ใช้ทุกคน */

/* Any JavaScript here will be loaded for all users on every page load. */
 
/* IRC */
function onloadhookcustom() {
	var replace = document.getElementById("JRChatReplace");
	if (null != replace) {
		replace.innerHTML='<iframe src="http://webchat.freenode.net/?channels=Wikia-CSO" width="670" height="400"></iframe>';
		if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
		else window.onbeforeunload = confirmexitjrchat;
 
	}
	//alert(document.getElementById("JRChatReplace").innerHTML);
 
}
 
if (window.addEventListener) window.addEventListener("load",onloadhookcustom,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookcustom);
 
/* Chat Tags */
importScriptPage('ChatTags/code.js', 'dev');
 
/* Message Wall User Tags */
window.MessageWallUserTags = {
    tagColor: 'red',
    glow: true,
    glowSize: '3px',
    glowColor: '#f77',
    users: {
        'Lemoness': 'Wiki Révolutionnaire',
        'Athener': 'Wiki Révolutionnaire',
        'ConTraZ VII': 'Wiki Révolutionnaire',
        'UserU': 'Wiki Révolutionnaire',
        'Vampjrehunter': 'Legendary Hunter',
    }
};
 
importArticles({
    type: 'script',
    articles: [
        //other scripts,
        'u:dev:MessageWallUserTags/code.js'
    ]
});
 
/* Colors */
importScriptPage('Colors/code.js', 'dev');
 
/* External Image Loader */
importScriptPage('ExternalImageLoader/code.js', 'dev');
 
/* Category Sorter */
importScriptPage('Category Sorter/code.js', 'dev');
 
/* Wall Greeting */
importScriptPage('WallGreetingButton/code.js', 'dev')
 
/* Tool tips */
var tooltips_list = [
    {
        classname: 'custom-tooltip-text',
        text: "Parameter: <#parameter#><br/>This is just text and HTML - wikitext '''won't''' be parsed",
    }, {
        classname: 'custom-tooltip-parse',
        parse: '{|style="white-space:nowrap;"\n!Weapon:\n|<#weapon#>\n|-\n!Buy Price:\n|<#price#>\n|-\n!Damage:\n|<#damage#>\n|-\n!Accuracy:\n|<#accuracy#>\n|-\n!Recoil:\n|<#recoil#>\n|-\n!Fire Rate:\n|<#rof#>\n|-\n!Weight:\n|<#weight#>\n|-\n!Ammo:\n|<#ammo#>\n|-\n!Fire Mode:\n|<#firemode#>\n|-\n!Secondary:\n|<#sf#>\n|-\n!Used By:\n|<#who#>\n|',
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
 
/* Automatic signature */
importScriptPage('Sine/code.js', 'dev');
 
/* Voice Dictation */
importScriptPage('Voice Dictation/voice.js', 'dev');
 
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
		tech: { u: 'Technician', order: 1 },
		serg: { u: 'Sergeant', order: 2 },
		sserg: { u: 'Staff Sergeant', order: 1 },
		corp: { u: 'Corporal', order: 3 },
		hier: { u: 'Hierarchy', order: 1 },
		fgm: { u: 'Former Game Master', order: 0 },
		gm: { u: 'Game Master', order: 0 },
		evadmin: { u: 'Demonic Admin', order: 0 },
		anadmin: { u: 'Angelic Admin', order: 0 },
		lvldesign: { u: 'Level Designer', order: 8 },
		seni: { u: 'Senior', order: 5 },
		forum: { u: 'Forum Management', order: 6 },
		night: { u: 'Nightfall', order: 6 },
                indo: { u: 'Indonesian', order: 3 },
                watch: { u: 'Watchman', order: 4 },
                neut: { u: 'Neutral Admin', order: 0 },
                kjs: { u: 'The One Who Went on a Holiday Trip', order: 99 },
                hakuchild: { u: 'White Child', order: 99 },
                ssupervise: { u: 'Under Strict Supervision', order: 0 },
                supervise: { u: 'Under Supervision', order: 0 },
                revolution: { u: 'Wiki Révolutionnaire', order: 0 },
			}
};
UserTagsJS.modules.custom = {
	'Lemoness': ['sysop', 'tech', 'evadmin', 'lvldesign', 'seni', 'rollback', 'chatmoderator', 'revolution'],
	'ConTraZ VII': ['sysop', 'bureaucrat', 'hier', 'anadmin', 'lvldesign', 'seni', 'revolution'],
	'Athener': ['night', 'revolution'],
	'Vampjrehunter': ['corp'],
	'Ireegg96': ['corp'],
	'Kyroskoh': ['fgm'],
        'Dragoncty': ['gm'],
	'UserU': ['forum', 'revolution'],
        'Orangbiasa': ['watch', 'indo', 'neut', 'seni'],
        'InspectorWikia': ['indo'],
        'Kjskjs': ['kjs'],
        'Hakudoushii': ['hakuchild'],
        'Ireegg96': ['ssupervise'],
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
	showIndonesiaLink();
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
function showIndonesiaLink(){
	if ($(".WikiaArticleInterlang>ul").length){
		$(".WikiaArticleInterlang a").text("Bahasa Indonesia");
		$("#WikiaPageHeader [data-id=comment]").after($(".WikiaArticleInterlang>ul").addClass("wikia-menu-button").css("width","113px").css("overflow","hidden").css("display","inline-block"));
		$(".WikiaArticleInterlang").remove();
	}
}
 
/* File Usage Auto Update */
if (wgPageName.indexOf("Special:MovePage/File:") != -1 || (wgCanonicalNamespace == "File" && Storage)){
   importScriptPage("FileUsageAuto-update/code.js/min.js", "dev");
}
 
/* Standard Edit Summaries (Fixes) */
/*jshint jquery:true, browser:true, es5:true, devel:true, camelcase:true, curly:false, undef:true, bitwise:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, unused:true, regexp:true, strict:true, trailing:false*/
 
$(function() {
 
    'use strict';
 
    var $textarea = $('#wpSummary');
 
    if (!$textarea.length || document.getElementById('stdSummaries')) return;
 
    var presets = (window.dev && window.dev.editSummaries) || {},
    css = 'css' in presets ? presets.css :
        '#stdSummaries { border-color: #7A7979; border-radius: 4px; padding: 1px 2px; width: 264px; } ' +
        '.editpage-sourcewidemode-on.mode-source #stdSummaries { left: -17px; position: relative; top: 7px; width: 258px; }',
    select = presets.select || 'Template:Stdsummaries';
 
    $textarea.attr('tabindex', '3'); //set tabindex for summaries text area
    $('#wpMinoredit').attr('tabindex', '4'); //set tabindex for minor edit checkbox
    $('#wpSave').attr('tabindex', '5'); //set tabindex for publish button
 
    var $summary = $('#wpSummaryEnhanced');
    if (!$summary.length) $summary = $textarea;
 
    if (css) $('head').append('<style type="text/css">' + css + '</style>');
 
    var $combo = $('<select id="stdSummaries" tabindex="2"></select>')
    .insertAfter($textarea)
    .change(function() {
        //var val = $summary.val();
        //$summary.val(val + (val.length ? '; ' : '') + $(this).val());
        $summary.val($(this).val());
    });
 
    function flatten (options, indent) {
        var flattened = [];
        indent = indent || '';
        for (var i = 0; i < options.length; i++) {
            if ($.isArray(options[i])) {
                flattened = flattened.concat(flatten(options[i], '-- '));
            } else {
                flattened.push(indent + options[i]);
            }
        }
        return flattened;
    }
 
    function render (lines) {
        var options = '', selected = ' selected',
            ignore = { ':': 1, '*': 1,  '<': 1 };
        for (var i = 0; i < lines.length; i++, selected = '') {
            if (!lines[i].length || ignore[lines[i][0]]) {
                continue; // lines beginning with these characters: : * < are ignored
            }
            if (lines[i].substring(0, 3) === '-- ') {
                var contents = mw.html.escape( lines[i].substring(3) );
                options += '<option value="' + contents + '"' +
                    selected + '>&nbsp;&nbsp;' + contents + '</option>';
            } else {
                options += '<option value="" disabled' +
                    selected + '>' + mw.html.escape( lines[i] ) + '</option>';
            }
        }
        $combo.append(options);
    }
 
    if (typeof select === 'string') {
        $.get('/wiki/' + select + '?action=raw')
        .done(function (data) {
            render(data.split(/\r\n|\n|\r/));
        });
    } else if ($.isArray(select)) {
        render(flatten(select));
    }
});
 
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