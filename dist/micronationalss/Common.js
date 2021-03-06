/* Any JavaScript here will be loaded for all users on every page load. */
// Display 12 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = '%2I:%2M:%2S %p %2d %{January;February;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)';

window.UserTagsJS = {
	modules: {},
	tags: {
        monthuser: { u:'User of the Month'},
	},
	oasisPlaceBefore: ''
};

UserTagsJS.modules.custom = {
	'EnochChung123': ['monthuser']
};

UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'chatmoderator', 'patroller'];

importArticles({
	type:'script',
	articles: [
		'u:dev:UserTags/code.js',
		'u:dev:DisplayClock/code.js',
		'u:dev:Countdown/code.js'
	]
});