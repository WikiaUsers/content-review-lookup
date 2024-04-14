/* Dev Wiki */
// AddRailModule
window.AddRailModule = [
    { page: 'Template:Discord', prepend: true }
];

// BackToTopButton
window.BackToTopModern = true;

// NoLicenseWarning 
window.NoLicenseWarning = {
    forceLicense: true
};

// PreloadTemplates
preloadTemplates_subpage = 'case-by-case';

// UserTags
window.UserTagsJS = {
    modules: {
        inactive: 45,
        mwGroups: ['autoconfirmed', 'bureaucrat', 'content-moderator', 'threadmoderator', 'rollback', 'sysop'],
        newuser: false,
        custom: { Kamerond5: ['founder'] },
        metafilter: { sysop: ['bureaucrat'], autoconfirmed: ['bureaucrat', 'founder', 'sysop', 'mod'] },
        implode: { mod: ['content-moderator', 'threadmoderator', 'rollback'] },
    },
    tags: {
        autoconfirmed: { u: 'Kijin', title: 'Autoconfirmed' },
        blocked: { u: 'Cryptid', link: 'Special:BlockList' },
        bureaucrat: { u: 'True Dragon', link: 'Project:About us#Local Administration', title: 'Bureaucrat' },
        inactive: { u: 'Fallen', title: 'Hasn\'t edited for 45 days' },
        founder: { u: 'Star King Dragon', link: 'Project:About us#Local Administration', title: 'Founder' },
        mod: { u: 'Dryad', link: 'Project:About us#Local Administration', title: 'Moderator' },
        notautoconfirmed: { u: 'Slime', title: 'New user' },
        sysop: { u: 'Manas', link: 'Project:About us#Local Administration', title: 'Administrator' },
    },
};