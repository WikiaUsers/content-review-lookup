/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
 
/*<pre>*/
 
/*--- IMPORT SKRYPTÓW // W ostatnim imporcie nie umieszczamy przecinka. ---*/

importArticles({
    type: "script",
    articles: [
	"u:pl.tes:MediaWiki:License.js",		/* Łatwe dodawanie licencji do przesłanych obrazków */
        "u:pl.tes:MediaWiki:Gadget-searchopt.js",		/* Rozszerzenie wyszukiwania */
	"u:dev:ListAdmins/code.js",			/* Lista sysopów */
	"u:dev:DupImageList/code.js",			/* Lista duplikatów obrazków */
	"u:dev:SearchSuggest/code.js",		/* Sugestie do wyników wyszukiwania */
	"u:dev:WallGreetingButton/code.js"		/* Przycisk edytowania powitania na Tablicy */
   ]
});

/*--- Fixy dla profilu użytkownika ---*/

$(function() {
    // Przeniesienie paska wyszukiwania na wysokość nicku
    $('#UserProfileMastheadSearch').appendTo('.masthead-info hgroup h1');
 
    // Przeniesienie przycisku edycji na bardziej logiczne miejsce
    $('.UserProfileActionButton').prependTo('.tabs-container').css({
        marginRight: '320px',
        float: 'right',
        marginTop: '4px'
    });
});

/*--- Zmiana "użytkownik wiki" na dokładny numer IP //  wersja dla moderatorów, adminów i biurokratów ---*/

window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};

importScriptPage('RevealAnonIP/code.js', 'dev');

/*--- Dod. linków na karcie "Na Wiki" w menu nawigacji ---*/
$(document).ready(function() {
 $('.WikiHeader > nav > ul > li:first-child > ul').append('<li><a class="subnav-2a" href="/wiki/Project:O nas">O nas</a></li>');
});

/*--- Dodanie przycisku "Odśwież" ---*/
 
PurgeButtonText = 'Odśwież';
importScriptPage('PurgeButton/code.js', 'dev');

/* ------ Licencje ------ */

var options = {
                '{{Art}}': 'Art',
                '{{Brak_licencji}}': 'Nie znam licencji',
		'{{CC-BY-SA}}': 'Creative Commons BY-SA',
		'{{Copyright}}': 'Plik ma zastrzeżone pr. autorskie',
		'{{Fairuse}}': 'Plik ma dozwolone użycie',
                '{{Foto użytkownika}}': 'Foto użytkownika',
                '{{GFDL}}': 'GNU Free Documentation License',
                '{{PD}}': 'Plik należy do domeny publicznej'
                '{{Screenshot}}': 'Screenshot',
                '{{Wikimedia}}': 'Plik pochodzi z Wikipedii',
	};

/*--- Alert o braku licencji dla plików ---*/

function emptyLicenseAlert(form) {
	var msg = "Licencja pliku nie została wybrana. Możesz spróbować ponownie, ale pamiętaj, że pliki bez licencji mogą zostać usunięte."
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

/*</pre>*/