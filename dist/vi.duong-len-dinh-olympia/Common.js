/* Any JavaScript here will be loaded for all users on every page load. */

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
 
// DisplayClock
// Display 12 hour time followed by day, month (Vietnamese, full name)
// and year with "(GMT)" at the end
window.DisplayClockJS = '%2d %{Tháng Một;Tháng Hai;Tháng Ba;Tháng Tư;Tháng Năm;Tháng Sáu;Tháng Bảy;Tháng Tám;Tháng Chín;Tháng Mười;Tháng Mười Một;Tháng Mười Hai}m năm %Y %2H:%2M:%2S (UTC)';
 
// BackToTopButton default settings
var Speed = 600;
var Start = 800;
 
// RevealAnonIP
window.RevealAnonIP = {
    permissions : ['threadmoderator', 'rollback', 'content-moderator', 'sysop', 'bureaucrat', 'staff', 'vstf', 'helper']
};
 
 
function updatetimer(i) {
    var now = new Date();
    var then = timers[i].eventdate;
    var diff = Math.floor((then.getTime() - now.getTime()) / 1000);
    var count = diff;
 
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
    // hide 'nocountdown' and show 'countdown'
    var nocountdowns = document.getElementsByClassName('nocountdown');
    for (var i in nocountdowns) nocountdowns[i].style.display = 'none';
    var countdowns = document.getElementsByClassName('countdown');
    for (var j in countdowns) countdowns[j].style.display = 'inline';
 
    // set up global objects timers and timeouts
    timers = document.getElementsByClassName('countdowndate'); //global
    timeouts = new Array(); // generic holder for the timeouts, global
    if (timers.length === 0) return;
    for (var k in timers) {
        timers[k].eventdate = new Date(timers[k].firstChild.nodeValue);
        updatetimer(k); //start it up
    }
});
 
 
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
 
/* End of the {{USERNAME}} replacement */

/* AutoCreateUserPages, using form MediaWiki:Welcome-user-page
	Require dev script AutoCreateUserPages.js */
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