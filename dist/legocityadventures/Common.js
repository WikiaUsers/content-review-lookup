/* Any JavaScript here will be loaded for all users on every page load. */
$(function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").text(wgUserName);
});

//UserTags config
window.UserTagsJS = {
    modules: {
        inactive: 60,
        userage: true,
        mwGroups: true,
        autoconfirmed: true
    },
    tags: {
            'bureaucrat': {link: 'Special:ListUsers/bureaucrat'},
            'chatmoderator': {link: 'Special:ListUsers/chatmoderator'},
            'content-moderator': {link: 'Special:ListUsers/content-moderator'},
            'rollback': {link: 'Special:ListUsers/rollback'},
            'sysop': {link: 'Special:ListUsers/sysop'},
            'threadmoderator': {link: 'Special:ListUsers/threadmoderator'},
            'bot': {link: 'Special:ListUsers/bot'}
    },
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
				blockTag.innerHTML = 'In Jail';
			}
		});
	}, 250);
});

// register hook before import to avoid race conditions
mw.hook('dev.wds').add(function(wds) {
    // wds is a shortcut to window.dev.wds
});
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:WDSIcons/code.js',
    ]
});

/*Spoiler Alert*/
window.SpoilerAlertJS = {
    question: 'Stop right there! This area contains some spoilers. Do you want to see them?',
    yes: 'Sure',
    no: 'Nope',
    fadeDelay: 500
};