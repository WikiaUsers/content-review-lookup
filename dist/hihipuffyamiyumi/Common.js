/* Any JavaScript here will be loaded for all users on every page load. */
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 30;
window.lockOldComments.addNoteAbove = true;

UserTagsJS.modules.inactive = {
	days: 5,
	namespaces: [0], // Edits must be to articles, others don't count whatsoever
	zeroIsInactive: true // 0 article edits => inactive
};

UserTagsJS.modules.nonuser = true;