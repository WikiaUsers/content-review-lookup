/* Az ide elhelyezett JavaScript kód minden felhasználó számára lefut az oldalak betöltésekor. */

// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3
// **************************************************
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
  var left = (diff%60) + ' másodperc';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' perc ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' óra ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' nap ' + left
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

// Spoiler Alert
SpoilerAlert = {
    question: 'WARNING! This page contains MAJOR spoilers from recently released material.<br />Are you sure you wish to proceed to the page?.',
    yes: 'Yes, please',
    no: 'No, not yet',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoilery');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');
 
// - end -  Spoiler Alert


// Auto-refresh
 
/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
 
// ** Recent Wiki Activity and Recent changes auto refresh ** //
AjaxRCRefreshText = 'Automatikus frissítés';
AjaxRCRefreshHoverText = 'Automatikusan frissíti az oldalt';
ajaxPages = ["Speciális:RecentChanges","Speciális:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
 
// - end - Auto-refresh

// Imports
importArticles({
    type: 'script',
    articles: [
        'w:c:dev:ReferencePopups/code.js',
        'w:c:dev:LockOldBlogs/code.js',
        'u:dev:MiniComplete/code.js',
        'MediaWiki:Common.js/standardeditsummaries.js'
    ]
});
// -end- Imports