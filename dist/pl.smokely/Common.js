/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
// Szablon USERNAME
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 // Display 12 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = '%2I:%2M:%2S %p %2d %{Styczeń;Luty;Marzec;Kwiecień;Maj;Czerwiec;Lipiec;Sierpień;Wrzesień;Październik;Listopad;Grudzień}m %Y (UTC)';
importArticles({
	type: 'script',
	articles: [
		// ...
		'u:dev:DisplayClock/code.js',
		// ...
	]
});
importArticle({
  type: 'script',
  article: 'u:dev:FacebookLikeBox/code.js'
});

 
// Licencje
var options = {
        '{{PD}}': 'Plik znajduje się w domenie publicznej',
	'{{fairuse}}': 'Plik używany z zasadami dozwolonego użytku',
        '{{CC-BY-SA}}': 'Creative Commons BY-SA',
        '{{copyright}}': 'Zastrzeżone prawa autorskie',
        '{{Wikimedia}}': 'Plik z Wikipedii lub innego projektu Wikimedia',
        '{{Brak licencji}}': 'Prawa autorskie nieznane',
        '{{Fan Art}}': 'Rysunek własnego autorstwa' ,
};

/***Odznaczenia Trollbandu***/
rights ["Saphira2002"]                    = ["Trollband"]
rights ["Sky0001"]                        = ["Trollband"]
rights ["Anio%C5%82_Nadziei"]                  = ["Trollband"]