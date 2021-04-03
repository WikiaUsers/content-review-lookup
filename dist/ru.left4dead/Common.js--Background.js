/* Any JavaScript here will be loaded for all users on every page load. */

/* ДИНАМИЧНЫЙ ФОН --------------------------------- */

$(function () {
 var d = new Date();
 if (d.getHours() < 5) {
 document.body.className += ' BG4';
 }
 else if (d.getHours() < 10) {
 document.body.className += ' BG1';
 }
 else if (d.getHours() < 17) {
 document.body.className += ' BG2';
 }
 else if (d.getHours() < 22) {
 document.body.className += ' BG3';
 }
 else if (d.getHours() < 24) {
 document.body.className += ' BG4';
 }
});