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