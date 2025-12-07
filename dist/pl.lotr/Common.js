window.ajaxPages = ["Special:RecentChanges","Specjalna:Ostatnie_zmiany","Specjalna:Aktywność_na_wiki","Special:WikiActivity"];
window.AjaxRCRefreshText = 'Automatyczne odświeżanie';
window.AjaxRCRefreshHoverText = 'Włącza automatyczne odświeżanie strony';
importScriptPage('AjaxRC/code.js', 'dev');


$(function(){
	importArticles({
		type: "script",
		articles: ["u:zh.pad.wikia.com:MediaWiki:CountDown.js"]
	}, {
		type: "style",
		articles: ["u:zh.pad.wikia.com:MediaWiki:CountDown.css"]
	});
});

function emptyLicenseAlert(form) {
        var msg = "Licencja pliku nie została wybrana. Możesz spróbować ponownie ale pamiętaj, że pliki bez licencji są usuwane."
        if(window.emptyLicenseWarningDelivered) return true;
        if($('#wpLicense').val() == '') {
                alert(msg);
                window.emptyLicenseWarningDelivered = true
                return false
        }
        return true;
}
$('#mw-upload-form').submit(function(e) {return emptyLicenseAlert(this);});



importScriptPage('User:Pio387/BackToTop.js', 'pl.lotr');
 
/* Importy zewnętrzne */
importArticles({
    type: "script",
    articles: [
        'w:c:dev:Countdown/code.js',
        'w:c:pl.tes:MediaWiki:Change.js',
        'u:dev:Message/code.js',
        'u:dev:User Rights Reasons Dropdown/code.js',
        'u:dev:DiscordIntegrator/code.js',
        'u:dev:MediaWiki:DiscordChat.js'
    ]
});

/* Importy wewnętrzne */
importArticles({
    type: "script",
    articles: [
         'MediaWiki:Familytree.js'
    ]
});

/* Komunikat */
var WikiaNotificationMessage = "Kliknij <a href='/wiki/Śródziemie_Wiki:Dołącz_do_nas'>tutaj</a> i już dziś dołącz do grona redaktorów Śródziemie Wiki.";
var WikiaNotificationexpiry = 999;
importScriptPage('WikiaNotification/code.js', 'dev');