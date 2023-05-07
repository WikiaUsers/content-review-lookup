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

/*UserPages Autocreate*/
window.AutoCreateUserPagesConfig = {
    content: {
        2: 'Hello! This is your new profile page! Edit it to include information that you might want people to know about you! Need help getting started? Try out the Template {{Infobox user}}! ',
    },
    summary: 'Automatically creating user-page.',
    notify: '<a href="/wiki/User:$2">We just made your user page! Feel free to edit your profile at $1!</a>'
};
/* TBL Extension */
TBL_GROUP = "roblox-en";

/*LinKPreviewJS*/
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} }); /*Configuration Object*/
window.pPreview.csize = 100; /*Cache Size*/
window.pPreview.debug = false; /*Debug Mode (bool)*/
window.pPreview.apid = true; /*Use API to get*/
window.pPreview.noimage = 'https://static.wikia.nocookie.net/arena-defense-arenadev/images/6/6a/NoImageRA.png/revision/latest/scale-to-width-down/800?cb=20230505140256'; /*Image not found*/
window.pPreview.delay = 90; /*Hover reaction delay*/
window.pPreview.dock = '#mw-content-text'; /*Article Container*/
window.pPreview.tlen = 1000; /*Max text length*/