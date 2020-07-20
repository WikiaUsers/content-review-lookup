/* Any JavaScript here will be loaded for all users on every page load. */
window.railWAM = {
     logPage: 'My log page',
     loadOnPage: 'Special:WikiActivity','Barbie girls Wiki:Policies'
     : 'Eng',
};
 
// importArticles call
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:RailWAM/code.js'
    ]
});
UserTagsJS.modules.implode = {
	'rollback': ['rollback'],
};