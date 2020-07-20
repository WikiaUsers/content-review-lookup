/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
 
 
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
 
/*    Replaces {{USERNAME}} with the name of the user browsing the page.    Requires copying Template:USERNAME. Zapożyczono z http://pl.swfanon.wikia.com/wiki/Strona_g%C5%82%C3%B3wna  */
 


function substUsername() {
    if (wgUserName) {
        $('.insertusername').text(wgUserName);
    }
}
 
function substUsernameTOC() {
    var toc = $('#toc');
    var userpage = $('#pt-userpage');
 
    if (!userpage || !toc)
    return;

    var username = $('#pt-userpage').children(':first-child').text();
    $('span.toctext:not(:has(*)), span.toctext i', toc).each(function() {
    $(this).text($(this).text().replace('<insert name here>', username));
    });
}