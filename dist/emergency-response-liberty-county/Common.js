/* Any JavaScript here will be loaded for all users on every page load. */
window.customCommentGroups = [ { group: "Admins", users: ["Joshuabirger", "AviatorPhil"] }, { group: "Moderators", users: ["LibertyTrooper"] }, { group: "Bots", users: ["ERLCcleanupbot"] } ];
/* credit to Among Us wiki */
window.MessageBlock = {
	title : 'Blocked',
	message : 'You have received a $2 block for the reason: \'$1\'. Unless otherwise stated and your block is not less than two weeks, you may appeal your block on my message wall at Community Central.',
	autocheck : true
// Add Bureaucrat promotion warning message
!function() {
    if (wgCanonicalSpecialPageName !== 'Userrights') return;
    $('#mw-content-text').on('change', '#wpGroup-bureaucrat', function() {
    if ($('#wpGroup-bureaucrat').attr('checked') && !confirm('Do you truly want to appoint a bureaucrat?')) $('#wpGroup-bureaucrat').attr('checked', null);
    });
}();
// END Bureaucrat promotion warning message

/ Fix Edit Summary Prompt for UNDO
importScriptPage('MediaWiki:Common.js/undoSummary.js', 'admintools');
// END Fix Edit Summary Prompt for UNDO

/ Extra Rollback Buttons
importScriptPage('MediaWiki:Common.js/extraRollbacks.js', 'admintools');
// END Extra Rollback Buttons
window.RevealAnonIP = { permissions : ['user'] };

 Duplicate image detector
importScriptPage('MediaWiki:DupImageList/code.js', 'dev');
// END duplicate image detector