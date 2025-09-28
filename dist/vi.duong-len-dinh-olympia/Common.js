/* Any JavaScript here will be loaded for all users on every page load. */


/* ========== Legacy script, before UCP ========== */

// UserTags
window.UserTagsJS = {
	modules: {},
	tags: {}
};
UserTagsJS.modules.inactive = 90;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
// NOTE: bannedfromchat displays in Oasis but is not a user-identity group so must be checked manually
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'threadmoderator', 'patroller', 'content-moderator', 'rollback', 'sysop', 'bannedfromchat', 'blocked', 'bot', 'bot-global', 'staff', 'vstf', 'helper'];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat', 'founder', 'bot'],
	bureaucrat: ['founder'],
	chatmoderator: ['threadmoderator', 'sysop', 'bureaucrat', 'vstf'],
	threadmoderator: ['sysop', 'bureaucrat'],
	rollback: ['content-moderator', 'sysop', 'bureaucrat', 'founder'],
	'content-moderator': ['sysop', 'bureaucrat', 'founder'],
	bot: ['bot-global']
};
 
// AjaxRC
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Làm mới trang một các tự động khi các sửa đổi mới xảy ra.';
ajaxPages = ["Special:RecentChanges", "Special:WikiActivity", "Special:Log", "Special:Images", "Special:Videos", "Special:Contributions", "Special:AbuseLog"];
 
// AjaxBatchDelete
batchDeleteDelay = 1000;
 
// FastDelete
var fdButtons = [];
 
fdButtons[fdButtons.length] = {
	'summary': 'one-click delete',
		'label': 'one-click delete'
};
 
// DynamicImages
DynamicImages = {
	gifImages: true,
	gifGalleryImages: false
};


/* ========== Display clock ========== */

// DisplayClock
// Display 12 hour time followed by day, month (Vietnamese, full name)
// and year with "(GMT)" at the end
window.DisplayClockJS = '%2d %{Tháng Một;Tháng Hai;Tháng Ba;Tháng Tư;Tháng Năm;Tháng Sáu;Tháng Bảy;Tháng Tám;Tháng Chín;Tháng Mười;Tháng Mười Một;Tháng Mười Hai}m năm %Y %2H:%2M:%2S (UTC)';


/* ========== BackToTop speed ========== */

// BackToTopButton default settings
var Speed = 600;
var Start = 800;


/* ========== Reveal IP address ========== */

// RevealAnonIP
window.RevealAnonIP = {
	permissions : ['threadmoderator', 'rollback', 'content-moderator', 'sysop', 'bureaucrat', 'staff', 'vstf', 'helper']
};


/* ========== Display username when using {{USERNAME}} ========== */

/* Replaces {{USERNAME}} with the name of the user browsing the page.
	Requires copying Template:USERNAME. */
$(function() {
	if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
	$('span.insertusername').html(mw.config.get('wgUserName'));
});


/* ========== Automatically create user page ========== */

/* AutoCreateUserPages, using form MediaWiki:Welcome-user-page
	Require dev script AutoCreateUserPages.js */
window.AutoCreateUserPagesConfig = {
	content: {
		2: '{{sub'+'st:MediaWiki:Welcome-user-page}}',
		3: '{{autowelcome}}',
},
	summary: 'Auto creating user page',
	notify: '<a href="/wiki/User:$2">Here is a link to your userpage, $1!</a>'
};

importArticles({
	type: 'script',
	articles: [
		'u:dev:MediaWiki:AutoCreateUserPages.js',
	]
});


/* ========== Display LastEdited script for registered users ========== */

/* Only loading LastEdited for registered users except anonymous
	Install PageEditInfo in MediaWiki:ImportJS */
$(function(){
	if (mw.config.get('wgUserName')) {
		importArticles({
			type: 'script',
			articles: [
				'u:dev:MediaWiki:LastEdited/code.js',
			]
		});
	}
});


/* ========== NEW Comment Indicator ========== */

/* Display "NEW" in latest comments, replies, message walls
	Set up display time for 7 days */
window.newCommentIndicator = {
	newThreshold: 604800
};

importArticles({
	type: 'script',
	articles: [
		'u:dev:MediaWiki:NewCommentIndicator.js'
	]
});


/* ========== Display notice box in Article Comment and Message Wall ========== */

/* Article Comment notice box */
$(function() {
	// Utilize CSS components
	mw.util.addCSS(
		'.comments-wrapper {position: relative; opacity: 1; transition: opacity .3s ease;}'+
		'.comments-notice {border: 1px solid var(--theme-link-color); border-left: 5px solid var(--theme-link-color); border-radius: 3px; background-color: rgba(var(--theme-border-color--rgb),.2); color: var(--theme-link-color); margin-bottom: 10px; padding: 10px;}'+
		'.comments-confirm {position: absolute; bottom: 0; right: 5px; margin-top: 5px; color: red; font-size: 12px; opacity: 1; transition: opacity 0.3s ease; cursor: pointer;}'
	);
	// Create a container div
	var wrapper = $(
		'<div class="comments-wrapper">'+
			'<div class="comments-notice">'+
				"Hey! Don't forget to post your comment to join the discussion. Please make sure to read the guidelines and post the comment in the correct article. Off-topic comments are not recommended and will be removed if needed. Remember to confirm your email address before posting."+
			'</div>'+
			'<div class="comments-confirm">Got it!</div>'+
		'</div>'
	);
	
	// Add an event listener to the "Got it" text to remove the container on click
	wrapper.on('click', '.comments-confirm', function() {
		wrapper.fadeOut(300, function() {
			wrapper.remove();
		});
	});
	
	// Find the existing div with id "articleComments"
	var articleCommentsDiv = $('#articleComments');
	
	// Check if the element with id "articleComments" exists
	if (articleCommentsDiv.length > 0) {
		// Insert the container div at top of element
		articleCommentsDiv.before(wrapper);
	} else {
		console.warn('Element with id "articleComments" not found.');
	}
});


/* Message Wall notice box */
mw.hook('messageWall.activated').add(function() {
	// Utilize CSS components
	mw.util.addCSS(
		'.messageWall-wrapper {position: relative;}'+
		'.messageWall-notice {border: 1px solid var(--theme-link-color); border-left: 5px solid var(--theme-link-color); border-radius: 3px; background-color: rgba(var(--theme-border-color--rgb),.2); color: var(--theme-link-color); text-align: center; margin-bottom: 10px; padding: 10px;}'
	);

	// Create a container div
	var wrapper = $(
		'<div class="messageWall-wrapper">'+
			'<div class="messageWall-notice">'+
				"Welcome to Message Wall. Don't forget to leave a message here if you need help. Please make sure to read the guidelines and assume good faith when talking with someone."+
			'</div>'+
		'</div>'
	);
	
	// Find the existing div with id "MessageWall"
	var messageWallDiv = $('#MessageWall');
	
	// Check if the element with id "MessageWall" exists
	if (messageWallDiv.length > 0) {
		// Insert the container div at top of element
		messageWallDiv.before(wrapper);
	} else {
		console.warn('Element with id "MessageWall" not found.');
	}
});