// =====================================
//        Variables for functions
// =====================================
// Ajax auto-refresh
ajaxPages = ['Special:RecentChanges', 'Special:WikiActivity', 'Special:Watchlist', 'Special:Log', 'Special:Contributions', 'Special:NewFiles', 'Special:AbuseLog'];
AjaxRCRefreshText = 'Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';

// Display Clock
window.DisplayClockJS = {
    format: '%d %B %Y, %2H:%2M:%2S (UTC)',
    hoverText: 'Click to purge the cache'
};

// =====================================
//                Imports
// =====================================
// Check the original pages for more informations.

importArticles({
    type: 'script',
    articles: [
        // Test if an Element has a Certain Class
        'MediaWiki:Common.js/elementClass.js',
        // NavFrame
        'MediaWiki:Common.js/navFrame.js',
        // Cookie accessor functions
        'MediaWiki:Common.js/cookie.js',
        // Togglers (toggles the display of elements on a page)
        'MediaWiki:Common.js/togglers.js',
        // Lock old forums
        'MediaWiki:Common.js/forumArchiveDisable.js‎',
        // Upload
        'MediaWiki:Common.js/upload.js',
        // Custom Edit Buttons
        'MediaWiki:Common.js/customButtons.js',
        // AF in RC
        'MediaWiki:Common.js/afTable.js',
        // Ajax auto-refresh
        'w:dev:AjaxRC/code.js',
        // Locking comments of old blog posts
        'w:dev:LockOldBlogs/code.js',
        // List all duplicate images
        'w:dev:DupImageList/code.js',
        // SignatureCheck
        'w:dev:SignatureCheck/code.js',
        // Display Clock
        'w:dev:DisplayClock/code.js',
        // ExternalImageLoader
        'w:dev:ExternalImageLoader/code.js',
        //Referencepopups
        'w:c:dev:ReferencePopups/code.js',
        //Category quick delete
        'u:dev:QuickDelete/multiCats.js',
        // Mini complete http://dev.wikia.com/wiki/MiniComplete
        'w:dev:MiniComplete/code.js'
    ]
});

// =====================================
//                Others
// =====================================
//File Links AutoUpdate
if (wgPageName.indexOf("Special:MovePage/File:") != -1 || (wgCanonicalNamespace == "File" && Storage)){
   importScriptPage("FileUsageAuto-update/code.js", "dev");
}
/* Buraya konulacak JavaScript kodu sitedeki her kullanıcı için her sayfa yüklendiğinde çalışacaktır */