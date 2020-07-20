//* Credits to Twisted Wiki  */
importArticles({
	type: "script",
	articles: [
		"w:dev:AllPagesHideRedirect/code.js",
		"w:dev:RevealAnonIP/code.js",
		"w:dev:VisualSpellCheck/code.js",
                "w:dev:WallGreetingButton/code.js",
		"MediaWiki:Common.js/displayclock.js",
	]
});


/* Collapsible classes
 * See w:c:dev:ShowHide for info and attribution
 */
 
importScriptPage('ShowHide/code.js', 'dev');

importScriptPage('Countdown/code.js', 'dev');
 
/* track incontent share fb button */
$(function(){
    $("#incontent_share").click(function(){
        WET.byStr("articleAction/incontent_share/" + wgPageName);
    });
});
 
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */

AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
/* Adds "purge" option to page controls
 
* See w:c:dev:PurgeButton for info & attribution
*/
 
 
 
importScriptPage('PurgeButton/code.js', 'dev');

var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
var maxHeight = 300;

/* Slider */

importScriptPage('BackToTopButton/code.js', 'dev');
window.UserTagsJS = {
	modules: {},
	tags: {
		founder: { u: 'Admin' },
		
	}
};
UserTagsJS.modules.custom = {

};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'rollback'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

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
  var left = (diff%60) + ' Sekunden';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' Minuten ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' Stunden ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' Tage ' + left
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