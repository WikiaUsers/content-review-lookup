/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */
if (mw.config.get('wgUserName')) {
    window.DiscordIntegratorConfig = {
        siderail: {
            title: "Discord-Server",
            id: "270627738447118337"
        }
    };
}

// Import [[MediaWiki:Onlyifuploading.js]] 
if ( wgCanonicalSpecialPageName == "Upload" ) {
    importScriptPage('MediaWiki:Onlyifuploading.js');
}

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

// RailWAM
window.railWAM = {
    logPage:"Project:WAM Log"
};
// - end - RailWAM