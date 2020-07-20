/* Umieszczony tutaj kod JavaScript zostanie załadowany wyłącznie przez użytkowników korzystających ze skórki Wikia */
 // 14:39, November 25, 2011 (UTC)
// <source lang="JavaScript">
// CODE WRITTEN BY USER:RAPPY_4187
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // Projektanci
 
  rights["Lisica01"]                  = ["Opiekunka Fanonu"];

 
  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  if (typeof rights[wgTitle] != "undefined") {
    // Usunięcie poprzednich opisów grup
    $('.UserProfileMasthead .masthead-info span.group').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
$('<span class="tag" style="margin-left: 10px !important">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
    }
  }
});


//import
importArticles({
   type: "script", 
   articles: ["u:pl.tes:MediaWiki:License.js"]
   });
 
// Licencje plików
var options = {
   '{{Brak_licencji}}': 'Nie znam licencji',
   '{{Fairuse}}': 'Plik używany zgodnie z zasadami dozwolonego użytku',
   '{{CC-BY-SA}}': 'Pliki na licencji Creative Commons',
   '{{Copyright}}': 'Zastrzeżone prawa autorskie',
   '{{PD}}': 'Plik znajduje się w domenie publicznej',
   '{{Wikimedia}}': 'Plik z Wikipedii lub innego projektu Fundacji Wikimedia'
};
// Komunikat licencji
function emptyLicenseAlert(form) {
	var msg = "Licencja pliku nie została dodana. Możesz spróbować ponownie ale pamiętaj, że pliki bez licencji mogą zostać usunięte przez administrację po 3 dniach od ich wstawienia."
	if(window.emptyLicenseWarningDelivered) return true;
	if($('#wpLicense').val() == '') {
		alert(msg);
		window.emptyLicenseWarningDelivered = true
		return false
	}
	return true;
}
$('#mw-upload-form').submit(function(e) {return emptyLicenseAlert(this);});