UserTagsJS.modules.newuser = {
	namespace: 0, // [Optional] Edits must be made to articles to count
	computation: function(days, edits) {
		// If the expression is true then they will be marked as a new user
		// If the expression is false then they won't
		// In this example, newuser is removed as soon as the user gets 30 edits, OR as soon as they have been present for 10 days, whichever happens first
		return days < 10 && edits < 30;
	}
};
window.UserTagsJS = {
	modules: {},
	tags: {
		'Founder': { link: Quickheal }
	}
};
UserTagsJS.modules.inactive = {
	days: 30,
	namespaces: [0],
	zeroIsInactive: true // 0 article edits = inactive
};
UserTagsJS.modules.custom = {
	'CrocERS': ['Founder'], // me
};
UserTagsJS.modules.implode = {
	'Double-Moderator': ['contentmoderator', 'threadmoderator'],
	'inactive-sysop': ['sysop', 'inactive'],
	'inacive-bureaucrat': ['bureaucrat', 'inactive']
};

window.AddRailModule = ['Template:Foo', 'Template:Bar', 'Template:Baz', 'Template:NewPagesModule'];