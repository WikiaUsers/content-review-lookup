var wikiCodeWarn = getWikiCookie('wikiCodeWarnCookie', 0);
$(function(){
    if (wikiCodeWarn != 1) {
        if (wgNamespaceNumber == 8) {
	    var $userWelcomeBox = $.showCustomModal("Przeglądasz Stronę z Kodem!", '<p>Uwaga! Znajdujesz się na stronie, gdzie przechowywany jest kod javascript lub css używany przez naszą wiki, aby wszystko działało tak, jak należy. Nie jest to najlepsze miejsce do nauki, a tym bardziej nie jest to publiczna ściągarnia kodów. Przed przepisaniem kodu na swoją wiki wypadałoby zapytać się <a href="http://pl.creepypasta.wikia.com/wiki/User:Pan_Cube">administratora</a> o pozwolenie na przepisanie kodu. Jednak, nie powinieneś praktykować kopiowania i wklejania kodu. Tylko narobisz sobie kłopotu z obsługą i dostosowaniem do swoich potrzeb. Naucz się używać kodu <a href="http://w3schools.com/">tutaj</a>.</p></div>', {
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