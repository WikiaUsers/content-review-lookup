/** Username replace function ([[Template:USERNAME]]) *******************************
  * Inserts user name into <span class="insertusername"></span>
  * Originally by User:Splarka
  * New version by User:Spang
  * Fixed with JS provided by User:Grunny, thanks!
  */
 
 function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $('.insertusername').html(wgUserName); }
 addOnloadHook(UserNameReplace);

function emptyLicenseAlert(form) {
	var msg = "Uwaga! W czasie dodawania nowej grafiki do Legopedii nie wybrałaś/wybrałes odpowiedniej licencji dotyczącej praw autorskich. W przyszłości prosimy o wybieranie odpowiedniej licencji dla każdej nowej grafiki, ponieważ grafika bez licencji może zostać usunieta. Więcej na temat naszej polityki  dotyczących praw autorskich możesz przeczytać [[Legopedia:Prawa autorskie|tutaj]]." 
	if(window.emptyLicenseWarningDelivered) return true;
	if($('#wpLicense').val() == '') {
		alert(msg);
		window.emptyLicenseWarningDelivered = true
		return false
	}
	return true;
}
$('#mw-upload-form').submit(function(e) {return emptyLicenseAlert(this);});