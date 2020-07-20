/*<pre>*/

/* Include Global Anime-Common.js Information */
importScriptURI('http://anime.wikia.com/index.php?title=MediaWiki:Anime-Common.js&action=raw&ctype=text/javascript&dontcountme=s&templates=expand');

 window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "This blog hasn\'t been commented on for over <expiryDays> days, and has been archived. Commenting is no longer possible.",
    nonexpiryCategory: "Nonexpiry blogs"
 };
 importArticles({
    type: "script",
    articles: [
        "w:c:dev:LockOldBlogs/code.js"
    ]
 });

/*</pre>*/

/*Lock old forums*/
window.LockForums = {
    expiryDays: 60,
    expiryMessage: "This forum hasn\'t been commented on for over <expiryDays> days and was archived.",
    warningDays: 30,
    warningMessage: "This forum hasn\'t been commented on for over <warningDays> days. Please reply ONLY if a response is really needed.",
};

importArticles({
    type: "script",
    articles: [
        "u:dev:LockForums/code.js"
    ]
});