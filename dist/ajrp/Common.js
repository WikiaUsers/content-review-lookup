//Replaces {{USERNAME}} with the name of the user browsing the page.
//For usage with Template:USERNAME.
$(function () {
    if (!wgUserName) return;
    $('span.insertusername').text(wgUserName);
});

/***Pin-Thread List***/
importScriptPage('MediaWiki:PinThreadList/code.js','dev');