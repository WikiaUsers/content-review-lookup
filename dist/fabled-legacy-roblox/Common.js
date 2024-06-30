/* Any JavaScript here will be loaded for all users on every page load. */

// Add a modern button to the Back To Top Button script
window.BackToTopModern = true;
window.BackToTopStart = 1250;


// Initializing the custom profile tags
window.UserTagsJS = {
    modules: {},
    tags: {
        former_staff: { u: 'Former Wiki Staff', order: 100 },
        impactful: { u: 'Impactful Editor', order: 101 },
        bureaucrat: { order: 1 },
        founder: { u: 'Wiki Founder', order: 0 }
    }
};

// Remove Administrator group from Bureaucrats
UserTagsJS.modules.metafilter = {
    sysop: ['bureaucrat'], 
};

//Giving the custom profile tags to users
UserTagsJS.modules.custom = {
    '123 bst': ['founder'],
    'Its Gear47': ['impactful'],
    'SillyWillyLookinGuy': ['impactful'],
    'VoidDrin': ['impactful'],
    '4KFrost01': ['impactful'],
    'Mubinazo': ['impactful'],
    'ChemBond': ['impactful'],
    'Agrusix': ['former_staff', 'impactful'],
    'TheTreasureHunter': ['former_staff', 'impactful'],
};

// Inactive users that have not edited the wiki for more than 40 days 
UserTagsJS.modules.inactive = 40;

// New wiki editors
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = true;