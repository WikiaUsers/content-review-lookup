/* Any JavaScript here will be loaded for all users on every page load. */
 
// Auto refresh
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
                bureaucrat: {u:'Color Fin Sharks', order:0},
                founder: {u:'Aniwey', order:-1},
                rollback: {u:'Time Ring'},
                programmer: {u:'The Computer'},
                blocked: {u:'Arena Conception Destroyer'},
                sockpuppet: {u:'Cloning Potion'},
                'half-sysop': {u:'Sea Snake'}
        },
        oasisPlaceBefore: ''
};
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 10;
UserTagsJS.modules.metafilter = {
        founder: ['bureaucrat'],
        bureaucrat: ['sysop'],
        killed: ['blocked']
};
UserTagsJS.modules.mwGroups = ['bureaucrat'];
UserTagsJS.modules.implode = {
	'half-sysop': ['rollback', 'chatmoderator']
};
UserTagsJS.modules.newuser = {
        days: 30,
        edits: 100
};
UserTagsJS.modules.custom = {
        'OrbitalFacePalm9001' : ['founder']
        'Logologologol' : ['programmer']
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