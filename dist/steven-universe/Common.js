//UserTags config
window.UserTagsJS = {
    tags: {
        discordmod: 'Discord Mod'
    },
    modules: {
        inactive: 60,
        userage: true,
        mwGroups: true,
        autoconfirmed: true,
        custom: {
            'Navid 1600': ['discordmod'],
            'Iudexkoo': ['discordmod'],
            'CrystalMomSquad': ['discordmod']
        }
    }
};

//DiscussionsActivity config
window.rdaSubtitleLinksPages = {
    RecentChanges: {
        links: ['DiscussionsRC'],
    },
    DiscussionsRC: {
        title: 'Recent Discussions changes',
        links: ['RecentChanges'],
    },
    WikiActivity: {
        links: ['WikiActivity/watchlist', 'RecentChanges', 'DiscussionsActivity', 'DiscussionsRC']
    },
    DiscussionsActivity: {
        links: ['WikiActivity']
    },
    'WikiActivity/watchlist': {
        links: ['WikiActivity', 'RecentChanges', 'DiscussionsActivity', 'DiscussionsRC']
    }
};

//TZclock config
window.TZclockSimpleFormat = true;

//Rollback config
window.RollbackWikiDisable = true;

//EraIcons config
window.useIncludedStylesheet = true;

//AjaxRC config
window.ajaxRefresh = 30000;
window.ajaxPages = ['Blog:Recent_posts', 'Special:DiscussionsRC', 'Special:WikiActivity'];
window.ajaxSpecialPages = ['Recentchanges', 'SocialActivity', 'Log'];

//Add border color to infoboxes
$('.portable-infobox').each(function () {
    var cls = $(this).attr('class').match(/pi-theme-_(\S+)/);
    if (cls) {
        $(this).css('border-color', '#' + cls[1]);
    }
});

//Add username alt attribute to masthead profile so highlight css works there
$(function () {
    if (!mw.config.get('profileUserName')) {
        return;
    }

    if ($('#userProfileApp .user-identity-avatar__image').length) {
    	$('#userProfileApp .user-identity-avatar__image').attr('alt', mw.config.get('profileUserName'));
    	return;
    }

    var interval = setInterval(function () {
        if (!$('#userProfileApp .user-identity-avatar__image').length) {
            return;
        }
        clearInterval(interval);
        $('#userProfileApp .user-identity-avatar__image').attr('alt', mw.config.get('profileUserName'));
    }, 100);
});