/* Any JavaScript here will be loaded for all users on every page load. */
window.highlight = {
    selectAll: false,
    rollback: '1E90FF',
    chatmoderator: 'FFFF00',
    sysop: '00FF00',
    bureaucrat: 'FF00FF'
};

window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }, (The last line doesn't need a comma
		// at the end but all the others do)
        overall: { u:'Overall Authority' },
        primary: { u:'Primary Authority' },
        secondary: {u:'Secondary Authority' },
        dub: { u:'Dub Enthusiast' },
        discordpup: { u: 'Discord Pup' },
        synopsis: { u:'Synopsis Writer' }
	}
};

UserTagsJS.modules.custom = {
    // 'username': ['tag'], (The last line doesn't need
    // a comma at the end but all the other do)
    'SirBlaze': ['overall'],
    'Tbrays30': ['primary'],
    'Pablor': ['primary'],
    'MarshallsiAnjingBomba': ['dub'] ['primary'],
    'SonictheHedgehog1245': ['synopsis'] ['secondary'],
    'TopBanter': ['primary'],
    'Afrojack29': ['secondary'],
    'RockyEco-pup': ['secondary'],
    'TheLazyCat': ['discordpup']
};

/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
 
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];