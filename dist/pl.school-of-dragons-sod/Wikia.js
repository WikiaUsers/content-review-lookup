
// Licencje
var options = {
'{{Brak_licencji}}': 'Nie znam licencji',
'{{Screenshot}}': 'Screenshot z rozgrywki',	
'{{Fairuse}}': 'Plik używany zgodnie z zasadami dozwolonego użytku',
'{{CC-BY-SA}}': 'Creative Commons BY-SA',
'{{Copyright}}': 'Zastrzeżone prawa autorskie',
'{{PD}}': 'Plik znajduje się w domenie publicznej',
'{{Wikimedia}}': 'Plik z Wikipedii lub innego projektu Fundacji Wikimedia',
};
 // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // admini
  rights["Rory1345"]                    = ["Dyrektor"];

 
 
  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  if (typeof rights[wgTitle] != "undefined") {
    // Usunięcie poprzednich opisów grup
    $('.UserProfileMasthead .masthead-info span.group').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
$('<span class="tag" style="margin-left: 10px !important">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
    }
  }