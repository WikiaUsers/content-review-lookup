/* 此处的JavaScript将加载于所有用户每一个页面。 */

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
    var tpm = 'T plus ';
  } else {
    var tpm = '离这项活动时间还剩下 ';
  }

  // calculate the diff
  var left = (diff%60) + '秒';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + '分 ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + '小时 ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + '天 ' + left
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

/* My Watchlist seems to have returned
function restoreWatchlistLink () {
  var wlLink       = document.createElement('a');
  wlLink.href      = '/wiki/Special:Watchlist';
  wlLink.title     = 'Your watchlist';
  wlLink.innerHTML = "My watchlist";
  var wlObj        = document.createElement('span');
  wlObj.id         = 'header_mywatchlist';
  wlObj.appendChild(wlLink);
  document.getElementById('userData').insertBefore(wlObj, document.getElementById('header_mytalk').nextSibling);
}
addOnloadHook(restoreWatchlistLink);
*/