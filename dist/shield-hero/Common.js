/* BackToTopButton */
window.BackToTopModern = true;

/* LockOldBlogs */
window.LockOldBlogs = {
    expiryMessage: 'This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days, please don\'t bump this blog!',
    nonexpiryCategory: 'Never archived blogs'
};

/*License*/
window.NoLicenseWarning = {
    forceLicense: true
};

/* UserTags */
window.UserTagsJS = {
    tags: {
        'bureaucrat': {
            u: 'Bureaucrat',
            link: 'Project:Bureaucrats'
        },
        'sysop': {
            u: 'Legendary Hero',
            link: 'Project:Sysops'
        },
        'content-moderator': {
            u: 'Hero',
            link: 'Project:Content moderator'
        },
        'poweruser': {
            u: 'Hero\'s Companion',
            link: 'Project:Autoconfirmed users'
        },
        'autoconfirmed-user': {
            u: 'Renowned Adventurer',
            link: 'Project:Autoconfirmed users'
        },
        'user': {
            u: 'Adventurer',
            link: 'Project:Autoconfirmed users'
        },
        'newuser': {
            u: 'Recently Isekai\'d'
        },
        inactive: {
            u: 'Inactive',
            title: 'The user hasn\'t edited for last 30 days'
        },
        blocked: {
            u: 'Blocked',
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