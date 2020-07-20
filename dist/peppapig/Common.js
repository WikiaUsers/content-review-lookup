/* Any JavaScript here will be loaded for all users on every page load. */

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
    var diff = count = Math.floor((then.getTime() - now.getTime()) / 1000);

    // catch bad date strings
    if (isNaN(diff)) {
        timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **';
        return;
    }

    // determine plus/minus
    if (diff < 0) {
        diff = -diff;
        var tpm = ' ';
    } else {
        var tpm = ' ';
    }


    // calcuate the diff
    var left = (diff % 60) + ' seconds';
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 60) + ' minutes ' + left;
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 24) + ' hours ' + left;
    diff = Math.floor(diff / 24);
    if (diff > 0) left = diff + ' days ' + left;
    timers[i].firstChild.nodeValue = tpm + left;

    // a setInterval() is more efficient, but calling setTimeout()
    // makes errors break the script rather than infinitely recurse
    timeouts[i] = setTimeout('updatetimer(' + i + ')', 1000);
}

function checktimers() {
    //hide 'nocountdown' and show 'countdown'
    var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
    for (var i in nocountdowns) nocountdowns[i].style.display = 'none';
    var countdowns = getElementsByClassName(document, 'span', 'countdown');
    for (var i in countdowns) countdowns[i].style.display = 'inline';

    //set up global objects timers and timeouts.
    timers = getElementsByClassName(document, 'span', 'countdowndate'); //global
    timeouts = new Array(); // generic holder for the timeouts, global
    if (timers.length === 0) return;
    for (var i in timers) {
        timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
        updatetimer(i); //start it up
    }
}
addOnloadHook(checktimers);

// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************

//************************************************
// Adds Button to Edit Message Wall Greeting
//************************************************
function EditGreeting() {
    if (wgCanonicalNamespace == 'Message_Wall' && wgAction != 'history') {
        if (wgTitle == wgUserName) {
            $('.WikiaMainContent').prepend('<div class="UserProfileActionButton"><a accesskey="e" href="/wiki/Message_Wall_Greeting:' + wgUserName + '?action=edit" class="wikia-button" data-id="edit" id="talkArchiveEditButton" style="padding-left: 5px; padding-right: 8px;"><img alt="" class="sprite edit-pencil" height="16" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" width="22"> Edit greeting	</a></div>');
        }
    }
}

var rollbacks = ["Chad012"]; // Make sure you capitalize each name if (wgPageName == 'Special:Chat') {

for (var i = 0; i < rollbacks.length; i++) {
    if (document.getElementById("user-" + rollbacks[i]) !== null) { // Prevent errors if user isn't on chat
        document.getElementById("user-" + rollbacks[i]).className += " chat-mod";
    }
}

window.EmoticonsWindowConfig = {
    chatOptionsIntegration: true
};

window.railWAM = {
    logPage:"Project:WAM Log"
};

window.ArticleRating = {
    title: 'How Is This Article?',
    values: ['Terrible', 'Bad', 'Average', 'Good', 'Wonderful'],
    starSize: [24, 24],
    starColor: ['#ccc', '#ffba01'],
    starStroke: '#000',
    exclude: ['Page A', 'Page B'],
    location: 'top-rail'
};

var MessageBlock = {
  title : 'Blocked',
  message : 'You have been blocked for $2 because you have $1. If you wish to get unblocked, please read [[Rules and guidelines|our rules]] before continue editing on our wiki.',
  autocheck : true
};