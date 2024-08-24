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
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'chatmoderator', 
    'threadmoderator',
    'patroller',
    'content-moderator',
    'rollback',
    'sysop',
    'bannedfromchat',
    'blocked',
    'bot',
    'bot-global',
    'staff',
    'vstf',
    'helper'
];

UserTagsJS.modules.metafilter = {
	sysop: ['bot'],
	chatmoderator: ['threadmoderator', 'sysop', 'bureaucrat', 'vstf', 'bot'],
	threadmoderator: ['sysop', 'bureaucrat', 'bot'],
	rollback: ['content-moderator', 'sysop', 'bureaucrat', 'founder', 'bot'],
	'content-moderator': ['sysop', 'bureaucrat', 'founder', 'bot'],
	bot: ['bot-global']
};
 
// AjaxRC
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refreshes the page when new edits occur.';
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:Log",
    "Special:Images",
    "Special:Videos",
    "Special:Contributions",
    "Special:AbuseLog"
];
 
// AjaxBatchDelete
window.batchDeleteDelay = 1000;
 
// DynamicImages
window.DynamicImages = {
    gifImages: true,
    gifGalleryImages: false
};


/* ========== BackToTop speed ========== */

// BackToTopButton default settings
var Speed = 600;
var Start = 800;


/* ========== Reveal IP address ========== */

// RevealAnonIP
window.RevealAnonIP = {
    permissions : ['threadmoderator', 'rollback', 'content-moderator', 'sysop', 'bureaucrat', 'staff', 'vstf', 'helper']
};


/* ========== Countdown timer ========== */

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
    }
        var tpm = ' ';
 
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
 
$(function checktimers() {
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
});


/* ========== Display username when using {{USERNAME}} ========== */

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});


/* ========== Automatically create user page ========== */

/* AutoCreateUserPages */
window.AutoCreateUserPagesConfig = {
    content: {
        2: '{{sub'+'st:MediaWiki:Welcome-user-page}}',
        3: '{{autowelcome}}',
    1202: false
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
				"Bee-tiful! Don't forget to post your comment to join the flowery discussion. Please make sure to read the guidelines, and remember to confirm your email address before posting."+
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
				"Welcome to the Lovely Message Wall. Don't forget to leave a message here if you need help. Please make sure to read the guidelines and assume good faith when talking with someone."+
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