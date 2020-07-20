/* Any JavaScript here will be loaded for all users on every page load. */
 
// Ajax auto-refresh
var ajaxPages = ['Special:RecentChanges','Special:WikiActivity','Special:Contributions'];
var AjaxRCRefreshText = 'Auto-refresh';
importScriptPage('AjaxRC/code.js', 'dev');


/* UserTags */
 
window.UserTagsJS = {
	modules: {},
	tags: {
		detective: { u: 'Detective Lieutenant', order: 100 },
		sysop: { order: 1 } // Normal order is 0
	}
};
 
UserTagsJS.modules.custom = {
	'TimeShade': ['sysop'] // NOTE: order of list here does NOT matter
};
UserTagsJS.modules.mwGroups = ['sysop'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

// START Randomize wordmark

$(function() {
    var images = [
      'https://images.wikia.nocookie.net/__cb20141213001106/backstrom/images/8/89/Wiki-wordmark.png',
      'https://images.wikia.nocookie.net/__cb20141213212440/backstrom/images/d/dc/Backstrom-wordmark-2.png'
    ];
 
    $('h1.wordmark a img').attr('src', images[Math.floor(Math.random() * images.length)]);
});
// END Randomize wordmark

/* Auto block message */
var MessageBlock = {
  title : 'Blocked',
  message : '{{Block}}',
  autocheck : true
};
importArticles({
    type: 'script',
    articles: [
        'u:dev:MessageBlock/code.js'
    ]
});

/* Icon placement courtesy of OuaT wiki */
importArticles({
    type: "script",
    articles: [
 "MediaWiki:Common.js/icons.js"
 ]
});