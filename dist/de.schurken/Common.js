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

if(mw.config.get('wgUserName')) {
    window.DiscordIntegratorConfig = {
        siderail: {
            title: "Konferenz des B�sen",
            id: "318015848365162497"
        }
    };
}