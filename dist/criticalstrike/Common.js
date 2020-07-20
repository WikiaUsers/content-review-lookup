/* Any JavaScript here will be loaded for all users on every page load. */
/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').html(mw.config.get('wgUserName'));
});

window.UserTagsJS = {
	modules: {},
	tags: {
	    inactive: { u: 'Inactive' }
	},
	oasisPlaceBefore: ''
};


UserTagsJS.modules.inactive = 90; // 90 days



// http://dev.wikia.com/wiki/RevealAnonIP
window.RevealAnonIP = {
    permissions : ['*']
};

//LastEdited 
window.lastEdited = {
//  avatar: true,
    size: true,
    diff: true,
    comment: true,
    time: true
}; 

// Text for when a user is blocked
var MessageBlock = {
  title : 'Block',
  message : 'You have been blocked for $1 because of these reasons: $2.'
};
 
// Make an account notice to sidebar if the user is not signed in. Credit to User:King Dragonhoff.
 
$(window).load(function() {
    if (wgUserName === null) {
        $('section#wikia-recent-activity').before('<section class="rail-module" id="sidebarReaderNotice"><h2 class="has-icon">Remove Advertisements</h2><p>Hate advertisements?  Creating an account is easy and FREE, and it removes advertisements across Fandom!</p></section>');
    }
});

importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js",
        'u:dev:MessageBlock/code.js',
        'w:c:dev:UserTags/code.js'
    ]
});