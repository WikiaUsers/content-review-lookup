/* Any JavaScript here will be loaded for all users on every page load. */


/* Include Global Anime-Common.js Information */
importScriptURI('http://anime.wikia.com/index.php?title=MediaWiki:Anime-Common.js&action=raw&ctype=text/javascript&dontcountme=s&templates=expand');

/*</pre>*/
/* Replaces {{Visitor}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").text(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{Visitor}} replacement */

importArticles({
    type: 'script',
    articles: [
        // ...
        'w:dev:ReferencePopups/code.js',
        // ...
    ]
});
importArticle({type:'script', article:'w:c:dev:UserBadges/code.js'});
importArticles({type: 'script', articles:'u:dev:FloatingToc/code.js'});

/*List files*/
importArticles({
    type: "script",
    articles: [
        "u:dev:ListFiles/code.js" // ListFiles from Dev Wiki
    ]
});