/* Any JavaScript here will be loaded for all users on every page load. */
 
highlight = {
    selectAll: false,
    rollback: '1E90FF',
    chatmoderator: 'FFFF00',
    sysop: '00FF00',
    bureaucrat: 'FF00FF'
}
 
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }, (The last line doesn't need a comma at the end but all the other do)
		headhoncho: { u:'Head Honcho' },
		dontmess: { u:'Don't Mess With This Guy' }
	}
};
 
UserTagsJS.modules.custom = {
        // 'username': ['tag'], (The last line doesn't need a comma at the end but all the other do)
	'SirBlaze': ['dontmess'],
        'BigTeddy': ['headhoncho']
 
};
 
 
importArticles({
    type: "script",
    articles: [
        "u:dev:HighlightUsers/code.js",
        "w:c:dev:Countdown/code.js",
	'w:c:dev:UserTags/code.js',
	'u:dev:DisplayClock/code.js',
    ]
});