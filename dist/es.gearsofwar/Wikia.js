// Permite añadir cada 10 minutos una clase diferente al fondo - por Bola
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