/* Jedes JavaScript hier wird f�r alle Benutzer f�r jede Seite geladen. */

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

js:
if (wgUserName !== null) {
	$('.insertusername').html(wgUserName);
}
Vorlage:
<span class=insertusername>{{{1|}}}</span>