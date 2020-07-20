/* Any JavaScript here will be loaded for all users on every page load. */
/**
 * 00:52, June 13, 2016 (UTC)
 * This is the central JavaScript file for the Wiki. Any code placed in here
 * will run on every page for every user (logged in or not) on every skin (Oasis
 * or Monobook).
 */
(function (window, $, mw) {
    "use strict";
 
    // Bulk loading scripts.
    // scriptList are scripts to load everywhere
    // pageScriptList are scripts which only certain pages need.
    var scriptList = [],
        pageScriptList = [];
       
    // Configure AjaxRC
    (window.ajaxPages = (window.ajaxPages || [])).push(
        "Special:RecentChanges",
        "Special:Watchlist",
        "Special:Log",
        "Special:Contributions",
        "Special:NewFiles",
        "Special:NewPages",
        "Special:ListFiles",
        "Special:WikiActivity"
    );
    window.AjaxRCRefreshText = 'Auto-Refresh';
    window.AjaxRCRefreshHoverText = 'Automatically refreshes every 60 seconds';
    window.ajaxCallAgain = ($.isArray(window.ajaxCallAgain) && window.ajaxCallAgain) || [];
    scriptList.push('u:dev:AjaxRC/code.js');
   
    // ArchiveTool
    window.archiveListTemplate = 'ArchiveList';
    window.archivePageTemplate = 'ArchivePage';
    scriptList.push('u:dev:ArchiveTool/code.js');
   
    // User tags
    window.UserTagsJS = {
        tags: {
            sysop: {
            u: 'sysop',
            title: 'System Operator'
            },
            rollback: {
            title: 'Rollbacker'
            },
            inactive: {
            title: 'This user hasn\'t edited for the last 30 days'
            }
        },
        modules: {
            inactive: 30,
            mwGroups: [
                'bureaucrat', 'rollback', 'sysop', 'bot', 'bot-global'
            ],
            autoconfirmed: false,
            newuser: true,
            metafilter: {
            sysop: ['bureaucrat'],
            bot: ['bot-global'],
            bureaucrat: ['founder'],
            },
        }
    };
    scriptList.push('u:dev:UserTags/code.js');
   
    // Null Edit button
    // Conditionally load purge button if page cannot be edited
    if ($("#ca-edit").length || $("a[data-id='editprofile']").length) {
        scriptList.push('u:dev:NullEditButton/code.js');
    } else {
        scriptList.push('u:dev:PurgeButton/code.js');
    }
    // List Files.
    scriptList.push('u:dev:ListFiles/code.js');
   
    // Reference Popups, like on Wikipedia
    scriptList.push('u:dev:ReferencePopups/code.js');
   
    //Displays time at top right of screen
    scriptList.push('u:dev:DisplayClock/code.js');
 
    // Custom edit buttons
    if (mw.toolbar) {
        mw.toolbar.addButton(
            'https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png',
            'Redirect',
            '#REDIRECT [[',
            ']]',
            'Insert text',
            'mw-editbutton-redirect' //inserts a button for adding redirects
        );
    }
   
    // Import all scripts in bulk (and minified)
    window.importArticles({
        type: 'script',
        articles: scriptList
    }, {
        type: 'script',
        articles: pageScriptList
    });
}(window, jQuery, mediaWiki));