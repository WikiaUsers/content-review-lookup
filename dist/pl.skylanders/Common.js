/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */

//===============================================================================
//   Ostrzeżenie o braku licencji dla plików
//===============================================================================
function emptyLicenseAlert(form) {
	var msg = "Licencja pliku nie została wybrana. Możesz spróbować ponownie, ale pamiętaj, że pliki bez licencji są usuwane."
	if(window.emptyLicenseWarningDelivered) return true;
	if($('#wpLicense').val() == '') {
		alert(msg);
		window.emptyLicenseWarningDelivered = true
		return false
	}
	return true;
}
$('#mw-upload-form').submit(function(e) {return emptyLicenseAlert(this);});
 
$(".wikia-gallery-item .thumbimage").each(function(i,elem) {
		$(elem).attr('title',$(elem).attr('alt'));
	});
	$(".wikia-gallery-item .image").each(function(i,elem) {
		$(elem).attr('title',$(elem).attr('alt'));
});
 
// Licencje
var options = {
	'{{Copyright}}': 'Grafika o zastrzeżonych prawach autorskich',
	'{{CopyrightedFreeUse}}': 'Copyright, wolne użycie',
	'{{Foto użytkownika}}': 'Foto użytkownika',
	'{{Logo}}': 'Logo innej wiki',
	'{{Screenshot}}': 'Screenshot',
	'{{Art}}': 'Art',
	'{{PD}}': 'Domena publiczna',
	'{{cc-by-sa-3.0}}': 'Creative Commons-Uznanie autorstwa-Na tych samych warunkach-3.0',
	'{{GFDL}}': 'GNU FDL'
});

// UserTags
window.UserTagsJS = {
	tags: {
		usermonth:	{ u:'Użyt. miesiąca', title: 'Użytkownik miesiąca' }
	},
	modules: {
		inactive: 30,
		mwGroups: ['bot','bureaucrat','chatmoderator','founder','rollback'],
		autoconfirmed: true,
		newuser: true,
		nonuser: true
	}
};

// AjaxRC
ajaxPages = 
["Nieużywane_filmy","Specjalna:Nieużywane_pliki","Specjalna:Aktywność_na_wiki","Specjalna:Ostatnie_zmiany","Specjalna:Rejestr","Specjalna:Nowe_pliki","Specjalna:Nowe_strony","Specjalna:Nieskategoryzowane_kategorie];
AjaxRCRefreshText = 'Auto-odświeżanie';
AjaxRCRefreshHoverText = 'Automatycznie aktualizuje tę stronę';

// IMPORT SKRYPTÓW
// W ostatnim imporcie nie umieszczamy przecinka.
importArticles({
    type: "script",
    articles: [
	"u:pl.tes:MediaWiki:AjaxRC.js", 			// AjaxRC
	"u:pl.tes:MediaWiki:License.js",			// Licencje plików
	"u:dev:UserTags/code.js",				// UserTags
   ]
});