// Any JavaScript here will be loaded for all users on every page load.
// If you do not know what you are doing, do not edit this page.
// <source lang="JavaScript">

/* Ask the Oracle */
AskTheOracle = function(){
  if (document.getElementById('asktheoracle'))
  {
    var div_asktheoracle = document.getElementById('asktheoracle');
    div_asktheoracle.innerHTML = "<object width='600' height='470'><param name='movie' value='https://images.wikia.nocookie.net/olympians/images/4/47/Asktheoracle.swf'><embed src='https://images.wikia.nocookie.net/olympians/images/4/47/Asktheoracle.swf' width='600' height='470'></embed></object>";
  }
}
jQuery(document).ready(AskTheOracle);

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
     var tpm = '';''
   } else {
     var tpm = '';''
   }
  
   // Calculate the diff - Modified by Eladkse
  if ((diff%60) == 1) {
    left = (diff%60) + ' секунды';
  } else {
    left = (diff%60) + ' секунда';
  }
    diff=Math.floor(diff/60);
  if(diff > 0) {
    if ((diff%60) == 1) {
      left = (diff%60) + ' минута, и ' + left;
    } else {
      left = (diff%60) + ' минут, и ' + left;
    }
  }
    diff=Math.floor(diff/60);
  if(diff > 0) {
    if ((diff%24) == 1) {
      left = (diff%24) + ' час, ' + left;
    } else {
      left = (diff%24) + ' часов, ' + left;
    }
  }
    diff=Math.floor(diff/24);
  if(diff > 0) {
    if (diff == 1) {
      left = diff + ' день, ' + left;
    } else {
      left = diff + ' дней, ' + left;
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
  
 // **************************************************
 //  - end -  Experimental javascript countdown timer
 // **************************************************
 
/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using( ['jquery.ui.tabs'], function() {
$(document).ready(function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
    return false;
  });
});
});

//</source>

importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:Medals/code.js"
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:DiscordIntegrator/code.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:SnowStorm.js',
    ]
});