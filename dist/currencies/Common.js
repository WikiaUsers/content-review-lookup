// Imports
     importScriptPage('User:Jgjake2/js/DISPLAYTITLE.js', 'deadisland');
     importScript('MediaWiki:Common.js/archive.js');
     importScript('MediaWiki:Common.js/nav.js');
     importScriptPage('DisplayClock/code.js','dev');

// Experimental javascript countdown timer (Splarka)
// Version 0.0.2
// **************************************************
// Embed with a span class="countdowntimer", eg:
// <span class="countdowntimer" style="display:none;">April 12 2008 00:00:01 AM EST</span>
// default replacement text can accompany, eg: <span class="notimer">*javascript required*</span>
 
function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = count=Math.floor((then.getTime()-now.getTime())/1000);
 
  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }
 
  // catch negative dates
  if(diff<0) {
    diff = -diff;
    var left = 'ago since';
  } else {
    var left = 'until';
  }
 
  // calcuate the diff
  left = (diff%60) + ' seconds ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutes ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' hours ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' days ' + left
  timers[i].firstChild.nodeValue = left;
 
  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  tim[i] = setTimeout('updatetimer(' + i + ')',1000);
}
 
function checktimers() {
  var untimers = getElementsByClassName(document, 'span', 'notimer');
  for(var i=0;i < untimers.length; i++) {
    untimers[i].style.display = 'none';    
  }
  timers = getElementsByClassName(document, 'span', 'countdowntimer');  //global
  tim = new Array(); // generic holder for the timeouts, global
  if(timers.length == 0) return;
  for(var i=0;i < timers.length; i++) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    timers[i].firstChild.nodeValue = '0 days 0 hours 0 minutes 0 seconds';
    timers[i].style.display = 'inline';
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers)
 
// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************

//CustomEditButtons
// **************************************************

if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20081020114114/central/images/f/fd/Button_underline.png",
     "speedTip": "Underline",
     "tagOpen": "<u>",
     "tagClose": "</u>",
     "sampleText": "Insert text"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20081020115909/central/images/f/f8/Button_Tool_commons.png",
     "speedTip": "Wikimedia Commons",
     "tagOpen": "[[commons:<link>|",
     "tagClose": "<name>]]",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20081020115943/central/images/c/cb/Button_wikipedia.png",
     "speedTip": "Wikipedia",
     "tagOpen": "[[wikipedia:<link>|",
     "tagClose": "<name>]]",
     "sampleText": ""};

  }

// Load upload form JS
importScript('MediaWiki:Common.js/upload.js')

/* USERNAME function (thanks to Monchoman45 on Community Central */

addOnloadHook(function() {$('.user-name').html(wgUserName);});

// Twitter follow button $('#twtr-widget-1 h4').after('<a class="twitter-follow-button" href="https://twitter.com/Currency_Wiki" data-show-count="false" data-show-screen-name="false">Follow @Currency_Wiki</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>');

/* Summary filler */
 
importScriptPage('MediaWiki:Common.js/standardeditsummaries.js', 'runescape');

// Removing comments from [[Currency Wiki:Article requests]] upon publishing (experimental)
function removeFunction() {
    function remover() {
        if(window.location.href.indexOf("Currency_Wiki:Article_requests?action=edit") > 1) {
            var n = document.getElementById('textarea').innerHTML;
            n.replace("<!-- do not remove the following -->", " ");
            document.getElementById("textarea").innerHTML = n;
        }
    }
    addOnloadHook(remover);
    document.getElementById("#wpSave").onClick = remover();
}
addOnloadHook(removeFunction);

$(function() {
if (wgTitle == "United_States_100,000_dollar_banknote") {
$('.forum-content').before('<span style="color:red; font-weight:bold;">Note that all 100,000 dollar notes of the United States have been accounted for, and if you have an example, it is likely fake. Owning a genuine note means it is stolen, and if you are convinced you have one, you need to turn it over to the proper authorities.</span>');
}
});