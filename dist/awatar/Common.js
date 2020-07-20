InactiveUsers = { text: 'nieaktywny' };
window.RevealAnonIP = {
    permissions:    [
        'bureaucrat',
        'sysop'
    ]
};
var AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: false
};
function ToTop() {
	$('.WikiaBarWrapper .tools')
		.append('<li style="border:none;float:right;"><a href="#top">Powrót do góry</a></li>')
};
addOnloadHook(ToTop);
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 $(function() {
	if( $( '.wds-community-header' ).length ) {
		$( '#PageHeader' ).prepend(
		$( '#icons' ).attr( 'style', 'position: absolute; right: 65px;' )
	);
	} else {
		$( '.WikiaPageHeader' ).append( $( '#icons' ) );
		$( '#icons' ).css( { 'position' : 'absolute', 'right' : '5.1em', 'bottom' : '-2em' } ).show();
}
});
 
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
	'{{Brak_licencji}}': 'Nie znam licencji',
	'{{Kadr (Aang)}}': 'Plik będący kadrem z serialu "Awatar: Legenda Aanga"',
	'{{Kadr (Korra)}}': 'Plik będący kadrem z serialu "Legenda Korry"',
	'{{Komiks}}': 'Plik będący zdjęciem z komiksu',
	'{{Art}}': 'Plik będący oficjalnym artem związanym z serią',
	'{{CC-BY-SA}}': 'Creative Commons BY-SA',
	'{{Copyright}}': 'Grafika o zastrzeżonych prawach autorskich',
	'{{Fairuse}}': 'Plik używany zgodnie z zasadami dozwolonego użytku',
	'{{PD}}': 'Plik znajduje się w domenie publicznej',
	'{{Wikimedia}}': 'Plik z Wikipedii lub innego projektu Fundacji Wikimedia'
};
importArticles({
    type: "script",
    articles: [
	"u:pl.tes:MediaWiki:APIQuery.js",
	"u:pl.tes:MediaWiki:Licenses.js"
   ]
});

/*---*/

if(mw.config.get('wgNamespaceNumber') == 4) {
        $('.WikiaPageHeader h1').html('<strong>Awatar Wiki:</strong>' + mw.config.get('wgTitle')).after('<h2><a href="/wiki/' + mw.config.get('wgPageName').replace('Awatar Wiki:','') + '"></a></h2>');
}

if(mw.config.get('wgNamespaceNumber') == 112) {
        $('.WikiaPageHeader h1').html('<strong>Relacje:</strong>' + mw.config.get('wgTitle')).after('<h2><a href="/wiki/' + mw.config.get('wgPageName').replace('Relacje:','') + '"></a></h2>');
}

if(mw.config.get('wgNamespaceNumber') == 114) {
        $('.WikiaPageHeader h1').html('<strong>Film:</strong>' + mw.config.get('wgTitle')).after('<h2><a href="/wiki/' + mw.config.get('wgPageName').replace('Film:','') + '"></a></h2>');
}

if(mw.config.get('wgNamespaceNumber') == 116) {
        $('.WikiaPageHeader h1').html('<strong>Transkrypt:</strong>' + mw.config.get('wgTitle')).after('<h2><a href="/wiki/' + mw.config.get('wgPageName').replace('Transkrypt:','') + '"></a></h2>');
}
// *************************************************
// Pagetitle rewrite
//
// Rewrites the page's title, used by Template:Title
// *************************************************
    $(function(){
	var newTitle = $("#title-meta").html();
	if (!newTitle) return;
	var edits = $("#user_masthead_since").text();
	$(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
	$(".#user_masthead_head h2").html(newTitle + "<small id='user_masthead_since'>" + edits + "</small>");
});