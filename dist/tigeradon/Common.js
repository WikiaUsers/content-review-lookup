/* Any JavaScript here will be loaded for all users on every page load. */

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
 
/* End of the {{USERNAME}} replacement */


// Auto refresh
importArticles( {
	type: 'script',
	articles: [
		'ShowHide/code.js',
		'CollapsibleInfobox/code.js',
		'DemoScripts.js'
                'w:dev:WallGreetingButton/code.js'
	]
});
importScriptPage('AjaxRC/code.js', 'dev');
var ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions","Special:WikiActivity"];
var AjaxRCRefreshText = 'Auto-refresh';
 
// making the Username tag work
var a = getElementByTagName('a')[6].getAttribute('href');
getElementByClassName('username').innerHTML = a;
// http://dev.wikia.com/wiki/RevealAnonIP
window.RevealAnonIP = {
permissions : ['user']
};
// End of RevealAnonIP
// UserTags
window.UserTagsJS = {
        modules: {},
        tags: {
                bureaucrat: {u:'Senior VP', order:0},
                founder: {u:'Tigeradon CEO', order:-1},
                rollback: {u:'Rollback'},
                programmer: {u:'Hacker'},
                killed: {u:'Fired'},
                sockpuppet: {u:'Sockpuppet'},
                halfadmin: {u:'Junior VP'},
                sysop: {u:'VP'}
                chatmoderator: {u:'Communications manager'}

        },
        oasisPlaceBefore: ''
};
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 10;
UserTagsJS.modules.metafilter = {
        founder: ['founder'],
        bureaucrat: ['Senior VP'],
        killed: ['Fired']
};
UserTagsJS.modules.mwGroups = ['bureaucrat'];
UserTagsJS.modules.implode = {
	halfadmin: ['patroller', 'rollback', 'chatmoderator']
};
UserTagsJS.modules.newuser = {
        days: 16,
        edits: 62
};
UserTagsJS.modules.custom = {
        'Logologologol': ['programmer'],
};
// End of UserTags
// IMPORT
importArticles({
    type: 'script',
    articles: [
          "w:c:dev:TimedSlider/code.js",
          "w:c:dev:RevealAnonIP/code.js",
          "w:c:dev:UserTags/code.js",
          "w:c:dev:AjaxRC/code.js"
    ]
});
// End