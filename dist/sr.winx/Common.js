/* Јаваскрипт постављен овде ће се користити за све кориснике при отварању сваке странице. */

AjaxRCRefreshText = 'Ауто-ажурирање';
AjaxRCRefreshHoverText = 'Укључи ауто-ажурирање за ову страницу';
ajaxPages = ["Посебно:СкорашњеИзмене","Посебно:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

importScript('MediaWiki:Common.js/DisplayTimer.js');
document.getElementsByName("search")[0].setAttribute("x-webkit-speech","x-webkit-speech");