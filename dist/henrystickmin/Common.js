/* Any JavaScript here will be loaded for all users on every page load. */

// ***********************
// Script Configurations
// ***********************

window.MassCategorizationGroups = [
    'bot',
    'bureaucrat', 
    'content-moderator', 
    'rollback',
    'sysop'
];
 
window.massCategorizationDelay = 2500; // 2.5 second interval

window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page over time';
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/dev/images/b/ba/Snake_throbber_dark-bg.gif/revision/latest?cb=20140519203615';
window.ajaxPages = Array(
    "Special:WikiActivity",
    "Special:WikiActivity/watchlist",
    "Special:Log",
    "Special:Contributions",
    "Special:Watchlist",
    "Special:RecentChanges",
    "Special:RecentChangesLinked",
    "Special:Images",
    "Special:ListFiles",
    "Special:NewPages",
    "Special:UncategorizedPages",
    "Special:Categories",
    "Blog:Recent_posts"
);
 
jQuery.extend(true, window, {dev: {i18n: {overrides: {AjaxRC: {
    'ajaxrc-refresh-text': 'Auto-refresh',
    'ajaxrc-refresh-hover': 'Automatically refresh the page over time',
}}}}});

window.SpoilerAlertJS = {
    question: 'This area contains spoilers for endings / fails. \
               Are you sure you want to read it?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 545
};

// ******************************************************
// Experimental JavaScript countdown timer (By Splarka)
// Version 0.0.3
// ******************************************************
//
// Usage example:
//  <span class = "countdown" style = "display:none;">
//  Only <span class = "countdowndate">January 01 2007 00:00:00 PST</span> until New years. </span>
//  <span class = "nocountdown">JavaScript disabled.</span>
 
function updatetimer(i) {
    var now = new Date();
    var then = timers[i].eventdate;
    var diff = count = Math.floor((then.getTime() - now.getTime()) / 1000);
 
    // Catch bad date strings
 
    if (isNaN(diff)) { 
      timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
      return;
    }
 
    // Determine plus/minus
 
    if (diff < 0) {
      diff = -diff;
      var tpm = 'T plus ';
    } else {
      var tpm = 'T minus ';
    }
 
    // Calculate the diff
 
    var left = (diff % 60) + ' seconds',
        diff = Math.floor(diff / 60);
 
    if (diff > 0) left = (diff % 60) + ' minutes ' + left;
        diff = Math.floor(diff / 60);
 
    if (diff > 0) left = (diff % 24) + ' hours ' + left;
        diff = Math.floor(diff / 24);
 
    if (diff > 0) left = diff + ' days ' + left;
    timers[i].firstChild.nodeValue = tpm + left;
 
    // A setInterval() is more efficient, but calling setTimeout()
    // Makes errors break the script rather than infinitely recurse
 
    timeouts[i] = setTimeout('updatetimer('+i+')', 1000);
  }
 
  function checktimers() {
 
    // Hide 'nocountdown' and show 'countdown'
 
    var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
    for(var i in nocountdowns) nocountdowns[i].style.display = 'none';
    var countdowns = getElementsByClassName(document, 'span', 'countdown');
    for(var i in countdowns) countdowns[i].style.display = 'inline';
 
    // Set up global objects timers and timeouts.
 
    timers = getElementsByClassName(document, 'span', 'countdowndate');  // Global
    timeouts = new Array(); // Generic holder for the timeouts, global
    if (timers.length === 0) return;
    for (var i in timers) {
        timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
        updatetimer(i);  // Start it up
    }
  }
 
 // addOnloadHook(checktimers);
 
// *******************************************
// Adds a button to clear Deletion reasons
// *******************************************
 
if (mw.config.get('wgAction') === 'delete') {
    $('#wpReason').after(' <span id = "wpClearReason" class = "button">\u232b</span>');
    $('#wpClearReason').click(function () {
        $('#wpReason').val('').focus();
    });
}