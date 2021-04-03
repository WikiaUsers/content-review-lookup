/* Any JavaScript here will be loaded for all users on every page load. */
/* <pre> */

// =====================================================================
// Pagetitle rewrite
//
// =====================================================================
// Pagetitle rewrite
//
// Rewrites the page's title, used by Template:Title
//
// =====================================================================

$(function() {
    var newTitle = $("#title-meta").html();
    if (!newTitle) return;
    var edits = $("#user_masthead_since").text();
    $(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
    $(".#user_masthead_head h2").html(newTitle + "<small id='user_masthead_since'>" + edits + "</small>");
});

// *********
// IRC Login 
// *********
$(function() {
    if ($('#IRClogin')) {
        var nick = (mw.config.get('wgUserName') == null) ? ('Wikian' + Math.floor(Math.random() * 10)) : mw.config.get('wgUserName').replace(/ /g, '_');
        $('#IRClogin').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=wikia-combatarms&prompt=true&uio=OT10cnVlJjExPTUxJjEyPXRydWU37" width="950" height="400" style="border:0;"></iframe>');
    }
    if ($('#CVNIRClogin')) {
        var nick = (mw.config.get('wgUserName') == null) ? ('Wikian' + Math.floor(Math.random() * 10)) : mw.config.get('wgUserName').replace(/ /g, '_');
        $('#CVNIRClogin').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=cvn-wikia-combatarms&prompt=true&uio=OT10cnVlJjExPTUxJjEyPXRydWU37" width="950" height="400" style="border:0;"></iframe>');
    }
});

/* written by H Fern for more streamlined featured articles */
if ($('#plugin_featured').length > 0) {
    dt = $('#plugin_featured').html();
    $('#WikiaPageHeader .comments').eq(0).css('clear','none');
    $li = $('<li>');
    $li.css({float:'left',clear:'both',height:'20px'});
    $li.attr('title', dt === '' ? 'This article is a featured Article.' : 'This article was featured ' + dt + '.');
    $li.html('<img src="https://images.wikia.nocookie.net/combatarms/images/1/1f/Gold_star.png" style="width:20px;height;20px;"><span style="padding-left:5px;">Featured</span>');
    $('#WikiaPageHeader .commentslikes').eq(0).prepend($li);
}

/* MassCategorization */
window.MassCategorizationGroups = ['sysop', 'content-moderator'];