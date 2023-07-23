// Horario

$(function () {
 var d = new Date();
 if (d.getHours() < 6) {
  document.body.className += ' BG1';
  document.getElementById('WikiaPage').className += ' BG1-page';
 } 
 else if (d.getHours() < 13) {
  document.body.className += ' BG2';
  document.getElementById('WikiaPage').className += ' BG2-page';
 } 
 else if (d.getHours() < 16) {
  document.body.className += ' BG3';
  document.getElementById('WikiaPage').className += ' BG3-page';
 }
else if (d.getHours() < 18) {
  document.body.className += ' BG4';
  document.getElementById('WikiaPage').className += ' BG4-page';
 } 
 else if (d.getHours() < 19) {
  document.body.className += ' BG5';
  document.getElementById('WikiaPage').className += ' BG5-page';
 } 
 else if (d.getHours() < 21) {
  document.body.className += ' BG6';
  document.getElementById('WikiaPage').className += ' BG6-page';
 } 
 else if (d.getHours() < 24) {
  document.body.className += ' BG7';
  document.getElementById('WikiaPage').className += ' BG7-page';
 }
});
 
$('body').append('<div class="WikiaPageBackgroundSub" id="WikiaPageBackgroundSub"><div>');