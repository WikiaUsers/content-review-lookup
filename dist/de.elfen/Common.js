/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

importScriptPage('ShowHide/code.js', 'dev');

/*importScriptPage('WikiaNotification/code.js', 'dev');
var WikiaNotificationMessage = "Willkommen im Elfen-Wiki!";
var WikiaNotificationexpiry = 20; */
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