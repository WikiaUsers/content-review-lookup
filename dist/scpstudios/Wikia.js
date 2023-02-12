// SFWModule2
pagesOnWikiModule = document.getElementsByClassName('WikiaPagesOnWikiModule')[0];
var sfwModule2 = document.createElement("section");
sfwModule2.className = "module";
sfwModule2.id = "sfwModule2";
sfwModule2.innerHTML = '<div id="sfwModule2Frame"></div>';
sfwModule2.style.padding = "0";
WikiaRail.insertBefore(sfwModule2,pagesOnWikiModule);
$("#sfwModule2Frame").load("http://scpstudios.wikia.com/wiki/MediaWiki:SFWModule2?action=render");
// End SFWModule2

// Back to top Button
var btt = document.createElement("a");
btt.className = "wikia-button";
btt.id = "BackToTop";
btt.href = "#";
btt.innerHTML = "Back to top";
document.getElementsByClassName('header-container')[0].appendChild(btt);
// End Back to top Button

// Chat Hacks
importScriptPage('User:Monchoman45/ChatHacks.js', 'c'); 
// End Chat Hacks

// Chat Logger
importScriptPage('User:Joeytje50/ChatLogger.js', 'runescape');
// End Chat Logger