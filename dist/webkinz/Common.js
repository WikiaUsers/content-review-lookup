importArticles({
	type:'script',
	articles: [
		// ...
		'w:c:dev:UserTags/code.js',
		// ...
	]
});
UserTagsJS.modules.inactive = {
	days: 30,
	namespaces: [0],
	zeroIsInactive: true // 0 article edits = inactive
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'bannedfromchat'];
UserTagsJS.modules.autoconfirmed = true; // Switch on
UserTagsJS.modules.newuser = {
	days: 5, // Must have been on the Wiki for 5 days
	edits: 10, // And have at least 10 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};
UserTagsJS.modules.newuser = {
	namespace: 0, // [Optional] Edits must be made to articles to count
	computation: function(days, edits) {
		// If the expression is true then they will be marked as a new user
		// If the expression is false then they won't.
		// In this example, newuser is removed as soon as the user gets 30 edits, OR as soon as they have been present for 10 days, whichever happens first
		return days < 10 && edits < 30;
	}
};
UserTagsJS.modules.implode = {
	'inactive-bureaucrat': ['bureaucrat', 'inactive'], // Adds 'inactive-bureaucrat' BUT also removes bureaucrat and inactive.
                                                           // i.e. Replaces bureaucrat and inactive with 'inactive-bureaucrat'
	'inactive-sysop': ['sysop', 'inactive'],
	'half-sysop': ['chatmoderator', 'patroller', 'rollback']
};
window.UserTagsJS = {
	modules: {},
	tags: {
		jshelper: { u: 'JavaScript' },
		csshelper: { u: 'CSS' },
		templatehelper: { u: 'Templates' }
	}
};
window.UserTagsJS = {
	modules: {},
	tags: {
		jshelper: { u: 'JavaScript', order: 100 },
		csshelper: { u: 'CSS', order: 101 },
		templatehelper: { u: 'Templates', order: 102 },
		bureaucrat: { order: 1 } // Normal order is 0
	}
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];

/* Username replace feature
 * Inserts viewing user's name into <span class="insertusername"></span>
 * Put text inside the spans to be viewed by logged out users
 * Originally by [[wikia:User:Splarka|Splarka]], then by [[User:Spang|Spang]],
 * This (jQuery) version by [[wikia:User:Joeyaa]], written to be backwards compatible
 */
 
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}