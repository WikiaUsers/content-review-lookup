/* Any JavaScript here will be loaded for all users on every page load. */
window.SpoilerAlertJS = {
    question: 'This area contains spoilers. Are you sure you want to read it?',
    yes: 'Yeah, I would like read spoilers :v',
    no: 'No, I like prevent spoilers D:',
    fadeDelay: 1600
};

/* FastDelete buttons label */

window.fdButtons = [
    {
        summary: 'Clean',
        label: 'Housekeeping'
    },
    {
        summary: 'Vandalism',
        label: 'Vandalism'
    },
    {
        summary: 'Spam',
        label: 'Spam'
    },

    {
        summary: 'Off-Topic (not related to Between page). Please, make this on Discussions.',
        label: 'Off-Topic'
    }
];

// PurgeButton label

window.PurgeButtonText = 'Purge this page';

// AjaxRC  Config

window.ajaxPages = ["Between Wiki:Appeal unblock requests"];
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions"];
window.ajaxIndicator = 'https://images.wikia.nocookie.net/software/images/a/a9/Indicator.gif';
window.ajaxRefresh = 30000;
$.extend(true, window, {dev: {i18n: {overrides: {AjaxRC: {
    'ajaxrc-refresh-text': 'AJAX',
    'ajaxrc-refresh-hover': 'Enable page auto-refresh',
}}}}});

// Label for ''CustomGalleryButton'' - if you want to edit this, please first warn to all users to the wiki - to prevent drastic changes.

window.galleryButtonIconHidden = false;
window.galleryButtonText = 'Add or remove an image/video to this gallery';

// DiscussionFeed script customizing



// FastBlock label - We promised the admins this great tool!

window.FastBlock = [
    {
        label: 'Vandalism',
        expiry: '2 weeks',
        reason: 'Vandalism. See our Blocking policy.'
    },
    {
        label: 'Harassment',
        expiry: '1 year',
        reason: 'Harassment. See our blocking policy',
        nocreate: 0
    }  
];