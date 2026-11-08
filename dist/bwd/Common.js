window.UserTagsJS = {
    modules: {},
    tags: {
        owner: { u: 'Owner', order: 1 },
        wizard: { u: 'Wizard', order: 2 },
        admin: { u: 'Admin', order: 3 }
    }
};

window.UserTagsJS.modules.custom = {
    'IR6204': ['owner'],
    'Arendi08': ['owner'],
    'DoublDamage': ['admin'] 
};

// This hides the default Fandom roles so only your custom ones show
window.UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop']; 
window.UserTagsJS.modules.metafilter = {
    sysop: ['owner'], 
    bureaucrat: ['owner']
};