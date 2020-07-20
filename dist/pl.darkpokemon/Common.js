/* Początek Common.js */

/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

// Łatwe dodawanie licencji do przesłanych obrazków
/*
 * QLicense.js, 
 * [originally] by User:Cakemix, decoded and formatted,
 * decoded, formatted, and shortened by Monchoman45,
 * translated by MarkosBoss,
 * corected by Dox.
 */
function QLicenseUI() {
	window.qapi = new APIQuery();
	var options = {
                '{{Brak_licencji}}': 'Nie znam licencji',
		'{{Screenshot}}': 'Screenshot z gry',
                '{{Screenshot-wikia}}': 'Screenshot strony wiki',
		'{{Logo}}': 'Logo gry lub firmy',
		'{{CC-BY-SA}}': 'Creative Commons 3.0',
                '{{GFDL}}': 'GNU Free Documentation License',
		'{{Copyright}}': 'Plik ma zastrzeżone pr. autorskie',
		'{{CopyrightedFreeUse}}': 'Plik ma dozwolone użycie',
                '{{Wikimedia}}': 'Plik pochodzi z Wikipedii',
                '{{PD}}': 'Plik należy do domeny publicznej'
	};
	var optstr = '';
	for(i in options) {optstr += '<option value="' + i + '" style="text-align:center;">' + options[i] + '</option>';}
 
	var html = '<p style="text-align:center;"><select id="QLicenseSelect">' + optstr + '</select>&nbsp;<a class="wikia-button" style="margin:0 1em; cursor:pointer;" id="aSubmit">Dodaj licencję</a> (jeśli jej nie ma)';
	if(document.getElementById('LicensedFile') || document.getElementById('Copyright')) {html += '&nbsp;<span style="color:red; font-weight:bold; text-align:center;"></span></p>';}
	else {html += '&nbsp;<span style="color:green; font-weight:bold; text-align:center;"></span></p>';}
	$('#filetoc').append(html);
 
	document.getElementById('aSubmit').onclick = function(event) {
		qapi.send(new qapi.Query(qapi, 'POST', 'action=edit&title=' + wgPageName + '&appendtext=' + document.getElementById('QLicenseSelect').value + '&summary=Licensing image', function(result) {
			if(result.edit.result == 'Success') {window.location = wgServer + '/index.php?title=' + wgPageName + '&action=purge';}
			else {alert('Wystąpił błąd.');}
		}));
		this.innerHTML = '<img src="https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline;" border="0" />';
	}
}
 
if(wgCanonicalNamespace == 'File') {
	addOnloadHook(QLicenseUI);
	importScriptPage('MediaWiki:APIQuery.js', 'monchbox');
}
// END Łatwe dodawanie licencji do przesłanych obrazków

/* Automatyczny opis nowo przesłanych plików */
$(function preloadUploadDesc() {
  if (wgPageName != 'Specjalna:Prześlij') { return; }
 
  if ($('#wpUploadDescription').length) {
    $('#wpUploadDescription').append('{{Informacje\n' +
      '| Opis           = \n' +
      '| Źródło         = \n' +
      '| Data           = \n' +
      '| Autor          = \n' +
      '| Zezwolenie     = \n' +
      '| Inne wersje    = \n' +
      '}}');
  }
});
/* END Automatyczny opis nowo przesłanych plików */

/* Domyślne opisy zmian*/
importScript('MediaWiki:Common.js/es.js');
/* END Domyślne opisy zmian */

/********************/
/* Koniec Common.js */
/********************/