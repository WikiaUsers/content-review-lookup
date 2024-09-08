/* Any JavaScript here will be loaded for all users on every page load. */

setInterval(function() {
    $('.Clock').text(new Date().toLocaleTimeString());
}, 1000);

/****
 --------------------------------------------------------------------
  # BEGIN widespread codes
 --------------------------------------------------------------------
**/

//==================================================================
// Boost general site performance and make for better chaching
//==================================================================
 
var hasClass = (function () {
    var reCache = {}; return function (element, className) {
        return (reCache[className] ? reCache[className] : 
        (reCache[className] = new RegExp("(?:\\s|^)" + 
        className + "(?:\\s|$)"))).test(element.className);
};})();
 
// **************************************************
// Experimental JavaScript countdown timer (Splarka)
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
    var tpm = 'T plus ';
  } else {
    var tpm = 'T minus ';
  }
 
  // calculate the diff
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

//=========================================================
// Makes {{Username}} display the username of the vistor
// Requires copying of Template:Username
//=========================================================
 
$(function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && 
    disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").text(wgUserName);
});

/****
 --------------------------------------------------------------------
  # END widespread codes
 --------------------------------------------------------------------
**/

/****
 --------------------------------------------------------------------
  # BEGIN other original code
 --------------------------------------------------------------------
**/
 
//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// Load ext.geshi.local to better support code syntax highlighting
//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
 
;(function ($, mw) {
    if ([1200, 1201].indexOf(mw.config.get('wgNamespaceNumber')) !== -1 && 
    $('.mw-geshi').length) {mw.loader.load('ext.geshi.local');}})
(jQuery, mediaWiki);

//*************************************************************************
/* Automatically displays the Edit dropdown menu on userpages upon hover 
rather than click */
//*************************************************************************
 
$('.UserProfileActionButton .drop').hover(function() {
 $('.UserProfileActionButton .wikia-menu-button').addClass('active'); 
});

/****
 --------------------------------------------------------------------
  # END other original code
 --------------------------------------------------------------------
**/

/****
 --------------------------------------------------------------------
  # BEGIN Dev wiki scripts
 --------------------------------------------------------------------
**/

//Spoiler alert
 
window.SpoilerAlertJS = {
    question: "Warning! This page contains spoilers for fanfictions on this site, or otherwise important information initially concealed. Are you sure want to see them?",
    yes: 'Yes',
    no: 'No',
    fadeDelay: 1260
};

//Less

window.lessOpts = window.lessOpts || [];
 
window.lessOpts.push({
    target: 'MediaWiki:Wikia.css',
    source: 'MediaWiki:Custom-wikia.less',
    load: [
        'MediaWiki:Wikia.css',
        'MediaWiki:Custom-general.less'
    ]
}); window.lessOpts.push({
    target: 'MediaWiki:Specifics.css',
    source: 'MediaWiki:Custom-specifics.less',
    load: [
        'MediaWiki:Specifics.css',
        'MediaWiki:Custom-specifics.less'
    ]
});
 
window.lessConfig = {
    reload: true,
    wrap: false, //Don't wrap LESS code in pre tags
    //allowed: [] 
};

/****
 --------------------------------------------------------------------
  # END Dev Wiki codes
 --------------------------------------------------------------------
**/