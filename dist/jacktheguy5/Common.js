/* Any JavaScript here will be loaded for all users on every page load. */

// *************************************************
// BEGIN Pagetitle rewrite
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

// *************************************************
// END Pagetitle rewrite
// *************************************************