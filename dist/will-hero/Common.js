/* Any JavaScript here will be loaded for all users on every page load. */

/***************************/
/** Import Configuration ***/
/***************************/

/* Template:USERNAME */
$(function() {
    $('.InsertUsername').text(wgUserName);
});

/* Wall Greeting Button */
window.WallGreetingButtonProtect = true;
window.WallGreetingButtonRaw = false;

/* HighlightUsers */
window.highlight = {
    selectAll: true,
    bot: '#60F',
    staff: '#008',
    vstf: '#008'
};

/* StandardEditSummary */
window.dev = window.dev || {};
window.dev.editSummaries = {
    css: '#stdSummaries',
    select: [
        '(click to browse)',
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
UserTagsJS.modules.inactive = 365;
UserTagsJS.modules.metafilter = {'sysop': ['bureaucrat']};
UserTagsJS.modules.newuser = {
    days: 30,
    edits: 20,
    namespace: 0
};

/***************************/
/***** Script Imports ******/
/***************************/
// See [[MediaWiki:ImportJS]].