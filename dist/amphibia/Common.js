/* Any JavaScript here will be loaded for all users on every page load. */

//Auto Message Blocked
var MessageBlock = {
    title : 'Blocked.',
    message : 'You have been blocked for $2 for the following reason(s): "$1"',
    autocheck : true
};
 
/* LockOldBlogs */
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "This blog hasn\'t been commented on for over 30 days. There is no need to comment."
};

/* Users blocked infinite */
window.addEventListener('load', function() {
	// Timeouts are always a terrible way to go, but UserTags has no event dispatched when it finished loading.
	setTimeout(function() {
		if (document.getElementById('UserProfileMasthead') === null) return;
		var blockTag = document.querySelector('.tag.usergroup-blocked.blocked-user');
		if (blockTag === null) return;
		new mw.Api().get({
			action: 'query',
			list: 'blocks',
			bkprop: 'expiry',
			bktimestamp: new Date().getTime(),
			bkusers: wgTitle
		}).done(function(d) {
			if (d.query.blocks[0] && d.query.blocks[0].expiry == 'infinity') {
				blockTag.innerHTML = 'Shattered';
			}
		});
	}, 250);
});
 
if (mw.config.get('skin') != 'oasis' ) { // if skin == monobook or skin == uncyclopedia
	importScriptPage('UserWikiInfo/code.js', 'dev');
}