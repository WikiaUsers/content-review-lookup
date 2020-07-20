// {{USERNAME}}
// Autorzy: Originally by [[wikia:User:Splarka|Splarka]], then by [[User:Spang|Spang]], this (jQuery) version by [[wikia:User:Joeyaa]], written to be backwards compatible
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}

// Licencje plików
var LicenseOptions = {
   '{{Brak_licencji}}': 'Nie znam licencji',
   '{{Fairuse}}': 'Plik używany zgodnie z zasadami dozwolonego użytku',
   '{{Art}}': 'Własny rysunek',
   '{{CC-BY-SA}}': 'Pliki na licencji Creative Commons',
   '{{Copyright}}': 'Zastrzeżone prawa autorskie',
   '{{PD}}': 'Plik znajduje się w domenie publicznej',
   '{{Wikimedia}}': 'Plik z Wikipedii lub innego projektu Fundacji Wikimedia'
};