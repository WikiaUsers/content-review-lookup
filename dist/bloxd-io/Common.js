/* Any JavaScript here will be loaded for all users on every page load. */

window.MessageBlock = {
	title : 'Blocked',
	message : 'You have received a $2 block because you have $1',
	autocheck : true
};

.LockOldComments-locked [class^="ReplyCreate"] {
    display: none;
}

window.lockOldComments = (window.lockOldComments || {});

window.lockOldComments.limit = 100;
window.lockOldComments.addNoteAbove = true;