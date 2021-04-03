window.UserTagsJS = {
    modules: {},
    tags: {
        technician: { u: 'Technician' },
        bureaucrat: { u: 'Better than Papa!' },
        sysop: { u: 'Food Critic' },
        chatmod: { u: 'Papa's Assistant' },
        rollback: { u: 'Restaurant Legend' },
        inactive: { u: 'Inactive user' }
    }
};

UserTagsJS.modules.custom = {
    'MintIceCream': ['technician']
};

UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = ['bureaucrat']; // Add bureaucrat group to bureaucrats
UserTagsJS.modules.metafilter = {
    sysop: ['bureaucrat']
};
UserTagsJS.modules.newuser = {
	days: 5, // Must have been on the Wiki for 5 days
	edits: 10, // And have at least 10 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};

importArticle({
    type: 'script',
    article: 'w:c:dev:UserTags/code.js'
});