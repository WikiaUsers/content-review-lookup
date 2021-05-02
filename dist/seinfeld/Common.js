/* Any JavaScript here will be loaded for all users on every page load. */
/*** Pre-Load Show/Hide Code ***/
 
importScriptPage('ShowHide/code.js', 'dev');

// *************************************************
// Pagetitle rewrite
//
// Rewrites the page's title, used by Template:Title
// *************************************************
    $(function () {
        var newTitle = $("#title-meta").html();
        if (!newTitle) return;
        var edits = $("#user_masthead_since").text();
        $(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
        $(".#user_masthead_head h2").html(newTitle + "<small id='user_masthead_since'>" + edits + "</small>");
    });