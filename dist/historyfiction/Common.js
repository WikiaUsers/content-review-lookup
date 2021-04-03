importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js'
    ]
});

// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3 -- From THE SIMS WIKI
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
        var tpm = 'T plus ';
    } else {
        var tpm = '';
    }
 
    // calcuate the diff
    var left = (diff % 60) + ' seconds';
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 60) + ' minutes ' + left;
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 24) + ' hours ' + left;
    diff = Math.floor(diff / 24);
    if (diff > 0) left = diff + ' days ' + left
    var diffing = count = Math.floor((then.getTime() - now.getTime()) / 1000);
    if (diffing < 0) {
        timers[i].firstChild.nodeValue = 'Timer has expired';
    } else {
        timers[i].firstChild.nodeValue = tpm + left;
    }
 
 
    // a setInterval() is more efficient, but calling setTimeout()
    // makes errors break the script rather than infinitely recurse
    timeouts[i] = setTimeout('updatetimer(' + i + ')', 1000);
}
 
function checktimers() {
    //hide 'nocountdown' and show 'countdown'
    var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
    for (var i in nocountdowns) nocountdowns[i].style.display = 'none'
    var countdowns = getElementsByClassName(document, 'span', 'countdown');
    for (var i in countdowns) countdowns[i].style.display = 'inline'
 
    //set up global objects timers and timeouts.
    timers = getElementsByClassName(document, 'span', 'countdowndate'); //global
    timeouts = new Array(); // generic holder for the timeouts, global
    if (timers.length == 0) return;
    for (var i in timers) {
        timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
        updatetimer(i); //start it up
    }
}
addOnloadHook(checktimers);
 
// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

window.UserTagsJS = {
	modules: {},
	tags: {
organizer: { u: 'Organizer', order: 100 },
scientist: { u: 'Researcher', order: 101 },
coder: { u: 'WikiCoder', order: 102 },
bureaucrat: { u: 'IVC Agent', order: 1 },
	}
};
UserTagsJS.modules.custom = {
	'Pschycron': ['organizer', 'coder']
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:SexyUserPage/code.js'
    ]
});
 
importScriptPage('ChatTags/code.js', 'dev');
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});
 
importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:SearchSuggest/code.js'
    ]
});
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:FloatingToc/code.js'
    ]
});

/* Collapsible infoboxes */
importScriptPage('CollapsibleInfobox/code.js', 'dev');

$(function() {
    var newTitle = $("#title-meta").html();
    if (!newTitle) return;
    var edits = $("#user_masthead_since").text();
    $(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
    $("#user_masthead_head h2").html(newTitle + "<small id='user_masthead_since'>" + edits + "</small>");
});
 
hookEvent( 'load', displayTimer );
 
function displayTimer ()
{
    if ( typeof( timerDisplay ) !== 'undefined' && timerDisplay === false )
        return;
 
    var date;
 
    if (skin == 'oasis')
    {
    var timerParent = document.getElementById( 'WikiHeader' ).getElementsByTagName( 'div' )[0];
    }
 
    if (skin == 'monobook')
    {
    var timerParent = document.getElementById( 'p-personal' ).getElementsByTagName( 'ul' )[0];
    }
 
    var timerLink   = document.createElement( 'a' );
    var timerObj    = document.createElement( 'li' );
    timerLink.href               = '/wiki/' + wgPageName + '?action=purge';
    timerLink.title              = 'Purge the server cache and update the contents of this page.'
    timerObj.id                  = 'displayTimer';
    timerObj.style.textTransform = 'none';
    timerObj.style.fontWeight    = 'bold';
    timerObj.style.fontSize      = '100%';
    timerObj.appendChild( timerLink );
    timerParent.insertBefore( timerObj, timerParent.firstChild );
 
    if (skin == 'oasis')
    {
        $('#displayTimer').css({'position': "inherit", 'right': "0px", 'top': "-28px"});
    }
 
    var month = new Array(12);
        month[0]  = "Jan";
        month[1]  = "Feb";
        month[2]  = "Mar";
        month[3]  = "Apr";
        month[4]  = "May";
        month[5]  = "Jun";
        month[6]  = "Jul";
        month[7]  = "Aug";
        month[8]  = "Sep";
        month[9]  = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";
 
    function actualizeUTC ()
    {
        timerDate           = new Date();
        timerLink.innerHTML = ( timerDate.getUTCDate()     < 10 ? '0' : '' ) + timerDate.getUTCDate()     + ' '
                            + ( timerDate.getUTCMonth()    < 10 ? '' : ''  ) + month[timerDate.getUTCMonth()] + ' '
                            + ( timerDate.getUTCFullYear() < 10 ? '0' : '' ) + timerDate.getUTCFullYear() + ' '
                            + ( timerDate.getUTCHours()    < 10 ? '0' : '' ) + timerDate.getUTCHours()    + ':'
                            + ( timerDate.getUTCMinutes()  < 10 ? '0' : '' ) + timerDate.getUTCMinutes()  + ':'
                            + ( timerDate.getUTCSeconds()  < 10 ? '0' : '' ) + timerDate.getUTCSeconds()  + ' (UTC)';
    }
 
    function actualizeCustom ()
    {
        timerDate           = new Date();
        timerDate.setMinutes  ( timerDate.getMinutes() + timerDate.getTimezoneOffset() + timerTimezone * 60 );
        timerLink.innerHTML = ( timerDate.getDate()     < 10 ? '0' : '' ) + timerDate.getDate()     + ' '
                            + ( timerDate.getMonth()    < 10 ? '' : ''  ) + month[timerDate.getMonth()] + ' '
                            + ( timerDate.getFullYear() < 10 ? '0' : '' ) + timerDate.getFullYear() + ' '
                            + ( timerDate.getHours()    < 10 ? '0' : '' ) + timerDate.getHours()    + ':'
                            + ( timerDate.getMinutes()  < 10 ? '0' : '' ) + timerDate.getMinutes()  + ':'
                            + ( timerDate.getSeconds()  < 10 ? '0' : '' ) + timerDate.getSeconds()
                            + ' (UTC' + ( timerTimezone  < 0 ? '' : '+' ) + timerTimezone + ')';
    }
 
    // start
    if ( typeof( timerTimezone ) !== 'number' )
    {
        actualizeUTC();
        setInterval( actualizeUTC, 1000 );
    }
    else
    {
        actualizeCustom();
        setInterval( actualizeCustom, 1000 );

/* Clock above the "Contribute" button, thanks to Wikia Developers Wiki */
// Display 12 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = '%2I:%2M:%2S %p %2d %{January;Febuary;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)';
importArticles({
	type: 'script',
	articles: [
		// ...
		'u:dev:DisplayClock/code.js',
		// ...
	]
});