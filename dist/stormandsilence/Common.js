/* Any JavaScript here will be loaded for all users on every page load. */
/* Username Detector */
$(function() {
    $('.username').text(mw.config.get('wgUserName'));
});

/* Mainpage css import */
if(mw.config.get('wgIsMainPage')) {
    importStylesheet( 'MediaWiki:Mainpage.css' );
}

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
        bureaucrat: { u:'Sahib',
            link: 'Special:ListUsers/bureaucrat'
        },
         sysop: { u:'Big Mohammedan',
            link: 'Special:ListUsers/sysop'
        },
         chatmoderator: { u:'Yellow Piggies',
            link: 'Special:ListUsers/chatmoderator'
        },
        threadmoderator: { u:'Yellow Piggies',
            link: 'Special:ListUsers/threadmoderator'
        },
        blocked: { u:'Miser',
            link: 'Special:BlockList'
        },
        bot: {
            link: 'Special:ListUsers/bot'
        },
        'content-moderator': { u: 'Yellow Piggies', link: 'Special:ListUsers/content-moderator'
        },
        'rollback': { u: 'Rollback', link: 'Special:ListUsers/rollback'
        }
	}
};