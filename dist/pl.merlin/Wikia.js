/* Umieszczony tutaj kod JavaScript zostanie załadowany wyłącznie przez użytkowników korzystających ze skórki Wikia */
/* Umieszczony tutaj kod JavaScript zostanie załadowany wyłącznie przez użytkowników korzystających ze skórki Wikia */
var SocialMediaButtonsNamespaces = [0, 6, 14, 500];
var SocialMediaButtons = { 
	position: "bottom",
	colorScheme: "color",
	buttonSize: "35px",
	wikiTwitterAccount: "wikia_es"
};
importScriptPage('SocialIcons/code.js','dev');
 
/* Prueba para enlaces interlanguage */
$(function(){
     if ($('#Interlinks').length ) {
            $('#WikiaRail').append('<section class="InterModule module" id="InterModule"><h1>Otros idiomas</h1><ul>' + $('#Interlinks').html() + '</ul></section>');
     }
});
 
/* Cambio de background, modificado por Bola en dos partes, primero para alternar 6 backgrounds diferentes durante 1 hora y una segunda parte para alternar entre 7 clases diferentes dependiendo del día de la semana. */
 
// Primera parte - 6 backgrounds durante 1 hora
$(function () {
 var d = new Date();
 if (d.getMinutes() < 10) {
  document.body.className += ' BG1';
 } 
 else if (d.getMinutes() < 20) {
  document.body.className += ' BG2';
 } 
 else if (d.getMinutes() < 30) {
  document.body.className += ' BG3';
 } 
 else if (d.getMinutes() < 40) {
  document.body.className += ' BG4';
 } 
 else if (d.getMinutes() < 50) {
  document.body.className += ' BG5';
 } 
 else if (d.getMinutes() < 60) {
  document.body.className += ' BG6';
 } 
});
// Fin primera parte
 
 
// Comienzo de segunda parte - 7 clases durante una semana
$(function () {
 if ($('#EditPageRail').length ) {
  var day = new Date().getDay();
  switch (day) {
   case 0:
    document.getElementById('EditPageRail').className += ' EditPageRailAlt1'; 
    break;
   case 1:
    document.getElementById('EditPageRail').className += ' EditPageRailAlt2';  
    break;
   case 2:
    document.getElementById('EditPageRail').className += ' EditPageRailAlt3'; 
    break;
   case 3:
    document.getElementById('EditPageRail').className += ' EditPageRailAlt4'; 
    break;
   case 4:
    document.getElementById('EditPageRail').className += ' EditPageRailAlt5'; 
    break;
   case 5:
    document.getElementById('EditPageRail').className += ' EditPageRailAlt6'; 
    break;
   case 6:
    document.getElementById('EditPageRail').className += ' EditPageRailAlt7'; 
    break;
   }
 }
});
// Fin de segunda parte