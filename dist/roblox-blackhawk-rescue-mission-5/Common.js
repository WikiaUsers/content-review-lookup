/* Any JavaScript here will be loaded for all users on every page load. */
/* The Core Configuration and custom tag(s) for the UserTags script. */
window.UserTagsJS = {
	modules: {},
	tags: {
		developer: {
			u: 'PLATINUM FIVE Developer',
			title: 'This user is a verified PLATINUM FIVE Developer, responsible for developing the game.',
			order:-1/0
		}
	},
	oasisPlaceBefore: ''
};
UserTagsJS.modules.custom = {
	'ContemplationInChalk': ['developer'],
	'MB SNiper': ['developer']
}
/* The Configurations for the LockOldComments script. */
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 60;
window.lockOldComments.addNoteAbove = true;
window.lockOldComments.namespaceNumbers = [0];