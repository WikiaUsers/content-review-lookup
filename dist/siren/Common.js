/* Username Detector */
$(function() {
    $('.username').text(mw.config.get('wgUserName'));
});

/*User Tags*/
window.UserTagsJS = {
	modules: {
        autoconfirmed: true,
        inactive: {
            days: 60,
            namespaces: [0],
            zeroIsInactive: true
        },
        mwGroups: [
            'bannedfromchat',
            'bureaucrat',
            'content-moderator',
            'bot',
            'rollback'
        ],
        newuser: false
    },
	tags: {
        bureaucrat: { u:'Enchanter',
            link: 'Special:ListUsers/bureaucrat'
        },
         sysop: { u:'Siren',
            link: 'Special:ListUsers/sysop'
        },
         chatmoderator: { u:'Navigator',
            link: 'Special:ListUsers/chatmoderator'
        },
        threadmoderator: { u:'Navigator',
            link: 'Special:ListUsers/threadmoderator'
        },
        blocked: { u:'Murdered',
            link: 'Special:BlockList'
        },
        bot: {
            link: 'Special:ListUsers/bot'
        },
        'content-moderator': { u: 'Content Moderator', link: 'Special:ListUsers/content-moderator'
        },
        'rollback': { u: 'Rollback', link: 'Special:ListUsers/rollback'
        }
	}
};

// Other module fixes
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 60; // Inactive if no edits in 60 days

/* Any JavaScript here will be loaded for all users on every page load. */
importScriptPage('MediaWiki:WallGreetingButton/code.js', 'dev');
importArticles({type:'script', article:'w:c:dev:UserTags/code.js'});

/* WAM */
window.railWAM = {
     loadOnPage: 'Special:WikiActivity',
};