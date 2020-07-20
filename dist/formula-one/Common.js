/* Any JavaScript here will be loaded for all users on every page load. */
// ============================================================
// BEGIN JiaThis
// ============================================================
document.write("<!-- JiaThis Button BEGIN -->");
document.write("<script type=\"text\/javascript\">var jiathis_config = {data_track_clickback:true};<\/script>");
document.write("<script type=\"text\/javascript\" src=\"http:\/\/v2.jiathis.com\/code\/jiathis_r.js?type=left&amp;move=0&amp;btn=l3.gif&amp;uid=1528173\" charset=\"utf-8\"><\/script>");
document.write("<!-- JiaThis Button END -->");
// ============================================================
// END JiaThis
// ============================================================
// ============================================================
// BEGIN Countdown
// ============================================================
// *****************************************************
// * Experimental javascript countdown timer (Splarka) *
// * Version 0.0.3                                     *
// *****************************************************
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
    var tpm = '';
  } else {
    var tpm = '';
  }

  // Calculate the diff - Modified by Eladkse
    left = (diff%60) + '秒';

    diff=Math.floor(diff/60);
  if(diff > 0) {
      left = (diff%60) + '分' + left;
  }
    diff=Math.floor(diff/60);
  if(diff > 0) {
      left = (diff%24) + '时' + left;
  }
    diff=Math.floor(diff/24);
  if(diff > 0) {
      left = diff + '天' + left;
  }
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
// ============================================================
// END Countdown
// ============================================================