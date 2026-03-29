/* help me! */
window.UserTagsJS = {
	modules: {},
	tags: {
		honourable: {u: "Honourable"},
		bureaucrat: {order:0},
		sysop: {order:1},
		bot: {order:2},
		'content-moderator': {order: 3},
		'threadmoderator': {order: 4},
	},
	oasisPlaceBefore: ''
};

UserTagsJS.modules.custom = {
	'GaviZa': ['honourable'],
	//'UserName1': ['honourable'],
}
/* Rail Module */
window.AddRailModule = [
    {page: 'Template:AdminList', prepend: true}
];
/* Any JavaScript here will be loaded for all users on every page load. */