/* Import Show-Hide JS */
 
importScriptPage('ShowHide/code.js', 'dev');
 

addOnloadHook(ToolsMenuItems);
 
/* Longer image titles in categories */
 
$(function () {$('.gallerytext a').each(function() {this.innerHTML = this.title;});})