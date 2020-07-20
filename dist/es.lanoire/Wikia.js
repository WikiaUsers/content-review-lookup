$('body.ns-116 .WikiHeader .wordmark.graphic ').bind('click.cabecera', function(){ window.location.href = 'http://es.lanoire.wikia.com/wiki/Diario:Portada'; return false; });

$(function(){
  if ( window.wgAction == 'edit' )
  $(".WikiaMainContent").css("width", "1000px").css("padding", "0px");
});

/* Background cambiante cada 10 minutos por Ciencia Al Poder, modificado por Bola */
(function () {
 var d = new Date();
 if (d.getMinutes() < 5) {
  try {
   document.body.className += ' BG1';
  } catch( e ) {
   (typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function(){$(document.body).addClass(' BG1')});
  }
 }
 else if (d.getMinutes() < 10) {
  try {
   document.body.className += ' BG2';
  } catch( e ) {
   (typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function(){$(document.body).addClass(' BG2')});
  }
 }
 else if (d.getMinutes() < 15) {
  try {
   document.body.className += ' BG3';
  } catch( e ) {
   (typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function(){$(document.body).addClass(' BG3')});
  }
 }
 else if (d.getMinutes() < 20) {
  try {
   document.body.className += ' BG4';
  } catch( e ) {
   (typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function(){$(document.body).addClass(' BG4')});
  }
 }
 else if (d.getMinutes() < 25) {
  try {
   document.body.className += ' BG5';
  } catch( e ) {
   (typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function(){$(document.body).addClass(' BG5')});
  }
 }
 else if (d.getMinutes() < 30) {
  try {
   document.body.className += ' BG6';
  } catch( e ) {
   (typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function(){$(document.body).addClass(' BG6')});
  }
 }
else if (d.getMinutes() < 35) {
  try {
   document.body.className += ' BG7';
  } catch( e ) {
   (typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function(){$(document.body).addClass(' BG7')});
  }
 }
 else if (d.getMinutes() < 40) {
  try {
   document.body.className += ' BG8';
  } catch( e ) {
   (typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function(){$(document.body).addClass(' BG8')});
  }
 }
 else if (d.getMinutes() < 45) {
  try {
   document.body.className += ' BG9';
  } catch( e ) {
   (typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function(){$(document.body).addClass(' BG9')});
  }
 }
 else if (d.getMinutes() < 50) {
  try {
   document.body.className += ' BG10';
  } catch( e ) {
   (typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function(){$(document.body).addClass(' BG10')});
  }
 }
 else if (d.getMinutes() < 55) {
  try {
   document.body.className += ' BG11';
  } catch( e ) {
   (typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function(){$(document.body).addClass(' BG11')});
  }
 }
 else if (d.getMinutes() < 60) {
  try {
   document.body.className += ' BG12';
  } catch( e ) {
   (typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function(){$(document.body).addClass(' BG12')});
  }
 }
}());
function FondoFooter() {
 $('#globalWrapper').append($('#footer'));
}
(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(FondoFooter);
/* fin alternateBG */

// Comienzo de segunda parte - 7 clases durante una semana
 var day = new Date().getDay();
 switch (day) {
  case 0:
  try {
   document.getElementById('EditPageRail').className += ' EditPageRailAlt1'; 
  } catch( e ) {
   (typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function(){$(document.getElementById('EditPageRail')).addClass(' EditPageRailAlt1')});
  }
  break;
  case 1:
  try {
   document.getElementById('EditPageRail').className += ' EditPageRailAlt2'; 
  } catch( e ) {
   (typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function(){$(document.getElementById('EditPageRail')).addClass(' EditPageRailAlt2')});
  }
  break;
  case 2:
  try {
   document.getElementById('EditPageRail').className += ' EditPageRailAlt3'; 
  } catch( e ) {
   (typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function(){$(document.getElementById('EditPageRail')).addClass(' EditPageRailAlt3')});
  }
  break;
  case 3:
  try {
   document.getElementById('EditPageRail').className += ' EditPageRailAlt4'; 
  } catch( e ) {
   (typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function(){$(document.getElementById('EditPageRail')).addClass(' EditPageRailAlt4')});
  }
  break;
  case 4:
  try {
   document.getElementById('EditPageRail').className += ' EditPageRailAlt5'; 
  } catch( e ) {
   (typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function(){$(document.getElementById('EditPageRail')).addClass(' EditPageRailAlt5')});
  }
  break;
  case 5:
  try {
   document.getElementById('EditPageRail').className += ' EditPageRailAlt6'; 
  } catch( e ) {
   (typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function(){$(document.getElementById('EditPageRail')).addClass(' EditPageRailAlt6')});
  }
  break;
  case 6:
  try {
   document.getElementById('EditPageRail').className += ' EditPageRailAlt7'; 
  } catch( e ) {
   (typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function(){$(document.getElementById('EditPageRail')).addClass(' EditPageRailAlt7')});
  }
  break;
  }
(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(FondoFooter);
// Fin de segunda parte