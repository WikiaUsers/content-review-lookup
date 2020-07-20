/* Any JavaScript here will be loaded for all users on every page load. */

// ============================================================
//                       Imports
// ============================================================
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Onlyifuploading.js',               // Only if uploading
	'u:dev:DisplayClock/code.js',                 // Display Clock
        'u:dev:ReferencePopups/code.js',              // Reference Popups
        'w:dev:WallGreetingButton/code.js',           // Wall Greeting Button
        'u:dev:Countdown/code.js',                    // Countdown
        'w:c:dev:Voice_Output/code.js',               // Google Voice Output
        'u:dev:ArchiveTool/code.js',                  // ArchiveTool
        'u:dev:LockOldBlogs/code.js',                 // Lock all old Blog comments
        'u:dev:PageMakerPro/code.js',                 // Google Voice Output
        'u:dev:DISPLAYTITLE/code.js',                 // Displaytitle Function
        'u:dev:ListFiles/code.js',                    // ListFiles
        'u:dev:EditcountTag/code.js',                 // Editcount Tag
        'u:dev:Printer/code.js',                      // Print Function
        'u:dev:TopEditors/code.js',                   // Top Editors
        'u:dev:Translator/Translator.js',             // Translate Function
	'u:dev:SignatureCheck/code.js',               // Signature Check
        'u:dev:ExternalImageLoader/code.js',          // External Image Loader
        'u:dev:AjaxRC/code.js',                       // Recent Changes Watchlist
        'u:dev:PurgeButton/code.js',                  // Purge Button
        'u:dev:MiniComplete/code.js',                 // MiniComplete Function
        'MediaWiki:Wikiaapp.js',                      // Wikia App (Wordmark)
        'u:zh.pad.wikia.com:MediaWiki:CountDown.js',  // Korean Pad Countdown
        'MediaWiki:Gadget-NavFrame.js',               // Dynamic Navigation Bars
        'MediaWiki:Gadget-collapsibleTables.js',      // Collapsible tables
        'u:dev:ShowHide/code.js'                      // ShowHide
        ]
    }, {
        type: "style",
        articles: [
            "u:zh.pad:MediaWiki:CountDown.css"
        ]
});