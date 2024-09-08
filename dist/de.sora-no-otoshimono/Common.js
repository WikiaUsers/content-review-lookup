/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});


 // Import [[MediaWiki:Onlyifuploading.js]] 


importScriptPage('ShowHide/code.js', 'dev');

var ShowHideConfig = { 
    autoCollapse: 3, 
    userLang: false, 
    en: {
	show: "anzeigen",
	hide: "ausblenden",
	showAll: "alle anzeigen",
	hideAll: "alle ausblenden"
    }

}
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 $(UserNameReplace);
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});