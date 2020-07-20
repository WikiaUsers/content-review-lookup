/* Any JavaScript here will be loaded for all users on every page load. */


function fBox() {
	$('#fbox').append('<iframe src="http://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Fpages%2FHow-I-Met-Your-Mother-Wiki%2F135634716493499&amp;width=292&amp;colorscheme=light&amp;connections=0&amp;stream=false&amp;header=true&amp;height=62" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:292px; height:62px;" allowTransparency="true"></iframe>');
}

$(fBox);

/** ========================================================
 *  SITEMETER
 *  Taken from the MediaWiki:Common.js and 
 *  MediaWiki:Common.js/sitemeter.js pages at the RuneScape Wiki
 *  ========================================================
 */

function wikiSiteMeter() {
    if(skin == "oasis") {
		$('<ul style="float: left; margin-top: -2px; margin-bottom: 0px;"><li title="Pageviews since January 2011."><a href="http://s48.sitemeter.com/stats.asp?site=s48himym" target="_top"><img src="http://s48.sitemeter.com/meter.asp?site=s48himym" alt="SiteMeter" border=0 /></a></li></ul>').insertBefore('.CorporateFooter ul');
	} else if(skin == "monobook") {
		var $sidebar = $('#p-wikicities-nav');
		var comboString = "<div style='margin:5px'></div><h5>sitemeter</h5><div class='pBody'><div style='margin-top:2px; margin-bottom:5px'><table style='width:100%; text-align:center'><tr><td style='font-size:85%'>Pageviews since January 2011</td></tr><tr><td><a href='http://s48.sitemeter.com/stats.asp?site=s48himym' target='_top'><img src='http://s48.sitemeter.com/meter.asp?site=s48himym' alt='SiteMeter' border=0 /></a></td></tr></table></div></div>";
		$sidebar.html($sidebar.html() + comboString);
	}
}

$(wikiSiteMeter);

/** ========================================================
 *  END OF SITEMETER
 *  ========================================================
 */

// *************************************************************************************************************
// **************************** Experimental javascript countdown timer (Splarka) ******************************
// ******************************************** Version 0.0.2 **************************************************
// *************************************************************************************************************
// ******************* Code Source: Redwall Wiki - redwall.wikia.com/wiki/MediaWiki:Common.js ******************
// *************************************************************************************************************
// Embed with a span class="countdowntimer", eg:
// <span class="countdowntimer" style="display:none;">April 12 2008 00:00:01 AM EST</span>
// default replacement text can accompany, eg: <span class="notimer">*javascript required*</span>
 
function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = count=Math.floor((then.getTime()-now.getTime())/1000);
 
  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }
 
  // catch negative dates
  if(diff<0) {
    diff = -diff;
    var left = 'ago since';
  } else {
    var left = 'until';
  }
 
  // calcuate the diff
  left = (diff%60) + ' seconds ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutes and ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' hours, ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' days, ' + left
  timers[i].firstChild.nodeValue = left;
 
  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  tim[i] = setTimeout('updatetimer(' + i + ')',1000);
}
 
function checktimers() {
  var untimers = getElementsByClassName(document, 'span', 'notimer');
  for(var i=0;i < untimers.length; i++) {
    untimers[i].style.display = 'none';    
  }
  timers = getElementsByClassName(document, 'span', 'countdowntimer');  //global
  tim = new Array(); // generic holder for the timeouts, global
  if(timers.length == 0) return;
  for(var i=0;i < timers.length; i++) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    timers[i].firstChild.nodeValue = '0 days 0 hours 0 minutes 0 seconds';
    timers[i].style.display = 'inline';
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers)

var	ajaxIndicator = ajaxIndicator || 'https://images.wikia.nocookie.net/__cb20100617104236/dev/images/d/de/Ajax-loader.gif', 
	ajaxTimer,
	ajaxRefresh = 30000,
	AjaxRCRefreshText = 'Auto-refresh',
	AjaxRCRefreshHoverText = 'Check to automatically refresh the page',
	doRefresh = true;
 
if ( !window.ajaxPages ) {
	var ajaxPages = [ 'Special:RecentChanges', 'Special:Log', 'Special:WikiActivity', 'Special:WikiActivity/activity', 'Special:WikiActivity/watchlist' ];
}
if ( !window.ajaxCallAgain ) {
	var ajaxCallAgain = [];
}


importArticles({
    type: "script",
    articles: [
        "w:c:dev:AjaxRC/code.js",
        "w:c:dev:ReferencePopups/code.js",
        "w:c:dev:RevealAnonIP/code.js",
        "w:c:dev:UserTags/code.js"
    ]
});
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { order: 0 },
		sysop: { order: 1 },
		council: { order: 2 }
	}
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
// NOTE: bannedfromchat displays in Oasis but is not a user-identity group so must be checked manually
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global', 'council'];