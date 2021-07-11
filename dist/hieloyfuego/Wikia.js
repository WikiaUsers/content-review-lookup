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

// Añadiendo el enlace para discusiones en el panel de navegación
$(function () {
	var a = $('<a></a>').text('Discusiones').attr({'class':'subnav-2a', title:'Acceder a la página de discusiones', href:'http://hieloyfuego.wikia.com/d/f', id:'discussions-menuitem'}).wrap('<li></li>');
	$('#WikiHeader').children('nav').children('ul').children('li').eq(0).children('ul').append(a.parent());
});