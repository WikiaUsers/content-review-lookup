/* Any JavaScript here will be loaded for all users on every page load.*/


/** Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */
 
var hasClass = ( function() {
        var reCache = {};
        return function( element, className ) {
                return ( reCache[className] ? reCache[className] : ( reCache[className] = new RegExp( "(?:\\s|^)" + className + "(?:\\s|$)" ) ) ).test( element.className );
        };
})();

var countdownnum = 10;
var countdown10 = setInterval(function() {
	countdownnum--;
	$('#countdown10').html(countdownnum);
}, 1000);
setTimeout("clearInterval(countdown10)",10500);

var Start = 500;

//All definitions for codes

	//Archiving blogs
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "This blog is now archived. If you wish to start a new discussion on the same subject, please make a new blog.",
};

	//Archiving forum threads
window.LockForums = {
    expiryDays: 30,
    expiryMessage: "This thread is now archived. If you wish to start a new discussion on the same subject, please make a new thread.",
    warningDays: 20,
    warningMessage: "This thread is now <actualDays> days old. Out of courtesy to your fellow Wikians, please do not comment unless it is absolutely necessary and/or highlighted. This thread will archive automatically when the last comment is <expiryDays> days old.",
    ignoreDeletes: true,
    banners: true,
    expiryBannerMessage: "This thread is now archived. If you wish to start a new discussion on the same subject, please make a new thread.",
    warningBannerMessage: "This thread is now <actualDays> days old. Out of courtesy to your fellow Wikians, please do not comment unless it is absolutely necessary and/or the thread has been highlighted. This thread will archive automatically when the last comment is <expiryDays> days old.",
    warningPopup: true,
    warningPopupMessage: "This thread is now <actualDays> days old. Are you sure you want to post?",
};

	//Inactive users
InactiveUsers = { 
	months: 2 //How many months without editing before user is marked as inactive
};

	//Fast delete buttons
window.fdButtons = [];
window.fdButtons.push(
	{
		'summary': 'Spam',
		'label': 'Spam'
	},
	{
		'summary': 'Vandalism',
		'label': 'Vandalism'
	},
	{
		'summary': 'Fan art',
		'label': 'Fan art'
	},
	{
		'summary': 'Housekeeping',
		'label': 'Housekeeping'
	}
);

	//Auto-refresh option
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];

	//Purge button
var PurgeButtonText = 'Purge'; //Text to display

//All code imports are placed here
importArticles({
    type: 'script',
    articles: [
        'u:dev:LockForums/code.js', //Archives forum threads
		'u:dev:DisplayClock/code.js', //Shows a clock
		'u:dev:BackToTopButton/code.js', //Adds "Back-to-top button"
		'u:dev:InactiveUsers/code.js', //Marks inactive users
		'u:dev:EditIntroButton/code.js', //Adds "edit intro" button; allows users to edit the lead section
		'u:dev:SkinSwitchButton/code.js', //Adds "Switch to Monobook" button
		'u:dev:Standard_Edit_Summary/code.js', //Adds standard edit summaries
		'u:dev:FastDelete/code.js', //Adds fast delete buttons
		'u:dev:PurgeButton/code.js', //Adds "Purge" button to every page
		'u:dev:AjaxRC/code.js', //Adds "Auto-refresh" option to RecentChanges and WikiActivity
		'u:dev:LockOldBlogs/code.js', //Archives blogs
		'u:dev:WallGreetingButton/code.js', //Adds "Edit Message Wall greeting" button
		'u:dev:DupImageList/code.js', //Adds duplicate image page
		'u:dev:Message/code.js', //Adds mass message function
		'dev:WikiActivity.js' , //Adds WikiActivity
		'MediaWiki:Common.js/CEB.js' //Adds custom edit buttons
    ]
});