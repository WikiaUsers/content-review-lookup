/* Any JavaScript here will be loaded for all users on every page load. */
/*Message Block*/
window.MessageBlock = {
	title : 'Blocked',
	message : 'You have received a $2 block because you have $1. This is an automated message. If you need anymore help, please check our Discord Server at https://arenatd.fandom.com/Discord .',
	autocheck : true
};

window.SpoilerAlertJS = {
    question: 'This area contains spoilers for secret mail. Are you sure you want to read it?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 1000
};
/*Twitter*/
mw.loader.load('ext.fandom.TwitterTag.js');