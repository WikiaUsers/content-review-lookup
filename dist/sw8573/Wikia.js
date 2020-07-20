// AutoEditDropdown config - http://dev.wikia.com/wiki/AutoEditDropdown
window.AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: false
};
 
importArticles({
    type: 'script',
    articles: [
	"MediaWiki:Common.js/Contribs.js",
        'w:c:dev:AutoEditDropdown/code.js'
    ]
});