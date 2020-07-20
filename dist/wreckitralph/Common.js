/**** UploadInFile ****/
window.needsLicense = true;
window.allowMultiUpload = false;
importArticles({
    type: 'script',
    articles: [
        "u:dev:UploadInPage/code.js"
    ]
});

importScriptPage('InactiveUsers/code.js', 'dev');

importScript('MediaWiki:Common.js/profileRedesign.js');

importScript('MediaWiki:Common.js/SandboxNav.js');

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */

// *************************************************
// Pagetitle rewrite
//
// Rewrites the page's title, used by Template:Title
// *************************************************
 
if (wgCanonicalNamespace == "User" || wgCanonicalNamespace == "User talk") {
$(function () {
    var newTitle = $("#title-meta").html();
    if (!newTitle) return;
    var edits = $("#user_masthead_since").text();
    $(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
    //$(".user_masthead_head h2").html(newTitle + "<small id='user_masthead_since'>" + edits + "</small>");
});
}
 
/* </pre> */

/* Lock comments on sufficiently old blog posts */

window.LockOldBlogs = {
    expiryDays: 365,
    nonexpiryCategory: "Non-archived blogs",
/*    expiryCategories: []*/
};

importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:LockOldBlogs/code.js"
    ]
});