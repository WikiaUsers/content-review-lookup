/* Any JavaScript here will be loaded for all users on every page load. */

/***************************/
/* Interface Modifications */
/***************************/

/* Template:USERNAME Substitution + Special:Editcount User Page Tab */
$(function() {
    $('.InsertUsername').text(wgUserName);
    $('<li data-id="editcount"><a href="' + 'http://geometry-dash.wikia.com/wiki/Special:Editcount/' + wgTitle + '">Edit-Count</a></li>').appendTo('.WikiaUserPagesHeader .tabs-container .tabs');
});

/***************************/
/** Import Configuration ***/
/***************************/

/* HighlightUsers */
window.highlightUsersConfig = {
    colors: {
        'bot': '#3A3A3A',
        'bot-global': '#3A3A3A',
        'staff': '#00D6D6',
        'vstf': '#00D6D6'
    },
    styles: {
        'bot': 'font-weight: bold;',
        'bot-global': 'font-weight: bold;',
        'staff': 'font-weight: bold;',
        'vstf': 'font-weight: bold;'
    }
};

/* StandardEditSummary */
window.dev = window.dev || {};
window.dev.editSummaries = {
    css: '#edit-summaries',
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