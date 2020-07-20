// Licencje
var LicenseOptions = {
	'{{Copyright}}': 'Grafika o zastrzeżonych prawach autorskich',
	'{{CopyrightedFreeUse}}': 'Copyright, wolne użycie',
	'{{Foto użytkownika}}': 'Foto użytkownika',
	'{{Logo}}': 'Logo innej wiki',
	'{{Screenshot}}': 'Screenshot',
	'{{Art}}': 'Art',
	'{{PD}}': 'Domena publiczna',
	'{{cc-by-sa-3.0}}': 'Creative Commons-Uznanie autorstwa-Na tych samych warunkach-3.0',
	'{{GFDL}}': 'GNU FDL'
};
importArticles({
    type: "script",
    articles: [
	"u:pl.tes:MediaWiki:APIQuery.js",
	"u:pl.tes:MediaWiki:Licenses.js"
   ]
});

// AjaxRC
ajaxPages = ["Specjalna:Aktywność_na_wiki","Specjalna:Ostatnie_zmiany","Specjalna:Rejestr","Specjalna:Nowe_pliki","Specjalna:Nowe_strony"];
AjaxRCRefreshText = 'Auto-odświeżanie';
AjaxRCRefreshHoverText = 'Automatycznie aktualizuje tę stronę';