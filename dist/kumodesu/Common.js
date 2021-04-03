/* Any JavaScript here will be loaded for all users on every page load. */
window.BackToTopModern = true;

// User tags
window.UserTagsJS = {
    tags: {
        'bureaucrat': {
            u: 'Outer God',
            link: 'Project:Administrators'
        },
        'sysop': {
            u: 'System Administrator',
            link: 'Project:Administrators'
        },
        'content-moderator': {
            u: 'Ruler',
            link: 'Project:Content moderator'
        },
        'poweruser': {
            u: 'n% I = W',
            link: 'Project:Autoconfirmed users'
        },
        'autoconfirmed-user': {
            u: 'n% I = W',
            link: 'Project:Autoconfirmed users'
        },
        'user': {
            u: 'n% I = W',
            link: 'Project:Autoconfirmed users'
        },
        'newuser': {
            u: 'Small Lesser Taratect'
        },
        inactive: {
            u: 'Devoured',
            title: 'The user hasn\'t edited for last 30 days'
        },
        blocked: {
            u: 'Devoured',
            link: 'Project:Blocking policy'
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