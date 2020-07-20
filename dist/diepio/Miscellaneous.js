///////////////////////////////////////////////
/*************** Miscellaneous ***************/
///////////////////////////////////////////////
/* Replaces {{USERNAME}} with the name of the user browsing the page */
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != "undefined" && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").text(wgUserName);
}
addOnloadHook(UserNameReplace);//End {{USERNAME}} replacement*/

/* Discord Rail Module Priority */
$(function() {
    mw.hook("DiscordIntegrator.added").add(function() {
        $(".DiscordIntegratorModule").appendTo("#WikiaRail");
    });
});//End DRMP*/