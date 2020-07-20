/* Any JavaScript here will be loaded for all users on every page load. */

/* 
EditIntroButtonText = 'Intro';
importScriptPage( 'EditIntroButton2/code.js', 'dev' );
Adds a button next to the title which acts as a "section edit" button for the intro, useful for long pages. 
*/


EditIntroButtonText = 'Intro';
importScriptPage('EditIntroButton/code.js', 'dev');
/* Adds a button next to the regular edit button which acts as a "section edit" button for the intro, useful for long pages.
*/

/* 
importScriptPage( 'PurgeButton/code.js', 'dev' ); 
var PurgeButtonText = 'Refresh';
add button that allows you to purge cache and refresh page */

/*
importArticle({type:'script', article:'w:c:dev:DisplayClock/code.js'}); 
*/

// Display 12 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = '%I:%2M %p %{SUN;MON;TUES;WED;THU;FRI;SAT}w, %{JAN;FEB;MAR;APR;MAY;JUNE;JULY;AUG;SEPT;OCT;NOV;DEC}m %2d %Y (UTC)';
importArticle({type:'script', article:'w:c:dev:DisplayClock/code.js'});
/* Adds a clock displaying the current time in the UTC time-zone to the header on both Oasis and Monobook. */

importScriptPage('BackToTopButton/code.js', 'dev');
/* adds a back to top button on footer */

// creates a countdown clock where specified. 

importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

/*
How to create a countdown:
<span class="countdown" style="display:none;">
Only <span class="countdowndate">January 01 2013 00:00:00</span> until the new year...
</span>
<span class="nocountdown">Javascript disabled.</span>

How to create Eastern Time Zone Countdown:
1) <span class="countdowndate">January 01 2013 00:00:00 EST</span>
But doesn't adjust for Daylight Savings Time
2) <span class="countdowndate">January 01 2013 00:00:00 -0500</span>
Need to offset hours based on UTC
*/

/* Any JavaScript here will be loaded for all users on every page load. */

function WallTools() {
	if (wgCanonicalNamespace == 'Thread') {
		$('#WallBrickHeader').append('<a href="/wiki/'+ wgPageName +'?action=history" class="wikia-button" style="margin-left:10px; margin-right:10px; float: right;" id="History">View History</a>');
	}
	if (wgCanonicalNamespace == 'Message_Wall' && wgAction != 'history') {
		$('.WikiaMainContent').prepend('<div class="UserProfileActionButton"><a href="/wiki/'+ wgPageName +'?action=history" class="wikia-button" style="margin-left:10px; margin-right:10px;" id="History">View History</a></div>');
		if (wgTitle == wgUserName) {
			$('.UserProfileActionButton').prepend('<a accesskey="e" href="/wiki/Message_Wall_Greeting:'+ wgUserName +'?action=edit" class="wikia-button" data-id="edit" id="talkArchiveEditButton" style="padding-left: 5px; padding-right: 8px;"><img alt="" class="sprite edit-pencil" height="16" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" width="22"> Edit Greeting	</a>');
		}
	}
}
addOnloadHook(WallTools);

/* enables View History button next to Message Wall greeting*/