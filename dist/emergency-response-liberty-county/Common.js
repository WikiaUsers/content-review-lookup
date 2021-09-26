/* Any JavaScript here will be loaded for all users on every page load. */
window.customCommentGroups = [ { group: "Admins", users: ["Joshuabirger", "AviatorPhil"] }, { group: "Moderators", users: ["LibertyTrooper"] }, { group: "Bots", users: ["ERLCcleanupbot"] } ];
/* credit to Among Us wiki */
window.MessageBlock = {
	title : 'Blocked',
	message : 'You have received a $2 block for the reason: \'$1\'. Unless otherwise stated and your block is not less than two weeks, you may appeal your block on my message wall at Community Central.',
	autocheck : true
};



window.ajaxPages = ["Some Frequently Updated Page"];
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Wantedpages", "Log", "Contributions"];
window.ajaxIndicator = 'https://images.wikia.nocookie.net/software/images/a/a9/Indicator.gif';
window.ajaxRefresh = 20000;
$.extend(true, window, {dev: {i18n: {overrides: {AjaxRC: {
    'ajaxrc-refresh-text': 'AJAX',
    'ajaxrc-refresh-hover': 'Enable page auto-refresh',
}}}}});

window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 100;
window.lockOldComments.addNoteAbove = true;