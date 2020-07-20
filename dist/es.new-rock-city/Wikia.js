function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = Math.floor((then.getTime()-now.getTime())/1000);
 
  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }
 
  // reduce modulo period if necessary
  if(timers[i].period > 0){
    if(diff<0) diff = timers[i].period - ((-diff)%timers[i].period); else diff = diff%timers[i].period;
  }
 
  // determine plus/minus
  if(diff<0) {
    diff = -diff;
    var tpm = ' ';
  } else {
    var tpm = ' ';
  }
 
  // calcuate the diff
  var left = (diff%60) + ' segundos';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutos ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' horas ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' días ' + left
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
 
/ * Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. * /
 
// Rewrite of announcement display. (by Menidan)
$ (function () {
 // Changes the announcement to the next announcement in the list.
 function changeAnnouncement () {
  $ (announcementList [currentAnnouncement]).fadeOut ("normal", function () {
   ++currentAnnouncement;
   if (currentAnnouncement >= announcementList.length)
    currentAnnouncement = 0;
   $ (announcementList [currentAnnouncement]).fadeIn ();
  });
 }
 
 var announcementList = $ (".announcement");
 var currentAnnouncement = 0;
 var announcementVisibilityTime = 5000; // ms
 
 announcementList.hide ();
 if (announcementList.length > 1) {
  $ (announcementList [0]).fadeIn ();
  setInterval (changeAnnouncement, announcementVisibilityTime);
 } else if (announcementList.length > 0)
  announcementList.fadeIn ();
 
 
 // Piwik is undefined -> comment it out.
 /*
 try {
  var piwikTracker = Piwik.getTracker (pkBaseURL + "piwik.php", 2);
  piwikTracker.trackPageView ();
  piwikTracker.enableLinkTracking ();
 } catch (err) {}
 */
});
 
// ?
var importScript_ = importScript;


jQuery(document).ready(function($) {
	$(".contbtn").mouseleave(function(){
		$(this).find('#imove').animate({ top: '127px' }, {queue:false, duration:300});
	}).mouseenter(function(){
		$(this).find('#imove').animate({ top: '0px' }, {queue:false, duration:300});
	});
});