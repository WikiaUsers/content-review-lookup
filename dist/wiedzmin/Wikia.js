// Importy skryptów dotyczących skórki Oasis
importArticles( {
	type: 'script',
	articles: [
		'u:dev:MediaWiki:SeeMoreActivityButton/code.js',
		'u:dev:MediaWiki:DiscordChat.js',
		'u:dev:MediaWiki:RCStats.js',
		'u:dev:MediaWiki:SearchSuggest/code.js',
		'u:dev:MediaWiki:ReferencePopups/code.js',
	]
} );

// FACEBOOK WIDGET
$('body').append('<div id="fb-root"></div><script>(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;js = d.createElement(s); js.id = id;js.src = "//connect.facebook.net/pl_PL/all.js#xfbml=1";fjs.parentNode.insertBefore(js, fjs);}(document, \'script\', \'facebook-jssdk\'));</script>');
$(document).ready(function(){
	$("<div id='FacebookWnd'></div>").css({
		background:'url(\'/Special:Filepath/Facebook_(ramka).png\')',
		width:242,
		height:401,
		position:'fixed',
		top:150,
		right:-210,
		zIndex:310,
		}).appendTo('body');
	//Zawartość
	$('<div class="fb-page" data-href="https://www.facebook.com/wiedzminskawiki/" data-tabs="timeline" data-width="195" data-height="360" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/wiedzminskawiki/" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/wiedzminskawiki/">Wiedźmin Wiki</a></blockquote></div>').css({marginTop:"10px", marginLeft:"47px"}).appendTo("#FacebookWnd");
	$("#FacebookWnd").click(function(){
		toggleFacebookWnd();
	});
});
 
function toggleFacebookWnd() {
	if (parseInt($("#FacebookWnd").css("right"))!==0) $("#FacebookWnd").animate({right:"0px"}, 700);
	else $("#FacebookWnd").animate({right:"-210px"}, 700);
}


// Alert o braku licencji dla plików
function emptyLicenseAlert(form) {
	var msg = 'Licencja pliku nie została wybrana. Możesz spróbować ponownie, ale pamiętaj, że pliki bez licencji będą usuwane.'
	if (window.emptyLicenseWarningDelivered) return true;
	if ($('#wpLicense').val() === '') {
		alert(msg);
		window.emptyLicenseWarningDelivered = true
		return false
	}
	return true;
}
$('#mw-upload-form').submit(function (e) { return emptyLicenseAlert(this); });

// Konfigi
window.SeeMoreActivityButtonRC = true;
InactiveUsers = { 
	months: 1,
	text: 'Nieaktywny'
};