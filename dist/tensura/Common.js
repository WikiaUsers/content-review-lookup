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

window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.tlen = 1000;

window.pPreview.RegExp.iparents = [
    '[id^=flytabs] .tabs',
    '.char-element'
];

// User tags
window.UserTagsJS = {
    tags: {
        'bureaucrat': {
            u: 'Demon Lord',
            link: 'Project:Bureaucrats'
        },
        'sysop': {
            u: 'True Dragon',
            link: 'Project:Sysops'
        },
        'content-moderator': {
            u: 'Paladin',
            link: 'Project:Content moderator'
        },
        'poweruser': {
            u: 'Slime',
            link: 'Project:Autoconfirmed users'
        },
        'autoconfirmed-user': {
            u: 'Fair Oni',
            link: 'Project:Autoconfirmed users'
        },
        'user': {
            u: 'Slime',
            link: 'Project:Autoconfirmed users'
        },
        'newuser': {
            u: 'Slime'
        },
        inactive: {
            u: 'Deceased',
            title: 'The user hasn\'t edited for last 30 days'
        },
        blocked: {
            u: 'Dark Oni',
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