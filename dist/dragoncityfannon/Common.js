importArticles({
    type: "script",
    articles: [
        "external:dev:Countdown/code.js",
        "external:dragoncity:User:Jens_Ingels/common.js/flash.js",
        "external:dev:RevealAnonIP/code.js",
        "external:dev:FixWantedFiles/code.js",
        "external:dev:InactiveUsers/code.js",
        "external:dev:SearchSuggest/code.js"
    ]
});

$('#iconi').append('<a href="/wiki/Template:Infobox/doc" target="_blank" id="infobox-help" title="click for help" style="border: 1px solid silver; color: silver; border-radius: 8px; font-size: 6pt; text-align: center; width: 10px; height: 10px; line-height: 12px; padding: 1px; position: absolute; right: 5px; margin-top: -22px; cursor: help; transition: border-color .5s, color .5s; -moz-transition: border-color .5s, color .5s; -webkit-transition: border-color .5s, color .5s; -o-transition: border-color .5s, color .5s; opacity: 1; filter: alpha(opacity=100);">?</a>');

/* Replaces {{USERNAME}} with the username */
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);