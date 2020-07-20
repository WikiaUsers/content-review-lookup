/* Any JavaScript here will be loaded for all users on every page load. */

/**customized MSPA wiki staff usertag by KockaAdmiralac **/
window.UserTagsJS = {
    modules: {
        explode: {
            'wiki-staff': ['content-moderator', 'threadmoderator'],
            'wiki-staff-2': ['sysop']
        },
        // mwGroups: {}
    },
    tags: {
        'wiki-staff': {
            u: 'MSPA Wiki Staff Member',
            link: 'Project:Staff'
        }
    }
};
window.UserTagsJS.tags['wiki-staff-2'] = window.UserTagsJS.tags['wiki-staff'];