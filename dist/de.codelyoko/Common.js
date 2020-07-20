/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

AjaxRCRefreshText = 'Aktualisiere Seite';
AjaxRCRefreshHoverText = 'Automatisch die Seite erneuern';
ajaxPages = ["Spezial:Letzte_Änderungen","Spezial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
importScript('MediaWiki:Common.js/DisplayTimer.js');
importScriptPage('Voice_Dictation/voice.js', 'dev');
importScriptPage('Translator/Translator.js', 'dev');
importScriptPage('Voice_Output/code.js', 'dev');
importScriptPage('PowerPageMaker/code.js', 'dev');

importScriptPage('ShowHide/code.js', 'dev');

var ShowHideConfig = { 
    autoCollapse: 3, 
    userLang: false, 
    en: {
	show: "anzeigen",
	hide: "ausblenden",
	showAll: "alle anzeigen",
	hideAll: "alle ausblenden"
    }
};