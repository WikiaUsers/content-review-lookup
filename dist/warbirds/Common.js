/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});

importArticles({ type: 'script', articles: [ 
    'u:dev:Standard_Edit_Summary/code.js'
]});

// Create the "dev" namespace if it doesn't exist already:
 
window.dev = window.dev || {};
 
window.dev.editSummaries = {
     css: '#stdSummaries { ... }',
     select: [
        '(click to browse)',
        '1.Improving', [
            'Cleanup',
            'Corrected spelling/grammar',
            'Updating',
            'Adding Infobox',
            'Adding Navbox',
            'Adding Category',
            'Adding Photo',
            'Tagging as Stub',
            'Removing Spam',
            'Removing Vandalism',
            'Unneeded Content',
            /* etc. */
         ]
         /* etc. */
    ]
};
 
var WikiaNotificationMessage = "Be sure to check the wiki <a href='/wiki/User_blog:Fargo84/Taking_a_Step_Back'>Announcements!</a>";
var WikiaNotificationexpiry = 50;
importScriptPage('WikiaNotification/code.js', 'dev');

// Lock Old Blogs
window.LockOldBlogs = {
    expiryDays: 70,
    expiryMessage: "This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days, please don\'t edit this blog!",
    nonexpiryCategory: "Never archived blogs"
};
// END Lock Old Blogs

// Adds DisplayClock
importScript('MediaWiki:Common.js/displayClock.js');
// END Adds DisplayClock