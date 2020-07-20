/* Any JavaScript here will be loaded for all users on every page load. */
/* Replaces {{Username}} with the name of the user browsing the page.
   Requires copying Template:Username. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
 importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:YoutubePlayer/code.js'
    ]
});
 
/* End of the {{USERNAME}} replacement */
 
importScriptPage('InactiveUsers/code.js', 'dev');
 
$("#iframeloader-HitTheDot").replaceWith('<iframe src=https://www.bitchute.com/embed/AeyDEgrX8oAV/ WIDTH=480 HEIGHT=360>');