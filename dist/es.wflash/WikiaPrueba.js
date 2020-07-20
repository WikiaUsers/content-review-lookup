// *****************************************************************
// 12 backgrounds durante todo el día (idea tomada de es.gta.wikia) 
// *****************************************************************
$(function () {
 var d = new Date();
 if (d.getHours() < 2) {
  document.body.className += ' BG1';
  document.getElementById('WikiaPage').className += ' BG1-page';
 } 
 else if (d.getHours() < 4) {
  document.body.className += ' BG2';
  document.getElementById('WikiaPage').className += ' BG2-page';
 } 
 else if (d.getHours() < 6) {
  document.body.className += ' BG3';
  document.getElementById('WikiaPage').className += ' BG3-page';
 } 
  else if (d.getHours() < 8) {
  document.body.className += ' BG4';
  document.getElementById('WikiaPage').className += ' BG4-page';
 } 
  else if (d.getHours() < 10) {
  document.body.className += ' BG5';
  document.getElementById('WikiaPage').className += ' BG5-page';
 } 
  else if (d.getHours() < 12) {
  document.body.className += ' BG6';
  document.getElementById('WikiaPage').className += ' BG6-page';
 } 
  else if (d.getHours() < 14) {
  document.body.className += ' BG7';
  document.getElementById('WikiaPage').className += ' BG7-page';
 } 
  else if (d.getHours() < 16) {
  document.body.className += ' BG8';
  document.getElementById('WikiaPage').className += ' BG8-page';
 } 
 else if (d.getHours() < 18) {
  document.body.className += ' BG9';
  document.getElementById('WikiaPage').className += ' BG9-page';
 } 
  else if (d.getHours() < 20) {
  document.body.className += ' BG10';
  document.getElementById('WikiaPage').className += ' BG10-page';
 } 
 else if (d.getHours() < 22) {
  document.body.className += ' BG11';
  document.getElementById('WikiaPage').className += ' BG11-page';
 } 
 else if (d.getHours() < 24) {
  document.body.className += ' BG12';
  document.getElementById('WikiaPage').className += ' BG12-page';
 } 
});