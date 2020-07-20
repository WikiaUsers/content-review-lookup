// **************************************************
// Fondo cambiante cada 5 minutos
// **************************************************
$(function () {
 var d = new Date();
 if (d.getMinutes() < 5) {
  document.body.className += ' BG1';
 } 
 else if (d.getMinutes() < 10) {
  document.body.className += ' BG2';
 } 
 else if (d.getMinutes() < 15) {
  document.body.className += ' BG3';
} 
 else if (d.getMinutes() < 20) {
  document.body.className += ' BG4';
} 
 else if (d.getMinutes() < 25) {
  document.body.className += ' BG5';
 } 
else if (d.getMinutes() < 30) {
  document.body.className += ' BG6';
} 
else if (d.getMinutes() < 35) {
  document.body.className += ' BG7';
} 
 else if (d.getMinutes() < 40) {
  document.body.className += ' BG8';
} 
 else if (d.getMinutes() < 45) {
  document.body.className += ' BG9';
 } 
 else if (d.getMinutes() < 50) {
  document.body.className += ' BG10';
} 
else if (d.getMinutes() < 55) {
  document.body.className += ' BG11';
 } 
else if (d.getMinutes() < 60) {
  document.body.className += ' BG12';
 } 
});
// **************************************************
// Fin de fondo cambiante
// **************************************************
var SocialMediaButtonsNamespaces = [0, 6, 14, 500];
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color",
	buttonSize: "35px",
        wikiTwitterAccount: "wikia_es"
};
importScriptPage('SocialIcons/code.js','dev');