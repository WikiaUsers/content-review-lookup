/* Fixes user wikia.js and wikia.css files not loading in Oasis after upgrade to MediaWiki 1.19 */
if (!$('script[src*="title=User:' + wgUserName + '/wikia.js"]').length) {
    importScript('User:' + wgUserName + '/wikia.js');
}
 
if (!$('link[href*="title=User:' + wgUserName + '/wikia.css"]').length) {
    importStylesheet('User:' + wgUserName + '/wikia.css');
}

/* Spoiler alert */
window.SpoilerAlert = {
    isSpoiler: function () {
        return -1 != $.inArray('Spoilers', wgCategories);
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');

/* Opens chat in a new window for homepage */ 
$(".openchat a").click(function() {
   window.open('/wiki/Special:Chat', 'wikiachat', 'width=600,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=yes');
   return false;
});

/* Some imports */
importScriptPage('BackToTopButton/code.js', 'dev');
importScriptPage('SearchGoButton/code.js', 'dev');