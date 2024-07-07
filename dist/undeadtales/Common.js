/* Any JavaScript here will be loaded for all users on every page load. */


importArticles({
    type: "script",
    articles: [
        "w:c:dev:LockOldBlogs/code.js"
    ]
});

//~
$(function() {
	var nick = (wgUserName == null) ? ('Wikian' + Math.floor(Math.random() * 10)) : wgUserName.replace(/ /g, '_'); 
	$('#IRClogin').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=wikia-DFW&prompt=true&uio=OT10cnVlJjExPTUxJjEyPXRydWU37" width="650" height="200" style="border:0;"></iframe>');
});

/* Thanks to Cakemix from the Call of Duty Wiki */

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

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */

// Change chat description
// Written by Foodbandlt
importScript('MediaWiki:Chat-headline');
 
function changeChatDesc() {
try {
if ($('section.ChatModule').size() > 0 && $('p.chat-name').html() != chatDesc){
$('p.chat-name').html(''+chatDesc+'');
setTimeout("changeChatDesc()", 200);
}
 
}catch (err){
setTimeout("changeChatDesc()", 200);
}
};
 
$(document).ready(function (){changeChatDesc()});

if ( mwCustomEditButtons ) {
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/deadliestfiction/images/c/c9/Closed.png",
		"speedTip": "Voting closed",
		"tagOpen": "{{Closed}}",
		"tagClose": "",
		"sampleText": ""
	};
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/deadliestfiction/images/a/a9/Written.png",
		"speedTip": "Battle is written",
		"tagOpen": "{{Written}}",
		"tagClose": "",
		"sampleText": ""
	};
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/deadliestfiction/images/c/cf/Buttonsupport.png",
		"speedTip": "Support",
		"tagOpen": "{{Support}}",
		"tagClose": "",
		"sampleText": ""
	};
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/deadliestfiction/images/f/f1/Buttonnuetral.png",
		"speedTip": "Neutral",
		"tagOpen": "{{Neutral}}",
		"tagClose": "",
		"sampleText": ""
	};
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/deadliestfiction/images/a/a6/Buttonoppose.png.png",
		"speedTip": "Oppose",
		"tagOpen": "{{Oppose}}",
		"tagClose": "",
		"sampleText": ""
	};
}

// ============================================================
// displayTimer
// ============================================================
 
var refreshDate;
 
function addDate() {
    var UTCDate = ((new Date()).toUTCString()).replace("GMT", "(UTC)");
    $('#showdate').empty().append('<span style="font-weight: bold; text-transform: none;"><a title="Purge the server cache and update the contents of this page." href="' + wgArticlePath.replace('$1', wgPageName.replace(/ /g, '_')) + '?action=purge">' + UTCDate.substring(5) + '</a></span>');
    window.clearTimeout(refreshDate);
    refreshDate = window.setTimeout(addDate, 5000);
}

importScriptPage('AjaxRC/code.js', 'dev');

importScriptPage('MediaWiki:Common.js/displayTimer.js', 'runescape')

// *** Custom user rights icons on userpages **
importScript('MediaWiki:Wikia.js/userRightsIcons.js');