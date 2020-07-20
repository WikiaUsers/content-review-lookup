/* TUTAJ ZNAJDUJE SIĘ KOD JAVASCRIPT DLA OBU SKÓREK.*/
/*Pamiętaj, że zmiany zostaną zatwierdzone dopiero po przesłaniu do sprawdzenia i zaakceptowaniu przez Wikię.
Przed wysłaniem do sprawdzenia KONIECZNIE sprawdź czy dodawany skrypt nie zepsuje działania wiki poprzez tryb testowy.*/

/* Automatyczne odświeżanie Ostatnich Zmian */
ajaxPages = [
	"Specjalna:Aktywność_na_wiki",
	"Specjalna:Ostatnie_zmiany",
	"Specjalna:Rejestr",
	"Specjalna:Nowe_pliki",
	"Specjalna:Nowe_strony"
];
AjaxRCRefreshText = 'Auto-odświeżanie';
AjaxRCRefreshHoverText = 'Automatycznie odświeża tę stronę';
window.ajaxRefresh = 60000;

/* Import - wyskakujące przypisy i odtwarzacz filmów z YouTube */
importArticles({
    type: 'script',
    articles: [
        'w:c:dev:ReferencePopups/code.js',
        'u:dev:MediaWiki:YoutubePlayer/code.js',
        'u:dev:AjaxRC/code.js'
    ]
});

/* Szablon {{Username}} */ 
// Autorzy: Originally by [[wikia:User:Splarka|Splarka]], then by [[User:Spang|Spang]], this (jQuery) version by [[wikia:User:Joeyaa]], written to be backwards compatible
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}

/* Przycisk "Wkład" w menu personalnym */
function UserContribsMenuItem() {
	$('.wds-global-navigation__user-menu .wds-global-navigation__dropdown-content ul.wds-list li:first-child').after('<li><a href="/wiki/Specjalna:Wkład/'+ encodeURIComponent (wgUserName) +'" class="wds-global-navigation__dropdown-link">Wkład</a></li>');
}
addOnloadHook(UserContribsMenuItem);