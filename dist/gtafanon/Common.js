/* Any JavaScript here will be loaded for all users on every page load.  */

/* importScriptPages-start */

importScriptPage('Countdown/code.js', 'dev');

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

importScriptPage('ShowHide/code.js', 'dev');

//importScriptPage('MediaWiki:Search_Fix.js', 'dantest');

importScriptPage('BackToTopButton/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
"w:c:dev:BackToTopButton/code.js",
"w:c:dev:Countdown/code.js",
"w:c:dev:DISPLAYTITLE/code.js",
"w:c:dev:LockOldBlogs/code.js",
"w:c:dev:PowerPageMaker/code.js",
"w:c:dev:ReferencePopups/code.js",
"w:c:dev:ShowHide/code.js",
    ]
});

/* importScriptPages-end */


// </syntax>
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").text(wgUserName);
}
addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */