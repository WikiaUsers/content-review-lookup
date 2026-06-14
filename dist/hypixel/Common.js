/**** Any JavaScript here will be loaded for all users on every page load. ****/

/* Auto-Refresh */
window.ajaxPages = [
    'Special:RecentChanges',
    'Special:Watchlist',
    'Special:WikiActivity',
    'Special:Log',
    'Special:Contributions'
];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

/* User Tags */
window.UserTagsJS = {
	modules: {},
	tags: {
        blocked:            { u:'Banned', order: 0 },
        bureaucrat:         { u:'Bureaucrat', link:'Hypixel Wiki:Staff', order: 1 },
        sysop:              { u:'Administrator', link:'Hypixel Wiki:Staff', order: 2 },
        'content-moderator':{ u:'Content Moderator', link:'Hypixel Wiki:Staff', order: 3 },
        threadmoderator:    { u:'Forum Moderator', link:'Hypixel Wiki:Staff', order: 4  },
        chatmoderator:      { u:'Chat Moderator', link:'Hypixel Wiki:Staff', order: 5 },
        rollback:           { u:'Rollback', link:'Hypixel Wiki:Staff', order: 6 },
        verified:           { u:'Verified', order: 7 },
        artist:             { u:'Artist', order: 8  },
        moderator:          { u:'Moderator', link:'Hypixel Wiki:Staff'  },
        'hypixel-admin':    { u:'HP ADMIN', link:'Administrator'  },
        'hypixel-mod':      { u:'HP MOD', link:'Moderator' },
        'hypixel-helper':   { u:'HP HELPER', link:'Helper' }
    }
};

UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = [
    'bannedfromchat',
    'bot',
    'bot-global',
    'bureaucrat', 
    'chatmoderator',
    'rollback',
    'sysop',
    'threadmoderator',
    'moderator',
    'content-moderator',
    'hypixel-admin',
    'hypixel-mod',
    'hypixel-helper'
];
UserTagsJS.modules.custom = {
    'Snuggle': ['hypixel-mod']
};
UserTagsJS.modules.metafilter = {
    'sysop': ['bureaucrat'],
    'moderator': ['sysop', 'bureaucrat'],
    'rollback': ['moderator']
};
UserTagsJS.modules.implode = {
    'moderator': ['content-moderator', 'threadmoderator', 'chatmoderator']
};

UserTagsJS.modules.inactive = 90; //Sets an inactive tag after 90 days

/* RevealAnonIP */
window.RevealAnonIP = {
    permissions: ['bureaucrat', 'sysop', 'moderator']
};

// Float any links in the game box widget
$(".game-box").each(function() {
    var $this = $(this),
        anchor = $this.find(".game-name a");
    if (!anchor || $this.parents(".game-box-link").length > 0)
        return;
    $this.wrap($("<a>", {
        class: "game-box-link",
        href: anchor.attr("href"),
        title: anchor.attr("title")
    }));
    $this.find("a").attr("tabindex", "-1");
});

// Condense game/feature button links into one clickable button
document.querySelectorAll('.gamebutton, .featurebutton').forEach(function(btn) {
    var imgLink = btn.querySelector('div:first-child a');
    var textLink = btn.querySelector('div:last-child a');
    if (!imgLink || !textLink) return;

    imgLink.setAttribute('tabindex', '-1'); // Remove image link

    var href = textLink.getAttribute('href');
    btn.style.cursor = 'pointer';
    btn.addEventListener('click', function(e) {
        if (e.target.closest('a')) return;
        if (e.ctrlKey || e.metaKey || e.shiftKey) {
            window.open(href, '_blank');
        } else {
            window.location.href = href;
        }
    });
});

// Importing from dev.fandom.com
// See the pages for the code.
 importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxRC/code.js',
        'u:dev:RevealAnonIP/code.js',
        'u:dev:UserTags/code.js',
    ]
});