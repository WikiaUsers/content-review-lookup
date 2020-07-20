/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto Refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
 
/* Replaces {{Visitor}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
 });
/* End of the {{Visitor}} replacement */

if ($('.page-User_Iliyana_Petkova').length) {
    $("#WikiaRail").append('<div style="clear:both;" align="center"><img src="https://images.wikia.nocookie.net/illyscorner/images/1/17/Chibi-Kazehana.png" width="300"></div>');
}

if ($('.page-User_Appleplum').length) {
    $("#WikiaRail").append('<div style="clear:both;" align="center"><img src="https://images.wikia.nocookie.net/__cb20130629091736/illyscorner/images/d/d2/Mirajane_Strauss_GMG.png" width="300"></div>');
}

if ($('.page-User_ChokokuguzaNoTobira').length) {
    $("#WikiaRail").append('<div style="clear:both;" align="center"><img src="https://images.wikia.nocookie.net/illyscorner/images/7/76/Choko_avi.png" width="300"></div>');
}

if ($('.page-User_talk_Iliyana_Petkova').length) {
    $("#WikiaRail").append('<div style="clear:both;" align="center"><img src="https://images.wikia.nocookie.net/illyscorner/images/1/17/Chibi-Kazehana.png" width="300"></div>');
}

/* Contains codes that don't work, but does the work I wanted, so I am gonna leave this until I learn js ^-^ */

$(".portalimg").hover(function() {
    $(this).children("img").fadeTo(500, 0)
           .end().children(".portaltext").show(500, 0);
}, function() {
    $(this).children("img").fadeTo(500, 1)
           .end().children(".portaltext").hide(500, 0);
});