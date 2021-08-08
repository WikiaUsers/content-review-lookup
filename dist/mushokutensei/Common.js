/* Any JavaScript here will be loaded for all users on every page load. */
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

// User tags
window.UserTagsJS = {
    tags: {
        'bureaucrat': {
            u: 'Hero',
            link: 'Project:Bureaucrats'
        },
        'sysop': {
            u: 'World Power',
            link: 'Project:Sysops'
        },
        'content-moderator': {
            u: 'Mage',
            link: 'Project:Content moderator'
        },
        'poweruser': {
            u: 'Adventurer',
            link: 'Project:Autoconfirmed users'
        },
        'autoconfirmed-user': {
            u: 'Commoner',
            link: 'Project:Autoconfirmed users'
        },
        'user': {
            u: 'Adventurer',
            link: 'Project:Autoconfirmed users'
        },
        'newuser': {
            u: 'NEET'
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

/* Configuration settings for LinkPreview */
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.defimage = 'https://mushokutensei.fandom.com/wiki/File:Placeholder.png';
window.pPreview.noimage = 'https://mushokutensei.fandom.com/wiki/File:Placeholder.png';