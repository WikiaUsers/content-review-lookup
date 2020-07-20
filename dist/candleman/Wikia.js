/* Having fun with user tags */
window.UserTagsJS = {
    tags: {
        bureaucrat: { link: 'Special:ListUsers/bureaucrat' },
        sysop: { link: 'Special:ListUsers/sysop' },
        contentmoderator: { link: 'Special:ListUsers/contentmoderator' },
        threadmoderator: { link: 'Special:ListUsers/threadmoderator' },
        chatmoderator: { link: 'Special:ListUsers/chatmoderator' },
        rollback: { link: 'Special:ListUsers/rollback' },
        bot: { link: 'Special:ListUsers/bot' }
    },
    modules: {
        autoconfirmed: true,
        inactive: {
            days: 7,
            namespaces: [0],
            zeroIsInactive: true
        },
        mwGroups: [
            'bannedfromchat',
            'bureaucrat',
            'sysop',
            'contentmoderator',
            'threadmoderator',
            'chatmoderator',
            'rollback'
            'bot'
        ],
        newuser: true
    }
};
/* Image category for all photos */
if (mw.config.get('wgCanonicalSpecialPageName') === 'MultipleUpload' || mw.config.get('wgCanonicalSpecialPageName') === 'Upload') {
    if (!$.getUrlVar('wpForReUpload') && !$('#wpUploadDescription').val()) {
        jQuery(function ($) {
            'use strict';
            $('#wpUploadDescription').val('[[Category:Images]]');
        });
    }
}