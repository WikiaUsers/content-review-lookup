/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */
importArticles( { 
        type: 'script',
        articles: [
                'u:dev:AjaxRC/code.js'
        ]
});

/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */
 
importArticles({
    type: 'script',
    articles: [
         'u:dev:AjaxRC/code.js',
         'w:c:dev:UserTags/code.js',
    ]
});

/* Auto-Aktualisierung */

var ajaxPages = ["Spezial:Letzte_Änderungen", "Spezial:WikiActivity"];
var AjaxRCRefreshText = 'Auto-Aktualisierung';

/* UserTags */

window.UserTagsJS = {
	modules: {},
	tags: {
		montheditor: { u:'User des Monats', order:-1/0 },
		
	}
};