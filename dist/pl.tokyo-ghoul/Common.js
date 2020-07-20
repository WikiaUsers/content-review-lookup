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
var LicenseOptions = {
	'{{Brak licencji}}': 'Nie znam licencji',
	'{{Fairuse}}': 'Grafika Fairuse',
	'{{Copyright}}': 'Grafika Copyrighy',
	'{{Wikimedia}}': 'Grafika Wikimedii'
};
importArticles({
    type: "script",
    articles: [
	"u:pl.tes:MediaWiki:APIQuery.js",
	"u:pl.tes:MediaWiki:Licenses.js"
   ]
});

$(function() {
  $('#WikiaRail .loading').after('<div class="funpage"; style="box-shadow: 0 0 2px #000; margin-bottom: 10px; max-height: 130px;"><iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/connect/connect.php?id=TokyoGhoulWikiPL&amp;connections=10&amp;stream=0" align="top" frameborder="0" width="300" height="130" scrolling="no" /></div>');
});