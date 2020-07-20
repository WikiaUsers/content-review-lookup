/* ------------------------------ COUNTDOWN ------------------------------ */
 
function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = count=Math.floor((then.getTime()-now.getTime())/1000);
 
  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    $('.countdown').css({"display": 'none !important'});
    $('.nocountdown').css({"display": 'inline !important'});
    return;
  }
 
  // determine airing - will/is/has
  if(diff<=0 && diff>=-3000) {
    timers[i].firstChild.nodeValue = 'is on air';
    return;
  }
 
  if(diff<-3000) {
    timers[i].firstChild.nodeValue = 'has aired';
    return;
  }
 
  if(diff>0) {
    var tpm = 'will air in ';
  }
 
  // Calculate the diff
    diff=Math.floor(diff/60);
  if(diff > 0) {
    if ((diff%60) == 1) {
      left = (diff%60) + ' minute';
    } else {
      left = (diff%60) + ' minutes';
    }
  }
    diff=Math.floor(diff/60);
  if(diff > 0) {
    if ((diff%24) == 1) {
      left = (diff%24) + ' hour, and ' + left;
    } else {
      left = (diff%24) + ' hours, and ' + left;
    }
  }
    diff=Math.floor(diff/24);
  if(diff > 0) {
    if (diff == 1) {
      left = diff + ' day, ' + left;
    } else {
      left = diff + ' days, ' + left;
    }
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