importArticles({
    type: "script",
    articles: [
         "w:dev:ShowHide/code.js", /* Show and Hide code by tables */
         "w:dev:BackToTopButton/code.js", /* Back to top button */
         "w:dev:Countdown/code.js", /* Countdown timers on the wiki */
         "w:dev:DupImageList/code.js", /* Duplicate images */
         "w:dev:AutoEditDropdown/code.js", /* Auto edit dropdown */
         "w:dev:FixMultipleUpload/code.js", /* Fixes the broken Edit Tools template on Special:MultipleUpload */
         "w:dev:WallGreetingButton/code.js", /* Adds a button to Message Wall pages that allows a user to easily edit their wall greeting */
         "w:dev:FileUsageAuto-update/code.js", /* Automatically updates file links throughout the wiki upon renaming */
         "MediaWiki:Common.js/Clock.js", /* Clock */
         "MediaWiki:Common.js/Imports.js", /* Auto-refresh, Anons */ 
    ]
});
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

//Message Wall Posts Tags
var messageWallUserTags = {
    'Love~Leigh Grandé': 'Mamuel-Lover ♥',
    'Dechel-Auslly-Flyna': 'ADMINISTRATOR',
    'No.1 KatyKat': 'ADMINISTRATOR',
    
};
window.messageWallTagColor = 'black';
 
var messageWallTagColor = window.messageWallTagColor || 'black';
 
(function($) {
    for (var name in messageWallUserTags) {
        $('a.subtle[href$="Message_Wall:' + name + '"]').after('<span style="color:' + messageWallTagColor + ';margin-left:-2px;font-size:10px;vertical-align:top;">[' + messageWallUserTags[name] + ']</span>');
    }
}(jQuery));
//

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
  var left = (diff%60) + ' seconds';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutes ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' hours ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' days ' + left
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

/* sidebar: use sidebar for specials such as new episodes */
$(document).ready(function() {
    $('#WikiaRail').append("<section id='specials' class='module'></section>");
   
    $.getJSON('/api.php?action=parse&text={{Specials}}&format=json', function(data) {
        var content = data.parse.text['*'];
        $('section#specials').append(content);
    });
});