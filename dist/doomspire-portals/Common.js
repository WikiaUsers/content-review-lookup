/*Any JavaScript here will be loaded for all users on every page load. */

/* MessageBlock config*/
(window.MessageBlock = window.MessageBlock || {}).autocheck = true;


window.MessageBlock = {
	title : 'Notification: Block',
	message : "You've been blocked for '$1\'... your duration for your ban is $2.",
	autocheck : true
};

/*lockOldComments config*/
window.lockOldComments = (window.lockOldComments || {});

window.lockOldComments.limit=120;
window.lockOldComments.addNoteAbove = true;