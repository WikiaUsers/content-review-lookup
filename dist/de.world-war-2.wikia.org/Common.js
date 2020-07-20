/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
 
 if ( wgCanonicalSpecialPageName == "Upload" ) {
      document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }

importScriptPage('ShowHide/code.js', 'dev');

var ShowHideConfig = { 
    autoCollapse: 3, 
    userLang: false, 
    en: {
	show: "anzeigen",
	hide: "ausblenden",
	showAll: "alle anzeigen",
	hideAll: "alle ausblenden"
    }
};

// 05:32, January 3, 2013 (UTC)
// <source lang="JavaScript">

// Import scripts from DEV wiki
importArticles({
    type: 'script',
    articles: [
        'w:c:dev:DISPLAYTITLE/code.js',
        'w:c:dev:ReferencePopups/code.js',
        'w:c:dev:LockOldBlogs/code.js'
    ]
});
// END Import scripts from DEV wiki

// Lock Old Blogs
window.LockOldBlogs = {
    expiryDays: 70,
    expiryMessage: "Dieser Blog betrachtet wird archiviert, da es nicht kommentiert worden hat in über <expiryDays> Tag, bitte nicht bearbeiten blog!",
    nonexpiryCategory: "Never archived blogs"
};
// END Lock Old Blogs

// Adds DisplayClock
importScript('MediaWiki:Common.js/displayClock.js');
// END Adds DisplayClock

// </source>