/* Any JavaScript here will be loaded for all users on every page load. */

/***************************/
/* Interface Modifications */
/***************************/

/* Template:USERNAME Substitution */
$(function() {
    $('.InsertUsername').text(wgUserName);
});

/***************************/
/** Import Configuration ***/
/***************************/

/* StandardEditSummary */
window.dev = window.dev || {};
window.dev.editSummaries = {
    css: '#edit-summaries',
    select: [
        'select',
        '1. General editing', [
            'Updated information',
            'Corrected spelling/grammar',
            'Reorganised content',
            'Added media'
        ],
        '2. Radical editing', [
            'Removed content',
            'Revised article',
            'Reverted to older version'
        ],
        '3. Maintenance', [
            'Updated category',
            'Added notice template',
            'Removed/fixed link(s)',
            'Removed/replaced file(s)',
            'Removed/corrected template(s)'
        ]
    ]
};

/* UserTags */
window.UserTagsJS = {
    modules: {},
    tags: {
        moderator: {u:'Moderator'},
        newuser: {u:'Novice Editor'},
        sysop: {u:'Administrator'}
    }
};
UserTagsJS.modules.implode = {'moderator': ['content-moderator', 'threadmoderator']};
UserTagsJS.modules.inactive = 60;
UserTagsJS.modules.metafilter = {'sysop': ['bureaucrat']};
UserTagsJS.modules.newuser = {
    days: 7,
    edits: 5,
    namespace: 0
};

/***************************/
/***** Script Imports ******/
/***************************/

// See [[MediaWiki:ImportJS]].