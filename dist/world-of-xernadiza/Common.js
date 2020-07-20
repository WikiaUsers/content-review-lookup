/* Any JavaScript here will be loaded for all users on every page load. */

/* Ajax Auto-Refresh (courtesy pcj) */
/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
 
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');


/* UserTags */
window.UserTagsJS = {
	modules: {},
	tags: {},
	oasisPlaceBefore: ''
};

UserTagsJS.modules.autoconfirmed = true; // Switch on

window.UserTagsJS = {
    modules: {},
    tags: {
        
        queen: { u: 'queen of haven' },
        princess: { u: 'princess of haven' },
        kingc:{ u: 'king-consort of haven' },
        lordp: { u: 'lord protector' }, 
        captr: { u: 'captain of the royal guard' },
        royals: { u: 'royal steward' },
        primem: { u: 'prime minister' },
        statemin: { u: 'state minister' },
        foremin: { u: 'foreign minster' },
        royala: { u: 'royal archive' },
        defmin: { u: 'defense minister' },
        ecomin: { u: 'economy minister' },
        lorda: { u: 'lord admiral' },
        ladya: { u: 'lady admiral' },
        lordm: { u: 'lord marshal' },
        ladym: { u: 'lady marshal' },

    }
};

UserTagsJS.modules.custom = {
	'Annytin': ['queen'], // Add Queen of Haven
	'Zenobia Kinover-Mar': ['princess'], // Add Princess of Haven
	'namegoeshere1' : ['kingc'], // Add King-Consort of Haven
	'Rome Vanhart': ['lordp'], // Add Lord Protector
	'ngh3': ['captr'], // Add Captain of the Royal Guard
	'namegoeshere': ['primem'], // Add Prime Minister
	
};

// RevealAnonIP //
importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
        ]
});