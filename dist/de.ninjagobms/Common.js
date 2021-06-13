/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

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
            title: "Unser Discord-Server",
            id: "/* 265855773123411969 */"
        }
    };
}


window.railWAM = {
    logPage:"Project:WAM Log"
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:DiscussionsRailModule/code.js',
        'u:dev:MediaWiki:ThemeToggler.js',
    ]
});

window.SpoilerAlertJS = {
    question: 'This area contains spoilers. Do you want to continue?',
    yes: 'Of course!',
    no: 'Nope',
    fadeDelay: 1000
};