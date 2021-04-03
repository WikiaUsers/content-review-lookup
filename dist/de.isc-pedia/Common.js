/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

importArticles({
    type: "script",
    articles: [
        "MediaWiki:Onlyifuploading.js",               // Only if uploading
        "MediaWiki:Spoiler.js",                       // Spoiler
	'u:dev:DisplayClock/code.js',                 // Display Clock
        'u:dev:ReferencePopups/code.js',              // ReferencePopups
        'w:dev:WallGreetingButton/code.js',           // Wall Greeting Button
        'u:dev:Countdown/code.js',                    // Countdown
        'u:dev:Voice_Output/code.js',                 // Google Voice Output
        'u:dev:ArchiveTool/code.js',                  // ArchiveTool
        'u:dev:PageMakerPro/code.js',                 // Google Voice Output
        'u:dev:dev:DISPLAYTITLE/code.js',             // Displaytitle Function
        'u:dev:ListFiles/code.js',                    // ListFiles
        'u:dev:EditcountTag/code.js',                 // Editcount Tag
        'u:dev:Printer/code.js',                      // Print Function
        'u:dev:OasisSidebar/code.js',                 // Oasis Sidebar
        'u:dev:TopEditors/code.js',                   // Top Editors
        'u:dev:Translator/Translator.js',             // Translate Function
        'u:zh.pad.wikia.com:MediaWiki:CountDown.js'   // Korean Pad Countdown
        'u:dev:LockOldBlogs/code.js',                 // Lock all old Blog comments
	'u:dev:SignatureCheck/code.js'                // Signature Check
        'u:dev:'ExternalImageLoader/code.js'          // External Image Loader
        ]
    }, {
        type: "style",
        articles: [
            "u:zh.pad:MediaWiki:CountDown.css"
        ]
});