/* Import Show-Hide JS */
 
importScriptPage('ShowHide/code.js', 'dev');
 
/* add history, what links here, and skin change buttons to the menu */
function ToolsMenuItems() {
	$('section header nav ul li:nth-last-child(2) ul li:first-child').after('<li><a href="/index.php?title='+ encodeURIComponent(wgPageName) +'&action=history">History</a></li><li><a href="/wiki/Special:WhatLinksHere/'+ encodeURIComponent(wgPageName) +'">What Links here</a></li>');
	$('section header nav ul li:nth-last-child(2) ul li:nth-last-child(1)').after('<li><a href="/index.php?title='+ encodeURIComponent(wgPageName) +'&useskin=monobook" title="Change to Monobook">Monobook skin</a></li><li><a href="/index.php?title='+ encodeURIComponent(wgPageName) +'&useskin=vector" title="Change to Vector">Vector skin</a></li>');
}
 
addOnloadHook(ToolsMenuItems);
 
/* Longer image titles in categories */
 
$(function () {$('.gallerytext a').each(function() {this.innerHTML = this.title;});})