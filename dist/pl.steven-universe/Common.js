/* Import wyskakujących przypisów i odświeżania stron specjalnych */
importArticles({
    type: 'script',
    articles: [
        'w:c:dev:ReferencePopups/code.js',
        'u:dev:AjaxRC/code.js',
    ]
});

/* Ustawienia odświeżania */
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

/* Szablon {{Username}} */ 
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}

/* Przycisk "Wkład" w menu personalnym */
function UserContribsMenuItem() {
	$('.wds-global-navigation__user-menu .wds-global-navigation__dropdown-content ul.wds-list li:first-child').after('<li><a href="/wiki/Specjalna:Wkład/'+ encodeURIComponent (wgUserName) +'" class="wds-global-navigation__dropdown-link">Wkład</a></li>');
}
addOnloadHook(UserContribsMenuItem);