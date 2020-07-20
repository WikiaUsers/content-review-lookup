/* Any JavaScript here will be loaded for all users on every page load. */

// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3s
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
  var left = (diff%60) + ' seconds';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutes ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' hours ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' days ' + left;
  timers[i].firstChild.nodeValue = tpm + left;

  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
}

function checktimers() {
  //hide 'nocountdown' and show 'countdown'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none';
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'inline';

  //set up global objects timers and timeouts.
  timers = getElementsByClassName(document, 'span', 'countdowndate');  //global
  timeouts = new Array(); // generic holder for the timeouts, global
  if(timers.length === 0) return;
  for(var i in timers) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers);

// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************

$(".openchat a").click(function() {
   window.open('/wiki/Special:Chat', 'wikiachat', 'width=600,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=yes');
   return false;
});

/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").text(wgUserName);
 }
 addOnloadHook(UserNameReplace);

//ListFiles//

importArticles({
    type: "script",
    articles: [
        'MediaWiki:Common.js/standardeditsummaries.js',
        'u:dev:DisplayClock/code.js',
        'u:dev:DupImageList/code.js',
        'u:dev:BackToTopButton/code.js',
        'u:dev:ShowHide/code.js',
        'u:dev:RevealAnonIP/code.js',
        'u:dev:InactiveUsers/code.js',
        'u:dev:ExtendedNavigation/code.js',
        'u:dev:ListFiles/code.js', // ListFiles from Dev Wiki
        'u:dev:TopEditors/code.js'
    ]
});

addOnloadHook(UserNameReplace);
/* Adds a spoiler alert to pages that have the category 'Spoilers' */
SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoilers');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');


// Spoiler Warning 
// @author: Original Authority
// var day = new Date().getDay();
 
// if (mw.config.get('wgAction') === 'edit' && day == 4) { //4 = Thursday // confirm('Please note that adding spoilers to articles today is against our wiki policies. Please wait until tomorrow and the episode has aired in the US to add spoiler to articles. Any instance of spoilers on articles will get you blocked. Thanks for your co-operation!');
// }

// end Spoiler warning

// AjaxRC
window.ajaxPages = ["Special:WikiActivity","Special:Log","Special:RecentChanges"];
window.ajaxIndicator = 'https://images.wikia.nocookie.net/__cb20100609110347/software/images/a/a9/Indicator.gif';
window.AjaxRCRefreshText = 'Auto Refresh';
window.AjaxRCRefreshHoverText = 'Silently refreshes the contents of this page every 60 seconds without requiring a full reload';
importScriptPage("MediaWiki:AjaxRC/code.js", "dev");