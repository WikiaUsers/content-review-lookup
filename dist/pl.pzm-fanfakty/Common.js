/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

importArticles({
    type: "script",
    articles: [
// Strony wewnętrzne
    "MediaWiki:Common.js/userRightsIcons.js",           /* Opisy grup userów w profilu użytkownika + Info o nieaktywności */
// Strony zewnętrzne
    "u:dev:DupImageList/code.js",                       /* Lista duplikatów obrazków */
    "u:dev:SearchSuggest/code.js",                      /* Sugestie do wyników wyszukiwania */
    "u:dev:WallGreetingButton/code.js",                 /* Przycisk edytowania powitania na Tablicy */
    "u:dev:View_Source/code.js",                        /* Dodaje przycisk "Tekst źródłowy" */
    "u:dev:PurgeButton/code.js",
    "w:c:pl.elderscrolls:MediaWiki:Gadget-searchopt.js"
    ]
});

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


//Made by Ofkorse
$("body").append('<div id="fb-root"></div><script>(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;js = d.createElement(s); js.id = id;js.src = "//connect.facebook.net/pl_PL/all.js#xfbml=1";fjs.parentNode.insertBefore(js, fjs);}(document, \'script\', \'facebook-jssdk\'));</script>');
$(document).ready(function(){
        $("<div id='FacebookWnd'></div>").css({
                background:'url(https://www.facebook.com/pages/Pingwiny-z-Madagaskaru-FanFakty-Wiki/541896232556589?ref=stream)',
                width:242,
                height:401,
                position:'fixed',
                top:150,
                right:-210,
                zIndex:300}).appendTo("body");
        //Zawartość
        $('<div class="fb-like-box" data-href="https://https://www.facebook.com/pages/Pingwiny-z-Madagaskaru-FanFakty-Wiki/541896232556589?fref=ts" data-width="185" data-height="361" data-show-faces="true" data-stream="false" data-header="false"></div>').css({marginTop:"10px", marginLeft:"47px"}).appendTo("#FacebookWnd");
        $("#FacebookWnd").click(function(){
                toggleFacebookWnd();
        });
});
 
function toggleFacebookWnd() {
	setTimeout(function(){
		if (FACEBOOK_HOVER) $("#FacebookWnd").animate({right:"-40px"}, 700);
		else $("#FacebookWnd").animate({right:"-320px"}, 700);
	}, 100);
}