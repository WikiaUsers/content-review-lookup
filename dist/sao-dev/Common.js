/* Any JavaScript here will be loaded for all users on every page load. */

$(function(){$("#InputUsername, .InputUsername").html(wgUserName);});

//AjaxRC Settings
var ajaxPages = [
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions",
    "Special:WikiActivity"
];
var AjaxRCRefreshText = 'Auto-refresh';
var AjaxRCRefreshHoverText = 'Automatically refresh the page';
var ajaxRefresh = 300000;

//
// Import scripts moved to MediaWiki:ImportJS
//

// **************************************************
// Experimental javascript countdown timer (Splarka) + Edits by (1caiser)
// Version 0.0.3
// **************************************************
 
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
    var tpm = 'Servers have been active for ';
  } else {
    var tpm = 'Servers will begin service in ';
  }
 
  // calcuate the diff
  var left = (diff%60) + ' seconds';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutes ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' hours ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = (diff%365) + ' days ' + left;
    diff=Math.floor(diff/365);
  if(diff > 0) left = diff + ' years ' + left;
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

function onloadhookIRCChat() {
	var replace = document.getElementById("ChatReplace");
	if (null != replace) {
	var ConnectUser = wgUserName?encodeURI(wgUserName):"guest...";
		replace.innerHTML='<iframe src="http://webchat.freenode.net/?nick='+ConnectUser+'&channels=%23wikia-sao&uio=MTE9MTc0b3" style="width:100%;height:500px"></iframe>';
		if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
		else window.onbeforeunload = confirmexitjrchat;
 
	}
	//alert(document.getElementById("JRChatReplace").innerHTML);
 
}
if (window.addEventListener) window.addEventListener("load",onloadhookIRCChat,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookIRCChat);

//*****************************************************
// Adapted from YouTubePlayer & DraggableYouTubePlayer for video previews on episode pages.
//*****************************************************
mw.hook('wikipage.content').add(function($content) {
    $content.find('.episodepreview-video').each(function() {
        var $this = $(this),
            data = $this.data(),
            uri = new mw.Uri('https://www.youtube.com/embed/'),
            id = (data.id || '').trim(),
            loop = ('' + data.loop).trim();
 
        if (data.loaded || id === '') {
            return;
        }
 
        uri.path += id;
        uri.query = {
            loop: loop,
            playlist: (loop === '1') ? id : '',
            start: ('' + data.start).trim(),
            end: ('' + data.end).trim(),
            list: (data.list || '').trim(),
            controls: 0,
            fs: 0,
            rel: 0, 
        };
 
        $this.html(mw.html.element('iframe', {
            width: ('' + data.width).trim(),
            height: ('' + data.height).trim(),
            src: uri.toString(),
            frameborder: '0',
            allowfullscreen: 'true'
        }));
        data.loaded = true;
    });
});