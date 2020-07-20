/* Il codice JavaScript inserito qui viene caricato da ciascuna pagina, per tutti gli utenti. */

AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Speciale:UltimeModifiche","Speciale:WikiActivity","Speciale:Contributi","Speciale:Watchlist"]; 

/* usertags */
window.UserTagsJS = {
	modules: {},
	tags: {
		Loreeditor: { u:'Lore' },
	}
};

UserTagsJS.modules.custom = {
	'Ciauo': ['Loreeditor'], 
	'Alexthw': ['Loreeditor'],
	'SimemaBlak': ['Loreeditor'],
};

/* Js generici: Rivela IP anonimi, BacktoTop bottone, bottone di refresh per pagine, ultimo edit pagina */
importArticles({
    type: 'script',
    articles: [
        'u:dev:RevealAnonIP/code.js',
        'u:dev:BackToTopButton/code.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:MediaWiki:PurgeButton/code.js',
        'u:dev:MediaWiki:YoutubePlayer/code.js',
        'u:dev:LastEdited/code.js',
        'u:dev:PurgeButton/code.js',
        'w:c:dev:UserTags/code.js',
        'u:dev:AjaxBatchDelete/code.2.js'
    ]
});