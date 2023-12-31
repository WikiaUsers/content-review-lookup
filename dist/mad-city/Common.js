window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 30;
window.lockOldComments.addNoteAbove = true;

const urlParams = new URLSearchParams(window.location.search);

//Forums lock (after 30 days)
window.LockForums = {
    expiryDays: 30,
    expiryMessage: "This thread is archived.",
    expiryBannerMessage: "<span style='color: maroon; font-weight: bold;'>Note:</span> This topic has been unedited for <actualDays> days. It is considered <b>archived</b> - the discussion is over. If you feel this thread needs additional information, contact an administrator.",
    lockMessageWalls: true,
};

//Edit summary dropdown
window.dev = window.dev || {};
window.dev.editSummaries = {
    select: [
        '(click to browse)',
        'Expanding', [
            'Added content',
            'Added images',
            'Added categories'
            
         ],
         'Changing', [
            'Corrected grammar',
            'Updated information',
            'Cleaned page'
            
         ]    ,  
         'Rules',[
            'Reverted vandalism',
            'Removed spam',
            'Removed inappropriate content',
            'Removed false information'
         ]
         /* etc. */
    ]
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AdminDashboard block/code.js', 'u:dev:MediaWiki:MarkBlocked.js', 'u:dev:EditConflictAlert/code.js'
    ]
});

importScriptPage('AjaxRC/code.js', 'dev');
/* Any JavaScript here will be loaded for all users on every page load. */
// This is an example configuration
window.railWAM = {
    logPage:"Project:WAM Log",
    autoLogForUsers:"MikhailMCraft"
};

//auto refresh
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = [
    "Special:RecentChanges",
];