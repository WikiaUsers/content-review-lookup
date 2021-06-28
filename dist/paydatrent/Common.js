/* ------
Hi, I'm [[User:DapperFiz]]
PLEASE don't edit JS unless you know what you're doing
it breaks easily
------ */
window.UserTagsJS = {
	modules: {},
	tags: {
	    founder: {u:'Founder'},
	    bureaucrat: {u:'Bureaucrat'},
	    sysop: {u:'Administrator'},
	    threadmoderator: {u:'Discussions Moderator'},
	    chatmoderator: {u:'Chat Moderator'},
	    //idfk if custom tags will be a thing
	}
};
UserTagsJS.modules.custom = {
    'Grumpisimo': ['founder'],
    'The Haze3456': ['bureaucrat'],
}
 
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'moderator',
    'chatmoderator',
    'patroller',
    'rollback',
    'sysop',
    'bannedfromchat',
    'bot',
    'bot-global',
    'newuser'
];
 
UserTagsJS.modules.metafilter = {
    bureaucrat: ['founder'],
    sysop: ['bureaucrat'],
    threadmoderator: ['sysop', 'bureaucrat'],
    chatmoderator: ['sysop', 'bureaucrat', 'threadmoderator'],
    rollback: ['sysop', 'bureaucrat'],
    newuser: ['chatmoderator']
};

window.MessageWallUserTags = {
    tagColor: '#c94f16',
    glow: true,
    glowSize: '22px',
    glowColor: '#000000',
    users: {
        'Grumpisimo': 'Founder',
        'The Haze3456': 'Bureaucrat',
        
    }
};

/**
 * Miscellaneous code
 */
(function() {
    // AddRailModule configuration
    var ns = mw.config.get('wgNamespaceNumber');
    window.AddRailModule = (
        !localStorage.getItem('spoiler-warning') &&
        [0, 6, 14].indexOf(mw.config.get('wgNamespaceNumber')) !== -1
    ) ? [
        {
            page: 'int:custom-spoiler-warning',
            prepend: true
        }
    ] : [];

    // Move spoiler warning to the top, but below ads
    // Set a listener to remove the module when dismissed
    mw.hook('AddRailModule.module').add(function(module) {
        if (module === 'int:custom-spoiler-warning') {
            var $module = $('#WikiaRail .railModule');
            $module.find('#spoiler-warning-button').click(function() {
                localStorage.setItem('spoiler-warning', '1');
                $module.slideToggle();
            });
        }
    });

    mw.hook('DiscordIntegrator.added').add(function() {
        var $content = $('#WikiaRail .railModule');
        $content.insertBefore('.DiscordIntegratorModule');
    });
})();