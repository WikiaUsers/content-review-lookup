/* Any JavaScript here will be loaded for all users on every page load. */

/*############################################################################*/
/*########################## Import Script Pages #############################*/
/*############################################################################*/
/* Show.hide Tool*/
importScriptPage('ShowHide/code.js', 'dev');

/* Purge Tool*/
PurgeButtonText = 'Refresh';
importScriptPage('PurgeButton/code.js', 'dev');

/* Archive Tool*/
importScriptPage('ArchiveTool/code.js', 'dev');

/* Ajax Auto-Refresh (courtesy pcj) */
/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

/* Chat*/
importScriptPage('MediaWiki:Common.js/chat.js');
 
/*############################################################################*/
/*######################### End Import Script Pages ##########################*/
/*############################################################################*/

/*############################################################################*/
/*################################ Contribs ##################################*/
/*############################################################################*/

/* add contribs to user menu - 2/1/11 */

function UserContribsMenuItem() {
	$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Special:Contributions/'+ encodeURIComponent (wgUserName) +'">Contributions</a></li>');
}
  
addOnloadHook(UserContribsMenuItem);

/*############################################################################*/
/*############################## End Contribs ################################*/
/*############################################################################*/


/*############################################################################*/
/*### Experimental javascript countdown timer (Splarka)Version 0.0.3##########*/
/*############################################################################*/
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


/*############################################################################*/
/*########### - end -  Experimental javascript countdown timer################*/
/*############################################################################*/

function liveClock() {
	var link = wgServer + wgScriptPath + '/index.php?title=' + encodeURIComponent(wgPageName) + '&action=purge';
	if (skin == 'monobook') {
		$('#p-personal .pBody ul').append('<li id="utcdate"><a href="'+link+'"></a></li>');
	} else if (skin == 'oasis') {
		$('#WikiaPage #WikiHeader div.buttons').prepend('<div id="utcdate"><a href="'+link+'"></a></div>');
	}
	$('#utcdate').css({fontSize: 'larger', fontWeight: 'bolder', textTransform: 'none'});
 
	showTime();        
}
addOnloadHook(liveClock);
 
function showTime() {
	var now = new Date();
	var hh = now.getUTCHours();
	var mm = now.getUTCMinutes();
	var ss = now.getUTCSeconds();
	var dd = now.getUTCDate();
	var months = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
	    month  = months[now.getUTCMonth()];
	var year   = now.getUTCFullYear();
	var time = ( hh < 10 ? '0' + hh : hh ) + ':' + ( mm < 10 ? '0' + mm : mm ) + ':' + ( ss < 10 ? '0' + ss : ss ) + ', ' + ( dd < 10 ? '0' + dd : dd ) + ' ' + month + ' ' + year + ' (UTC)';
	$('#utcdate a').text(time);
 
	window.setTimeout(showTime, 1000);
}