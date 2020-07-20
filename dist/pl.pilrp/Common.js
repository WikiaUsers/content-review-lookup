// Kod został zapożyczony z pl.plittr 
// = = = = = = = = = =
// IMPORT SKRYPTÓW
// W ostatnim imporcie nie umieszczamy przecinka.
importArticles({
    type: "script",
    articles: [
        'u:dev:InactiveUsers/code.js',
//        'u:dev:LockOldBlogs/code.js',
	    'u:pl.tes:MediaWiki:AjaxRC.js',
	    'u:dev:WallGreetingButton/code.js',
	    'u:dev:ReferencePopups/code.js'
    ]
});

// AjaxRC
ajaxPages = [
	"Specjalna:Aktywność_na_wiki",
	"Specjalna:Ostatnie_zmiany",
	"Specjalna:Rejestr",
	"Specjalna:Nowe_pliki",
	"Specjalna:Nowe_strony"
];
AjaxRCRefreshText = 'Auto-odświeżanie';
AjaxRCRefreshHoverText = 'Automatycznie odświeża tę stronę';

// window.LockOldBlogs = {
//    expiryDays: 30,
//    expiryMessage: "Ten blog nie był komentowany przez 30 dni, dlatego zostało to wyłączone",
//    nonexpiryCategory: "Blogi zawsze aktualne"
// };

// Szablon Username pożyczony z pl.fiffan
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});