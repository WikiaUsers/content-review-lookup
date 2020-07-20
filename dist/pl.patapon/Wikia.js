/* Kod JavaScript należący do Patapedii */
// Śnieg na wiki, aktywować tylko w święta :P
// importScriptPage('MediaWiki:Snow.js','c');

// DODATKOWE UPRAWNIENIA I PLAKIETKI

$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // RANGI
 
  rights["MaciekP42"]                     = ["Administrator"],
  rights["MightyPataponBot"]              = ["Bot"];

 
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

// PLIKI COOKIES
function setWikiCookie( cookie_name, data ) {
	var domain = wgServer.split("//")[1];
	document.cookie =
		cookie_name + "=" + data +
		"; max-age=" + 60*60*24*150 +
		"; path=/; domain=" + domain;
}
function getWikiCookie( cookie_name, pos ) {
	var x, y, cookie_array = document.cookie.split(";");
	for (var i=0; i < cookie_array.length; i++) {
		x = cookie_array[i].substr(0,cookie_array[i].indexOf("="));
		y = cookie_array[i].substr(cookie_array[i].indexOf("=")+1);
		x = x.replace(/^\s+|\s+$/g,"");
		if (x == cookie_name) {
			var style_objects = y.split(", ");
			return unescape(style_objects[pos]);
		}
	}
}

// SKRYPT NA KOMUNIKAT O KODZIE
var wikiCodeWarn = getWikiCookie('wikiCodeWarnCookie', 0);
$(function(){
    if (wikiCodeWarn != 1) {
        if (wgNamespaceNumber == 8) {
	    var $userWelcomeBox = $.showCustomModal("Przeglądasz Stronę z Kodem!", '<p>Uwaga! Znajdujesz się na stronie gdzie przechowywany jest kod javascript lub css używany przez naszą wiki aby wszystko działało tak jak należy. Nie jest to najlepsze miejsce do nauki a tym bardziej nie jest to publiczna ściągarnia kodów. Przed przepisaniem kodu na swoją wiki wypadałoby zapytać się <a href="http://pl.patapon.wikia.com/wiki/User:MaciekP42">administratora</a> o pozwolenie na przepisanie kodu. Jednak, nie powinieneś praktykować kopiowania i wklejania kodu. Tylko narobisz sobie kłopotu z obsługą i dostosowaniem do swoich potrzeb. Naucz się używać kodu <a href="http://w3schools.com/">tutaj</a>.</p></div>', {
            id: "userWelcomeBox",
            width: 600,
            buttons: [
            {
                id: "submit-not-show",
                defaultButton: false,
                message: "Nie pokazuj więcej",
                handler: function() {
                   wikiCodeWarn = 1;
                   setTheWikiCookies(); 
                }
            },
            {
                id: "submit",
                defaultButton: true,
                message: "Ok, Rozumiem",
                handler: function() {
                   $('#userWelcomeBox').closeModal(); 
                }
            }
            ]
        });
	}
    }
});
function cancelWelcomeBox(){
    $('#userWelcomeBox').closeModal(); 
    //window.location('http://pl.wikia.com');
}
function setTheWikiCookies() {
    setWikiCookie('wikiCodeWarnCookie', wikiCodeWarn); 
}

// Kod na dodanie prośby o zapoznanie się z FAQ kiedy piszemy nową wiadomość
$(function(){
    if(wgNamespaceNumber == 2000){
        $('.heading').append('<br /><br /><i>Prosimy aby wątek był oryginalny. Zanim zadasz pytanie przeszukaj forum i zapoznaj się z <a href="http://pl.patapon.wikia.com/wiki/Patapedia:FAQ">FAQ</a></i>');
    }
});

// Grzeczna prośba o rejestracje
var noRegister = getWikiCookie('wikiRegisterInfoCookie', 0);
$(function(){
    if(noRegister != 1){
	    if(wgUserName == null){
		    $('.WikiaPageContentWrapper').prepend('&nbsp<div id="registerAccountInfo" style="text-align:center;width: 100%;">Wygląda na to, że wciąż nie masz konta. W takim razie, <a href="/wiki/Specjalna:Zaloguj">Zaloguj Się</a> lub <a href="/wiki/Specjalna:Zarejestruj">Zarejestruj</a> (<a href="/wiki/Patapedia:Konto">Dowiedz się więcej...</a>)(<a href="#" onclick="hideRegisterInfo();">Nie Pokazuj</a>)</div>');
		}
	}
});
function hideRegisterInfo(){
    $('#registerAccountInfo').hide(500);
	noRegister = 1;
	setWikiCookie('wikiRegisterInfoCookie', noRegister);
}