/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

// NIEAKTYWNY UŻYTKOWNIK
InactiveUsers = { text: 'Zagubiony w Wielkim Lesie' };
importScriptPage('InactiveUsers/code.js', 'dev');
 
 
//Powrót do góry strony na pasku narzędzi
function ToTop() {
	$('.WikiaBarWrapper .tools')
		.append('<li style="border:none;float:right;"><a href="#top">Wróć do początku</a></li>')
};
addOnloadHook(ToTop);
 
 
//Nowe licencje, które będą bardziej użyteczne
var options = {
	'{{Licencji_brak}}': 'Licencja nieznana',
	'{{Książka}}': 'Grafika z książki',
	'{{Google}}': 'Grafika z Google Grafika',
	'{{By_User}}': 'Grafika przerobiona lub stworzona przez użytkownika',
	'{{CC-BY-SA}}': 'Creative Commons BY-SA',
	'{{Copyright}}': 'Grafika o zastrzeżonych prawach autorskich',
	'{{Fairuse}}': 'Plik używany zgodnie z zasadami dozwolonego użytku',
	'{{PD}}': 'Plik znajduje się w domenie publicznej',
	'{{Wikimedia}}': 'Plik z Wikipedii lub innego projektu Fundacji Wikimedia'
};
importArticles({
    type: "script",
    articles: [
	"u:pl.tes:MediaWiki:License.js"
   ]
});
 
//Zablokowanie możliwości pisania postów i komentarzy w przypadku przetwrminowania się postu-matki o określoną ilość czasu.
window.LockForums = {
    expiryDays: 30,
    expiryMessage: "Od 30 dni nie pojawiły się tutaj żadne nowe wpisy, więc temat został uznany za wyczerpany. Jeżeli uważasz inaczej, możesz założyć nowy wątek.",
    forumName: "Forum" 
};
 
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "Blog nie był komentowany od 30 dni, więc możliwość komentowania została wyłączona. Jeśli chcesz aby komentowanie zawsze było możliwe, dodaj kategorię „Blogi zawsze aktualne”.",
    nonexpiryCategory: "Blogi zawsze aktywne"
};