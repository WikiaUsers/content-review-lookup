/* Any JavaScript here will be loaded for all users on every page load. */
/* BackToTopButton */
window.BackToTopModern = true;

/* LockOldBlogs */
window.LockOldBlogs = {
    expiryMessage: 'This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days, please don\'t bump this blog!',
    nonexpiryCategory: 'Never archived blogs'
};

// Upload form - need to run before adding hide buttons
	if ( mw.config.get('wgCanonicalSpecialPageName') === 'Upload' ) {
		setupUploadForm();
	}

	addHideButtons();

	if( document.getElementById('mp3-navlink') !== null ) {
		document.getElementById('mp3-navlink').onclick = onArticleNavClick;
		document.getElementById('mp3-navlink').getElementsByTagName('a')[0].href = 'javascript:void(0)';
	}

	if( window.storagePresent ) {
		initVisibility();
	}


/* UserTags */
window.UserTagsJS = {
    tags: {
        'bureaucrat': {
            u: 'Oracle',
            link: 'Project:Bureaucrats'
        },
        'sysop': {
            u: 'Demon',
            link: 'Project:Sysops'
        },
        'content-moderator': {
            u: 'Angel',
            link: 'Project:Content moderator'
        },
        'poweruser': {
            u: 'Human',
            link: 'Project:Autoconfirmed users'
        },
        'autoconfirmed-user': {
            u: 'Human',
            link: 'Project:Autoconfirmed users'
        },
        'user': {
            u: 'Human',
            link: 'Project:Autoconfirmed users'
        },
        'newuser': {
            u: 'Human'
        },
        inactive: {
            u: 'Deceased',
            title: 'The user hasn\'t edited for last 30 days'
        },
        blocked: {
            u: 'Deceased',
        },
    },
    modules: {
        stopblocked: false,
        inactive: 30,
        mwGroups: [
            'bureaucrat',
            'sysop',
            'content-moderator',
            'rollback',
            'user',
            'autoconfirmed-user',
            'bot',
            'bot-global',
            'blocked',
            'nonuser'
        ],
        autoconfirmed: true,
        newuser: true,
        metafilter: {
            'content-moderator': ['bureaucrat'],
            rollback: [
                'bureaucrat',
                'content-moderator'
            ],
            threadmoderator: ['content-moderator'],
            user: [
                'bureaucrat',
                'sysop',
                'content-moderator',
                'rollback',
                'translator',
                'newuser',
                'inactive',
                'blocked'
            ],
            bot: ['bot-global'],
            newuser: ['inactive'],
            bureaucrat: ['inactive'],
            sysop: ['inactive'],
            founder: ['inactive'],
            blocked: ['inactive'],
            poweruser: ['newuser']
        },
    },
};

importArticles({
	type:'script',
	articles: [
        'MediaWiki:Common.js/redditWidget.js',      // Adds reddit widget to id="reddit-widget"
	]
});

importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:User_Avatar_Finder/code.js"
    ]
});