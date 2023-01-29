/* Most code at the end of this page is written by the users of the RuneScape Wiki, and are given full credit for their creations, as is Monchoman45 for his chathacks.js script. *Nods hat* */

/* Embeds IRC in pages */
importScript('MediaWiki:Common.js/embedirc.js‎');

/* Allows span countdowns to work */
function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = Math.floor((then.getTime()-now.getTime())/1000);
 
  // catch bad date strings
  if (isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }
 
  // reduce modulo period if necessary
  if (timers[i].period > 0){
    if (diff<0) diff = timers[i].period - ((-diff)%timers[i].period); else diff = diff%timers[i].period;
  
    // calcuate the diff
    var left = '';
      diff=Math.floor(diff/60);
    if (diff > 0) left = (diff%60) + ' minutes' + left;
      diff=Math.floor(diff/60);
    if (diff > 0) left = (diff%24) + ' hours ' + left;
      diff=Math.floor(diff/24);
    if (diff > 0) left = diff + ' days ' + left
    timers[i].firstChild.nodeValue = tpm + left;

    // a setInterval() is more efficient, but calling setTimeout()
    // makes errors break the script rather than infinitely recurse
    timeouts[i] = setTimeout('updatetimer(' + i + ')', 60000);
  }
}
 
function checktimers() {
  //hide 'nocountdown' and show 'countdown'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'inline'
 
  //set up global objects timers and timeouts.
  timers = getElementsByClassName(document, 'span', 'countdowndate');
  timeouts = new Array(); // generic holder for the timeouts, global
  if(timers.length == 0) return;
  for(var i in timers) {
    var str = timers[i].firstChild.nodeValue;
    var j = str.indexOf('|');
    if(j == -1) timers[i].period = 0; else {
      timers[i].period = parseInt(str.substr(0, j));
      if(isNaN(timers[i].period) || timers[i].period < 0) timers[i].period = 0;
      str = str.substr(j + 1);
    }
    timers[i].eventdate = new Date(str);
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers);

/* Loads New Buttons on Userpage Bars */
importScript('MediaWiki:Common.js/rights.js')

/* ChatHacks */
importScript('MediaWiki:Common.js/chathacks.js');

/* UTC Timer at top bar */
importScript('MediaWiki:Common.js/displayTimer.js');

/* Add My Contributions to Account Navigation bar at top of page */
importScript('MediaWiki:Common.js/accountNavigation.js');

/* Custom Edit Buttons, yay! */ 
importScript('MediaWiki:Common.js/CEB.js');

/* RealTime Clock */
importScript('MediaWiki:Common.js/realclock.js');