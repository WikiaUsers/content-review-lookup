/* Umieszczony tutaj kod JavaScript zostanie załadowany wyłącznie przez użytkowników korzystających ze skórki Wikia */

$(function() {
  var rights = {};
 
  // Plakietki na profilach użytkowników
 
    // oryginalne
 
  rights["LynnDarcy"]                   = [""],
  rights["Njs55"]                       = ["RYSIEK...A BU!"],
  rights["Lolit"]                       = ["Wiki Slender XD"],
  rights["Cyrkulatka999"]               = ["ROBACTWO!"],
  rights["HayLin656"]                   = ["♥światem żądzą szemszy♥"],
  rights["Ewelinatynicponiu"]           = ["Sex Bomb"],
  rights["TuptuśLordVanKotlecik123456"] = ["Szef wszystkich szefów"],
  rights["Domaaa"]                      = ["Nie kumata"];

  // Koniec listy użytkowników ze specjalnymi plakietkami
 
  if (typeof rights[wgTitle] != "undefined") {
    // Usunięcie poprzednich opisów grup
    $('.UserProfileMasthead .masthead-info span.group').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
$('<span class="tag" style="margin-left: 12px !important">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
    }
  }
});
 
// </source>