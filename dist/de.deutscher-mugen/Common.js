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

window.UserTagsJS = {
	modules: {},
	tags: {
		fmib: 'Team Faust Games',
	}
};

// Add custom groups to several users
UserTagsJS.modules.custom = {
	'FistMan_Is_Back': ['fmib'],

};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:YoutubePlayer/code.js'
    ]
});