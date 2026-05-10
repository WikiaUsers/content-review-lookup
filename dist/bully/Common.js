/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
    modules: {},
    tags: {
        rollback: { u: 'Patroller' }
    }
};

UserTagsJS.modules.metafilter = {
    'inactive': ['bureaucrat', 'sysop', 'rollback'], 
    'threadmoderator': ['bureaucrat', 'sysop', 'rollback'], 
    'contentmoderator': ['bureaucrat', 'sysop', 'rollback'] 
};

UserTagsJS.modules.inactive = 60;