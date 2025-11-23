/* Any JavaScript here will be loaded for all users on every page load. */

/*MessageBlock*/
(window.MessageBlock = window.MessageBlock || {}).autocheck = true;
window.MessageBlock = {
	title: 'Blocked',
	message: 'You have been blocked from the Plumber Pack wiki for $2 for $1. Please use this time to think about your behavior and change for the better.'
};
/*BacktoTop*/
window.BackToTopArrow = true;
window.BackToTopModern = true;
/*UserBoxes*/
/*Blocked*/
UserTagsJS.modules.autoconfirmed = true; // Switch on
UserTagsJS.modules.stopblocked = false; // Manually turn off
UserTagsJS.modules.isblocked = false;
/*Inactive*/
UserTagsJS.modules.inactive = {
	days: 30,
	namespaces: [0, 'Talk', 'User talk', 'Forum'] 
};
/*New User*/
UserTagsJS.modules.newuser = {
	days: 5, 
	edits: 10, 
	namespace: 0 
};
/*Mediawiki*/
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback'];