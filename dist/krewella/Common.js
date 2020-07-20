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

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").text(wgUserName);
}
addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */